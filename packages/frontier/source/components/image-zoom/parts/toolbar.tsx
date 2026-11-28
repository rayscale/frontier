import { forwardRef, type ReactElement } from 'react'

import { Minus, Plus, X } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { Button } from '../../button/button.js'
import { useImageZoomContext } from '../context.js'
import type {
  TImageZoomButtonProps,
  TImageZoomCaptionProps,
  TImageZoomToolbarProps,
} from '../types.js'

const zoomStep = 1.5

export const ImageZoomToolbar = forwardRef<HTMLDivElement, TImageZoomToolbarProps>(
  function ImageZoomToolbar({ className, placement = 'top', ...props }, ref) {
    return (
      <div
        aria-label="Image controls"
        role="group"
        {...props}
        ref={ref}
        className={classNames(
          'frontier-image-zoom__toolbar',
          'frontier-floating-surface',
          className,
        )}
        data-placement={placement}
      />
    )
  },
)

export function ImageZoomZoomIn({
  disabled = false,
  onClick,
  ...props
}: TImageZoomButtonProps): ReactElement {
  const { imageRef, maxZoom, zoom, zoomBy } = useImageZoomContext('ImageZoom.ZoomIn')

  return (
    <Button
      aria-label="Zoom in"
      size="icon"
      variant="ghost"
      {...props}
      disabled={disabled || zoom.scale >= maxZoom}
      type="button"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          zoomBy(zoomStep, {
            height: imageRef.current?.offsetHeight ?? 0,
            width: imageRef.current?.offsetWidth ?? 0,
          })
        }
      }}
    >
      <Plus aria-hidden="true" />
    </Button>
  )
}

export function ImageZoomZoomOut({
  disabled = false,
  onClick,
  ...props
}: TImageZoomButtonProps): ReactElement {
  const { imageRef, zoom, zoomBy } = useImageZoomContext('ImageZoom.ZoomOut')

  return (
    <Button
      aria-label="Zoom out"
      size="icon"
      variant="ghost"
      {...props}
      disabled={disabled || zoom.scale <= 1}
      type="button"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          zoomBy(1 / zoomStep, {
            height: imageRef.current?.offsetHeight ?? 0,
            width: imageRef.current?.offsetWidth ?? 0,
          })
        }
      }}
    >
      <Minus aria-hidden="true" />
    </Button>
  )
}

export function ImageZoomClose({ onClick, ...props }: TImageZoomButtonProps): ReactElement {
  const { requestOpenChange } = useImageZoomContext('ImageZoom.Close')

  return (
    <Button
      aria-label="Close"
      size="icon"
      variant="ghost"
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          requestOpenChange(false)
        }
      }}
    >
      <X aria-hidden="true" />
    </Button>
  )
}

export const ImageZoomCaption = forwardRef<HTMLParagraphElement, TImageZoomCaptionProps>(
  function ImageZoomCaption({ className, ...props }, ref) {
    return (
      <p
        {...props}
        ref={ref}
        className={classNames(
          'frontier-image-zoom__caption',
          'frontier-floating-surface',
          className,
        )}
      />
    )
  },
)
