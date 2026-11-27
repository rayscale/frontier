import useEmblaCarousel from 'embla-carousel-react'
import {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useMediaQuery } from '../../../internal/helpers/use-media-query.js'
import { carouselContext } from '../context.js'
import type { TCarouselOrientation, TCarouselRootProps } from '../types.js'

const editableSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])'

function getArrowKeys(
  orientation: TCarouselOrientation,
  rtl: boolean,
): { next: string; previous: string } {
  if (orientation === 'vertical') {
    return { next: 'ArrowDown', previous: 'ArrowUp' }
  }

  return rtl
    ? { next: 'ArrowLeft', previous: 'ArrowRight' }
    : { next: 'ArrowRight', previous: 'ArrowLeft' }
}

export const CarouselRoot = forwardRef<HTMLDivElement, TCarouselRootProps>(function CarouselRoot(
  {
    align = 'start',
    className,
    defaultIndex = 0,
    dir,
    dragFree = false,
    index,
    loop = false,
    onIndexChange,
    onKeyDown,
    orientation = 'horizontal',
    slidesPerView = 1,
    slidesToScroll = 1,
    style,
    ...props
  },
  ref,
) {
  const [startIndex] = useState(index ?? defaultIndex)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [viewportRef, api] = useEmblaCarousel({
    align,
    axis: orientation === 'horizontal' ? 'x' : 'y',
    direction: dir === 'rtl' ? 'rtl' : 'ltr',
    dragFree,
    loop,
    slidesToScroll,
    startIndex,
  })
  const [selectedIndex, setSelectedIndex] = useState(startIndex)
  const [snapCount, setSnapCount] = useState(0)
  const [previousAvailable, setPreviousAvailable] = useState(false)
  const [nextAvailable, setNextAvailable] = useState(false)

  useEffect(() => {
    if (!api) {
      return undefined
    }

    const sync = () => {
      setSelectedIndex(api.selectedScrollSnap())
      setSnapCount(api.scrollSnapList().length)
      setPreviousAvailable(api.canScrollPrev())
      setNextAvailable(api.canScrollNext())
    }

    const select = () => {
      sync()
      onIndexChange?.(api.selectedScrollSnap())
    }

    sync()
    api.on('select', select).on('reInit', sync)

    return () => {
      api.off('select', select).off('reInit', sync)
    }
  }, [api, onIndexChange])

  useEffect(() => {
    if (api && index !== undefined && api.selectedScrollSnap() !== index) {
      api.scrollTo(index, reduceMotion)
    }
  }, [api, index, reduceMotion])

  const scrollPrev = useCallback(() => {
    api?.scrollPrev(reduceMotion)
  }, [api, reduceMotion])
  const scrollNext = useCallback(() => {
    api?.scrollNext(reduceMotion)
  }, [api, reduceMotion])
  const scrollTo = useCallback(
    (target: number) => {
      api?.scrollTo(target, reduceMotion)
    },
    [api, reduceMotion],
  )

  const value = useMemo(
    () => ({
      nextAvailable,
      previousAvailable,
      orientation,
      scrollNext,
      scrollPrev,
      scrollTo,
      selectedIndex,
      snapCount,
      viewportRef,
    }),
    [
      nextAvailable,
      previousAvailable,
      orientation,
      scrollNext,
      scrollPrev,
      scrollTo,
      selectedIndex,
      snapCount,
      viewportRef,
    ],
  )

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)

    if (
      event.defaultPrevented ||
      (event.target instanceof Element && event.target.closest(editableSelector))
    ) {
      return
    }

    const keys = getArrowKeys(orientation, dir === 'rtl')

    if (event.key === keys.previous) {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === keys.next) {
      event.preventDefault()
      scrollNext()
    }
  }

  const rootStyle: CSSProperties & TCssCustomProperties = {
    ...style,
    '--_slides-per-view': String(slidesPerView),
  }

  return (
    <carouselContext.Provider value={value}>
      <div
        role="region"
        aria-roledescription="carousel"
        {...props}
        ref={ref}
        dir={dir}
        data-orientation={orientation}
        className={classNames('frontier-carousel', className)}
        style={rootStyle}
        onKeyDown={handleKeyDown}
      />
    </carouselContext.Provider>
  )
})
