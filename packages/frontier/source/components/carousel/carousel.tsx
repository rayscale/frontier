import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { CarouselRoot } from './parts/root.js'
import {
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './parts/sections.js'
import type { TCarouselRootProps } from './types.js'

import './carousel.css'

export type {
  TCarouselAlign,
  TCarouselButtonProps,
  TCarouselContentProps,
  TCarouselDotsProps,
  TCarouselItemProps,
  TCarouselOrientation,
  TCarouselRootProps,
} from './types.js'

export interface TCarouselComponent extends ForwardRefExoticComponent<
  TCarouselRootProps & RefAttributes<HTMLDivElement>
> {
  /** Holds the slides and the controls, and shares which slide is current. */
  Root: typeof CarouselRoot
  /** The strip that holds the slides and moves as people drag it or use the controls. */
  Content: typeof CarouselContent
  /** One slide. */
  Item: typeof CarouselItem
  /** A button that moves to the previous slide. */
  Previous: typeof CarouselPrevious
  /** A button that moves to the next slide. */
  Next: typeof CarouselNext
  /** A row of buttons, one for each slide, that jump straight to it. */
  Dots: typeof CarouselDots
}

/**
 * Shows a row or a column of slides that people drag, step through with buttons or the arrow keys,
 * or jump through with dots. Built on Embla Carousel. Compose it with `Carousel.Root`,
 * `Carousel.Content`, and `Carousel.Item`, and add `Carousel.Previous`, `Carousel.Next`, and
 * `Carousel.Dots` as needed.
 */
export const Carousel: TCarouselComponent = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Dots: CarouselDots,
})
