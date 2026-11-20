import { animate, type AnimationPlaybackControls, useReducedMotion } from 'motion/react'
import { type ReactElement, type ReactNode, type Ref, useCallback, useEffect, useRef } from 'react'

import { springLayout } from '../../../styles/motion.js'

import './auto-size.css'

/** Dimensions that follow the content size. */
export type TAutoSizeAxis = 'vertical' | 'horizontal' | 'both'

/** Props for {@link AutoSize}. */
export interface TAutoSizeProps {
  /** Which dimensions animate when the content size changes. Defaults to `vertical`. */
  axis?: TAutoSizeAxis
  /** Spring or tween applied to each size change. Defaults to the layout spring. */
  transition?: TAutoSizeTransition
  /** Extra class for component-specific layout. */
  className?: string
  /** Ref to the animated container element. */
  ref?: Ref<HTMLDivElement>
  children?: ReactNode
}

/** Motion options accepted for each size change. */
export type TAutoSizeTransition = typeof springLayout | { type: 'tween'; duration: number }

interface TMeasuredSize {
  width: number
  height: number
}

function assignRef(ref: Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) {
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref) {
    ref.current = node
  }
}

function animatesWidth(axis: TAutoSizeAxis): boolean {
  return axis === 'horizontal' || axis === 'both'
}

function animatesHeight(axis: TAutoSizeAxis): boolean {
  return axis === 'vertical' || axis === 'both'
}

/**
 * Animates its own width or height to match the size of its content, so that
 * changes in the content glide instead of snapping. The content is measured
 * with a ResizeObserver, and the container is animated with Motion.
 */
export function AutoSize({
  axis = 'vertical',
  transition = springLayout,
  className,
  ref,
  children,
}: TAutoSizeProps): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion() ?? false
  const latestOptions = useRef({ axis, transition, prefersReducedMotion })
  latestOptions.current = { axis, transition, prefersReducedMotion }

  const setContainer = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      assignRef(ref, node)
    },
    [ref],
  )

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) {
      return undefined
    }

    let measuredState = false
    let animationToken = 0
    let activeControls: AnimationPlaybackControls[] = []

    const stopAnimations = () => {
      activeControls.forEach((control) => {
        control.stop()
      })
      activeControls = []
    }

    const applySize = (size: TMeasuredSize) => {
      const { axis: currentAxis } = latestOptions.current

      if (animatesWidth(currentAxis)) {
        container.style.width = `${String(size.width)}px`
      }

      if (animatesHeight(currentAxis)) {
        container.style.height = `${String(size.height)}px`
      }
    }

    const animateSize = (from: TMeasuredSize, to: TMeasuredSize) => {
      const { axis: currentAxis, transition: currentTransition } = latestOptions.current
      const token = ++animationToken

      stopAnimations()
      container.dataset.animating = ''
      applySize(from)

      const finish = () => {
        if (token === animationToken) {
          delete container.dataset.animating
        }
      }

      const animateDimension = (dimension: 'width' | 'height', start: number, end: number) => {
        activeControls.push(
          animate(start, end, {
            ...currentTransition,
            onUpdate: (latest) => {
              container.style[dimension] = `${String(latest)}px`
            },
            onComplete: finish,
          }),
        )
      }

      if (animatesWidth(currentAxis)) {
        animateDimension('width', from.width, to.width)
      }

      if (animatesHeight(currentAxis)) {
        animateDimension('height', from.height, to.height)
      }
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (!entry) {
        return
      }

      const target: TMeasuredSize = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }

      if (!measuredState || latestOptions.current.prefersReducedMotion) {
        measuredState = true
        animationToken++
        stopAnimations()
        delete container.dataset.animating
        applySize(target)
        return
      }

      const from: TMeasuredSize = {
        width: container.offsetWidth,
        height: container.offsetHeight,
      }
      const { axis: currentAxis } = latestOptions.current
      const widthChanged = animatesWidth(currentAxis) && from.width !== target.width
      const heightChanged = animatesHeight(currentAxis) && from.height !== target.height

      if (!widthChanged && !heightChanged) {
        return
      }

      animateSize(from, target)
    })

    observer.observe(content)

    return () => {
      observer.disconnect()
      animationToken++
      stopAnimations()
      delete container.dataset.animating
    }
  }, [])

  return (
    <div
      ref={setContainer}
      data-axis={axis}
      className={['frontier-auto-size', className].filter(Boolean).join(' ')}
    >
      <div ref={contentRef} className="frontier-auto-size__content">
        {children}
      </div>
    </div>
  )
}
