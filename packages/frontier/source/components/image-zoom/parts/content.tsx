import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import {
  forwardRef,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type WheelEvent,
} from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useMediaQuery } from '../../../internal/helpers/use-media-query.js'
import { useImageZoomContext } from '../context.js'
import { measureFlight, readMotion } from '../helpers/flight.js'
import type { TSize } from '../helpers/zoom.js'
import type { TImageZoomContentProps } from '../types.js'

import { ImageZoomClose, ImageZoomToolbar, ImageZoomZoomIn, ImageZoomZoomOut } from './toolbar.js'

/** How far a pointer can move and still be a press, in pixels. */
const dragThreshold = 4
/** How much one press of a zoom button or a key changes the zoom. */
const zoomStep = 1.5
/** How far a picture slides in when it replaces another, in pixels. */
const slideDistance = 56
/** How far an arrow key moves a zoomed image, in pixels. */
const panStep = 48

/** The side a new picture comes from: `1` is the end side, and `-1` the start side. */
function getSide(direction: 'forward' | 'backward' | undefined, pageOrder: 1 | -1): 1 | -1 {
  if (direction === undefined) {
    return pageOrder
  }

  return direction === 'forward' ? 1 : -1
}

interface TDrag {
  moved: boolean
  readonly startX: number
  readonly startY: number
  x: number
  y: number
}

/**
 * Flies the image from the trigger to the middle of the screen when it opens, and back when it
 * closes. It sits after the frame in the popup, so the frame is in the page when its effect runs,
 * before the browser paints it. It also keeps the image in the page empty for as long as the one
 * over the screen is there.
 *
 * The flight is a Web Animation, and not a transition in the stylesheet, because a transition
 * starts from the style that the browser last computed, which is not where the trigger is.
 */
function FlightAnchor({
  frameRef,
  imageRef,
}: {
  frameRef: RefObject<HTMLDivElement | null>
  imageRef: RefObject<HTMLImageElement | null>
}): null {
  const { getTrigger, open, setMounted } = useImageZoomContext('ImageZoom.Content')
  const animationsRef = useRef<Animation[]>([])
  // The trigger can change while the image is open, and that must not make it fly again.
  const getTriggerRef = useRef(getTrigger)
  useLayoutEffect(() => {
    getTriggerRef.current = getTrigger
  }, [getTrigger])
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const fly = useCallback(
    (direction: 'in' | 'out') => {
      const frame = frameRef.current
      const image = imageRef.current
      const trigger = getTriggerRef.current()
      if (!frame || !image || !trigger || reduceMotion) {
        return
      }

      const flight = measureFlight(frame, trigger)
      const { duration, easing } = readMotion(
        frame,
        direction === 'in' ? '--frontier-duration-enter' : '--frontier-duration-exit',
        direction === 'in'
          ? '--frontier-easing-emphasized-decelerate'
          : '--frontier-easing-emphasized-accelerate',
      )
      const rest = getComputedStyle(image).borderTopLeftRadius
      const options: KeyframeAnimationOptions = {
        duration,
        easing,
        fill: direction === 'out' ? 'forwards' : 'none',
      }
      const start = flight
        ? { borderRadius: `${String(flight.radius)}px`, transform: flight.transform }
        : { borderRadius: rest, opacity: 0, transform: 'scale(0.94)' }
      const end = { borderRadius: rest, opacity: 1, transform: 'none' }
      const [from, to] = direction === 'in' ? [start, end] : [end, start]

      animationsRef.current = [
        frame.animate(
          [
            { opacity: from.opacity ?? 1, transform: from.transform },
            { opacity: to.opacity ?? 1, transform: to.transform },
          ],
          options,
        ),
        image.animate(
          [{ borderRadius: from.borderRadius }, { borderRadius: to.borderRadius }],
          options,
        ),
      ]
    },
    [frameRef, imageRef, reduceMotion],
  )

  useLayoutEffect(() => {
    setMounted(true)
    fly('in')

    return () => {
      setMounted(false)
    }
  }, [fly, setMounted])

  const wasOpen = useRef(true)
  useLayoutEffect(() => {
    if (wasOpen.current && !open) {
      fly('out')
    } else if (!wasOpen.current && open) {
      // It opened again before it had gone, so it stops flying back.
      for (const animation of animationsRef.current) {
        animation.cancel()
      }
    }

    wasOpen.current = open
  }, [fly, open])

  return null
}

export const ImageZoomContent = forwardRef<HTMLDivElement, TImageZoomContentProps>(
  function ImageZoomContent(
    {
      alt,
      bottomSpace,
      children,
      className,
      direction,
      label,
      onClick,
      onKeyDown,
      onWheel,
      src,
      srcSet,
      style,
      ...props
    },
    ref,
  ) {
    const {
      getDirection,
      getTrigger,
      imageRef,
      maxZoom,
      mounted,
      pan,
      requestOpenChange,
      source,
      value,
      zoom,
      zoomAt,
      zoomBy,
    } = useImageZoomContext('ImageZoom.Content')
    const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
    const previousShown = useRef<string | undefined>(undefined)
    const previousValue = useRef<string | undefined>(undefined)
    const popupRef = useRef<HTMLDivElement | null>(null)
    const frameRef = useRef<HTMLDivElement | null>(null)
    const dragRef = useRef<TDrag | null>(null)
    const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [dragging, setDragging] = useState(false)
    const [wheeling, setWheeling] = useState(false)

    const resolvedAlt = alt ?? source?.alt ?? ''
    const resolvedSrc = src ?? source?.src

    // Another picture is loaded before it replaces the one that is shown, so the image never has a
    // wrong size for a moment. The size of the shown picture is known once it has loaded.
    const [shown, setShown] = useState<{ height: number; src: string | undefined; width: number }>({
      height: 0,
      src: resolvedSrc,
      width: 0,
    })

    // While the popup is not on the screen there is nothing to slide away from, so the picture to
    // show is simply the one asked for.
    if (!mounted && shown.src !== resolvedSrc) {
      setShown({ height: 0, src: resolvedSrc, width: 0 })
    }

    const attachPopup = useCallback(
      (node: HTMLDivElement | null) => {
        popupRef.current = node

        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    function getSize(): TSize {
      const image = imageRef.current

      return { height: image?.offsetHeight ?? 0, width: image?.offsetWidth ?? 0 }
    }

    /** Where a point of the screen is, in pixels from the center of the image when it is not zoomed. */
    function getCursor(clientX: number, clientY: number): { x: number; y: number } {
      const rect = imageRef.current?.getBoundingClientRect()

      return rect
        ? {
            x: clientX - (rect.left + rect.width / 2 - zoom.x),
            y: clientY - (rect.top + rect.height / 2 - zoom.y),
          }
        : { x: 0, y: 0 }
    }

    function handlePointerDown(event: PointerEvent<HTMLImageElement>): void {
      if (event.button !== 0) {
        return
      }

      event.currentTarget.setPointerCapture(event.pointerId)
      // While it is zoomed, the image follows the pointer without a delay.
      setDragging(zoom.scale > 1)
      dragRef.current = {
        moved: false,
        startX: event.clientX,
        startY: event.clientY,
        x: event.clientX,
        y: event.clientY,
      }
    }

    function handlePointerMove(event: PointerEvent<HTMLImageElement>): void {
      const drag = dragRef.current
      if (!drag) {
        return
      }

      if (
        !drag.moved &&
        Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > dragThreshold
      ) {
        drag.moved = true
      }

      if (drag.moved && zoom.scale > 1) {
        pan(event.clientX - drag.x, event.clientY - drag.y, getSize())
      }

      drag.x = event.clientX
      drag.y = event.clientY
    }

    function handlePointerUp(event: PointerEvent<HTMLImageElement>): void {
      const drag = dragRef.current
      dragRef.current = null
      setDragging(false)

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }

      // A press that did not move zooms in where it was, or zooms back out.
      if (drag && !drag.moved) {
        if (zoom.scale > 1) {
          zoomAt(1, { x: 0, y: 0 }, getSize())
        } else {
          zoomAt(Math.min(2, maxZoom), getCursor(event.clientX, event.clientY), getSize())
        }
      }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
      handleImageKey(event)
      // The image handles its keys first, so what it uses is already prevented when this is called.
      onKeyDown?.(event)
    }

    function handleImageKey(event: KeyboardEvent<HTMLDivElement>): void {
      if (event.target instanceof HTMLInputElement) {
        return
      }

      const arrows: { readonly [key: string]: readonly [number, number] | undefined } = {
        ArrowDown: [0, -panStep],
        ArrowLeft: [panStep, 0],
        ArrowRight: [-panStep, 0],
        ArrowUp: [0, panStep],
      }
      const arrow = arrows[event.key]

      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        zoomBy(zoomStep, getSize())
      } else if (event.key === '-') {
        event.preventDefault()
        zoomBy(1 / zoomStep, getSize())
      } else if (event.key === '0') {
        event.preventDefault()
        zoomAt(1, { x: 0, y: 0 }, getSize())
      } else if (arrow && zoom.scale > 1) {
        event.preventDefault()
        pan(arrow[0], arrow[1], getSize())
      }
    }

    function handleWheel(event: WheelEvent<HTMLDivElement>): void {
      onWheel?.(event)

      // The wheel sends many small changes, so the image follows each one without a delay.
      setWheeling(true)
      if (wheelTimer.current) {
        clearTimeout(wheelTimer.current)
      }

      wheelTimer.current = setTimeout(() => {
        setWheeling(false)
      }, 150)

      zoomAt(
        zoom.scale * Math.exp(-event.deltaY * 0.0015),
        getCursor(event.clientX, event.clientY),
        getSize(),
      )
    }

    // The effect reads the latest of these without starting over when they change.
    const latest = useRef({ direction, getDirection, reduceMotion, value })
    useLayoutEffect(() => {
      latest.current = { direction, getDirection, reduceMotion, value }
    })
    const leavingRef = useRef<Animation | null>(null)

    useEffect(() => {
      if (!resolvedSrc || resolvedSrc === shown.src) {
        return undefined
      }

      if (shown.src === undefined) {
        setShown({ height: 0, src: resolvedSrc, width: 0 })

        return undefined
      }

      let current = true
      const image = new Image()
      image.src = resolvedSrc
      const loading = image.decode().catch(() => undefined)

      // The picture that is shown slides out to the other side while the next one loads.
      const frame = frameRef.current
      const { reduceMotion: reduced } = latest.current
      let leaving: Promise<unknown> = Promise.resolve()

      if (frame && !reduced) {
        const side = getSide(
          latest.current.direction,
          latest.current.getDirection(previousValue.current, latest.current.value),
        )
        const { duration, easing } = readMotion(
          frame,
          '--frontier-duration-fast',
          '--frontier-easing-emphasized-accelerate',
        )
        const animation = frame.animate(
          [
            { opacity: 1, transform: 'none' },
            { opacity: 0, transform: `translateX(${String((-side * slideDistance) / 2)}px)` },
          ],
          { duration, easing, fill: 'forwards' },
        )
        leavingRef.current = animation
        leaving = animation.finished.catch(() => undefined)
      }

      Promise.all([loading, leaving]).then(
        () => {
          if (current) {
            setShown({ height: image.naturalHeight, src: resolvedSrc, width: image.naturalWidth })
          }
        },
        () => undefined,
      )

      return () => {
        current = false
      }
    }, [resolvedSrc, shown.src])

    // The picture that replaces another slides in from the side it is on, and fades in.
    useLayoutEffect(() => {
      // Only a new picture counts. The value changes before its picture has loaded, and the one
      // that belongs to the picture still shown is what tells which way people are going.
      if (previousShown.current === shown.src) {
        return
      }

      const frame = frameRef.current

      if (mounted && previousShown.current !== undefined && frame && !reduceMotion) {
        // The picture that left stops holding the frame, and the new one comes in.
        leavingRef.current?.cancel()
        leavingRef.current = null
        const side = getSide(direction, getDirection(previousValue.current, value))
        const { duration, easing } = readMotion(
          frame,
          '--frontier-duration-enter',
          '--frontier-easing-emphasized-decelerate',
        )
        frame.animate(
          [
            { opacity: 0, transform: `translateX(${String(side * slideDistance)}px)` },
            { opacity: 1, transform: 'none' },
          ],
          { duration, easing },
        )
      }

      previousShown.current = shown.src
      previousValue.current = value
    }, [direction, getDirection, mounted, reduceMotion, shown.src, value])

    // The shape of the shown picture is its own once it is known. Before that, and when it is the
    // image of the trigger, the trigger's image gives it.
    const triggerShape = source && source.width > 0 && src === undefined ? source : null
    const shape = shown.width > 0 ? shown : triggerShape
    const customProperties: TCssCustomProperties = {
      ...(shape ? { '--_natural-width': `${String(shape.width)}px` } : {}),
      ...(shape ? { '--_ratio': String(shape.width / shape.height) } : {}),
      ...(bottomSpace ? { '--_extra-block': `${String(bottomSpace)}px` } : {}),
    }

    return (
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="frontier-image-zoom__backdrop" />
        <BaseDialog.Popup
          {...props}
          ref={attachPopup}
          aria-label={label ?? (resolvedAlt || 'Image')}
          className={classNames('frontier-image-zoom', className)}
          data-zoomed={zoom.scale > 1 ? '' : undefined}
          finalFocus={getTrigger}
          initialFocus={popupRef}
          style={{ ...customProperties, ...style }}
          onClick={(event) => {
            onClick?.(event)

            // A press on the blurred background closes the image. A press on the image does not.
            if (event.target === event.currentTarget) {
              requestOpenChange(false)
            }
          }}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
        >
          <div ref={frameRef} className="frontier-image-zoom__frame">
            <img
              ref={imageRef}
              alt={resolvedAlt}
              className="frontier-image-zoom__image"
              data-dragging={dragging || wheeling ? '' : undefined}
              draggable={false}
              src={shown.src}
              srcSet={srcSet}
              style={{
                transform: `translate(${String(zoom.x)}px, ${String(zoom.y)}px) scale(${String(zoom.scale)})`,
              }}
              onLoad={(event) => {
                const { naturalHeight, naturalWidth } = event.currentTarget

                setShown((previous) =>
                  previous.width === 0 && previous.src
                    ? { height: naturalHeight, src: previous.src, width: naturalWidth }
                    : previous,
                )
              }}
              onPointerCancel={handlePointerUp}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />
          </div>
          <FlightAnchor frameRef={frameRef} imageRef={imageRef} />
          {children ?? (
            <ImageZoomToolbar>
              <ImageZoomZoomOut />
              <ImageZoomZoomIn />
              <ImageZoomClose />
            </ImageZoomToolbar>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    )
  },
)
