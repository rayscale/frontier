import {
  Children,
  cloneElement,
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { type TImageZoomSource, useImageZoomContext } from '../context.js'
import type { TImageZoomTriggerProps } from '../types.js'

function readSource(image: HTMLImageElement): TImageZoomSource {
  return {
    alt: image.alt,
    height: image.naturalHeight,
    src: image.currentSrc || image.src,
    width: image.naturalWidth,
  }
}

export function ImageZoomTrigger({
  children,
  className,
  value,
}: TImageZoomTriggerProps): ReactElement {
  const {
    mounted,
    open,
    registerTrigger,
    requestOpenChange,
    setSource,
    setValue,
    value: currentValue,
  } = useImageZoomContext('ImageZoom.Trigger')
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const child = Children.only(children)
  const key = value ?? ''

  if (!isValidElement<ComponentPropsWithoutRef<'img'>>(child) || child.type !== 'img') {
    throw new Error('ImageZoom.Trigger needs one img element as its child.')
  }

  const { onLoad } = child.props
  const current = (currentValue ?? '') === key

  const attachButton = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      registerTrigger(key, node)
    },
    [key, registerTrigger],
  )

  // An image that is already loaded gives no load event, so its size is read when the trigger mounts.
  useEffect(() => {
    const image = buttonRef.current?.querySelector('img')

    if (image?.complete === true && image.naturalWidth > 0) {
      setSource(key, readSource(image))
    }
  }, [key, setSource])

  return (
    <button
      ref={attachButton}
      aria-expanded={open && current}
      aria-haspopup="dialog"
      className={classNames('frontier-image-zoom__trigger', className)}
      data-active={mounted && current ? '' : undefined}
      type="button"
      onClick={() => {
        const image = buttonRef.current?.querySelector('img')

        if (image) {
          setSource(key, readSource(image))
        }

        setValue(value)
        requestOpenChange(true)
      }}
    >
      {cloneElement(child, {
        onLoad: (event) => {
          onLoad?.(event)
          setSource(key, readSource(event.currentTarget))
        },
      })}
    </button>
  )
}
