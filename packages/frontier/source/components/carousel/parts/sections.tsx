import { forwardRef, type ReactElement } from 'react'

import { ChevronLeft, ChevronRight } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { Button } from '../../button/button.js'
import { useCarousel } from '../context.js'
import type {
  TCarouselButtonProps,
  TCarouselContentProps,
  TCarouselDotsProps,
  TCarouselItemProps,
} from '../types.js'

export const CarouselContent = forwardRef<HTMLDivElement, TCarouselContentProps>(
  function CarouselContent({ className, ...props }, ref) {
    const { viewportRef } = useCarousel()

    return (
      <div ref={viewportRef} className="frontier-carousel__viewport">
        <div {...props} ref={ref} className={classNames('frontier-carousel__content', className)} />
      </div>
    )
  },
)

export const CarouselItem = forwardRef<HTMLDivElement, TCarouselItemProps>(function CarouselItem(
  { className, ...props },
  ref,
) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      {...props}
      ref={ref}
      className={classNames('frontier-carousel__item', className)}
    />
  )
})

export function CarouselPrevious({
  className,
  disabled = false,
  onClick,
  size = 'icon',
  variant = 'outline',
  ...props
}: TCarouselButtonProps): ReactElement {
  const { previousAvailable, scrollPrev } = useCarousel()

  return (
    <Button
      aria-label="Previous slide"
      {...props}
      size={size}
      variant={variant}
      disabled={disabled || !previousAvailable}
      className={classNames(
        'frontier-carousel__button',
        'frontier-carousel__button--previous',
        className,
      )}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          scrollPrev()
        }
      }}
    >
      <ChevronLeft aria-hidden="true" />
    </Button>
  )
}

export function CarouselNext({
  className,
  disabled = false,
  onClick,
  size = 'icon',
  variant = 'outline',
  ...props
}: TCarouselButtonProps): ReactElement {
  const { nextAvailable, scrollNext } = useCarousel()

  return (
    <Button
      aria-label="Next slide"
      {...props}
      size={size}
      variant={variant}
      disabled={disabled || !nextAvailable}
      className={classNames(
        'frontier-carousel__button',
        'frontier-carousel__button--next',
        className,
      )}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          scrollNext()
        }
      }}
    >
      <ChevronRight aria-hidden="true" />
    </Button>
  )
}

export const CarouselDots = forwardRef<HTMLDivElement, TCarouselDotsProps>(function CarouselDots(
  { className, getLabel, ...props },
  ref,
) {
  const { scrollTo, selectedIndex, snapCount } = useCarousel()

  return (
    <div
      role="group"
      aria-label="Slides"
      {...props}
      ref={ref}
      className={classNames('frontier-carousel__dots', className)}
    >
      {Array.from({ length: snapCount }, (_, index) => (
        <button
          key={index}
          type="button"
          className="frontier-carousel__dot"
          aria-label={getLabel ? getLabel(index, snapCount) : `Go to slide ${String(index + 1)}`}
          aria-current={index === selectedIndex ? 'true' : undefined}
          onClick={() => {
            scrollTo(index)
          }}
        />
      ))}
    </div>
  )
})
