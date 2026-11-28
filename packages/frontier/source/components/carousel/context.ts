import { createContext, useContext } from 'react'

import type { TCarouselOrientation } from './types.js'

export interface TCarouselContextValue {
  readonly nextAvailable: boolean
  readonly previousAvailable: boolean
  readonly orientation: TCarouselOrientation
  readonly scrollNext: () => void
  readonly scrollPrev: () => void
  readonly scrollTo: (index: number) => void
  readonly selectedIndex: number
  readonly snapCount: number
  readonly viewportRef: (node: HTMLElement | null) => void
}

export const carouselContext = createContext<TCarouselContextValue | null>(null)

export function useCarousel(): TCarouselContextValue {
  const context = useContext(carouselContext)

  if (!context) {
    throw new Error('Carousel parts must be rendered inside Carousel.Root.')
  }

  return context
}
