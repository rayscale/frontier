import { forwardRef, type ReactElement, useEffect, useRef } from 'react'

import { ChevronLeft, ChevronRight } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { useMediaQuery } from '../../../internal/helpers/use-media-query.js'
import { Button } from '../../button/button.js'
import { useLightboxContext } from '../context.js'
import type {
  TLightboxButtonProps,
  TLightboxCaptionProps,
  TLightboxCounterProps,
  TLightboxFooterProps,
  TLightboxThumbnailsProps,
} from '../types.js'

export function LightboxPrevious({
  className,
  disabled = false,
  onClick,
  ...props
}: TLightboxButtonProps): ReactElement {
  const { previous, previousAvailable } = useLightboxContext('Lightbox.Previous')

  return (
    <Button
      aria-label="Previous image"
      size="icon"
      variant="ghost"
      {...props}
      className={classNames(
        'frontier-lightbox__nav',
        'frontier-lightbox__nav--previous',
        'frontier-floating-surface',
        className,
      )}
      disabled={disabled || !previousAvailable}
      type="button"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          previous()
        }
      }}
    >
      <ChevronLeft aria-hidden="true" />
    </Button>
  )
}

export function LightboxNext({
  className,
  disabled = false,
  onClick,
  ...props
}: TLightboxButtonProps): ReactElement {
  const { next, nextAvailable } = useLightboxContext('Lightbox.Next')

  return (
    <Button
      aria-label="Next image"
      size="icon"
      variant="ghost"
      {...props}
      className={classNames(
        'frontier-lightbox__nav',
        'frontier-lightbox__nav--next',
        'frontier-floating-surface',
        className,
      )}
      disabled={disabled || !nextAvailable}
      type="button"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          next()
        }
      }}
    >
      <ChevronRight aria-hidden="true" />
    </Button>
  )
}

export const LightboxCounter = forwardRef<HTMLSpanElement, TLightboxCounterProps>(
  function LightboxCounter({ className, ...props }, ref) {
    const { count, index } = useLightboxContext('Lightbox.Counter')

    return (
      <span
        role="status"
        {...props}
        ref={ref}
        className={classNames('frontier-lightbox__counter', className)}
      >
        {String(index + 1)} of {String(count)}
      </span>
    )
  },
)

export const LightboxFooter = forwardRef<HTMLDivElement, TLightboxFooterProps>(
  function LightboxFooter({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={classNames('frontier-lightbox__footer', className)} />
    )
  },
)

export const LightboxCaption = forwardRef<HTMLParagraphElement, TLightboxCaptionProps>(
  function LightboxCaption({ className, ...props }, ref) {
    const { item } = useLightboxContext('Lightbox.Caption')

    if (!item?.caption) {
      return null
    }

    return (
      <p
        {...props}
        ref={ref}
        className={classNames('frontier-lightbox__caption', 'frontier-floating-surface', className)}
      >
        {item.caption}
      </p>
    )
  },
)

export const LightboxThumbnails = forwardRef<HTMLDivElement, TLightboxThumbnailsProps>(
  function LightboxThumbnails({ className, ...props }, ref) {
    const { goTo, index, items } = useLightboxContext('Lightbox.Thumbnails')
    const currentRef = useRef<HTMLButtonElement | null>(null)
    const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

    // The strip scrolls to keep the shown picture in view.
    useEffect(() => {
      currentRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }, [index, reduceMotion])

    return (
      <div
        aria-label="Thumbnails"
        role="group"
        {...props}
        ref={ref}
        className={classNames(
          'frontier-lightbox__thumbnails',
          'frontier-floating-surface',
          className,
        )}
      >
        {items.map((item, position) => (
          <button
            key={item.id}
            ref={position === index ? currentRef : undefined}
            aria-current={position === index ? 'true' : undefined}
            aria-label={item.alt}
            className="frontier-lightbox__thumbnail"
            type="button"
            onClick={() => {
              goTo(position)
            }}
          >
            <img alt="" draggable={false} src={item.thumbnail ?? item.src} />
          </button>
        ))}
      </div>
    )
  },
)
