import type { ComponentPropsWithoutRef } from 'react'

import type { TButtonProps } from '../button/button.js'

/** Direction in which the slides sit side by side. */
export type TCarouselOrientation = 'horizontal' | 'vertical'

/** Where the current slide rests inside the viewport. */
export type TCarouselAlign = 'start' | 'center' | 'end'

/**
 * Props for the element that holds the slides and the controls of a carousel. It is a region, so
 * give it an accessible name with `aria-label`. Set `dir="rtl"` for right-to-left languages.
 */
export type TCarouselRootProps = Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> & {
  /** Where the current slide rests inside the viewport. Defaults to `start`. */
  align?: TCarouselAlign | undefined
  /** Position of the slide that is current at the start, in uncontrolled mode. Defaults to `0`. */
  defaultIndex?: number | undefined
  /** Lets people drag the slides freely and rest between them instead of snapping. Defaults to `false`. */
  dragFree?: boolean | undefined
  /** Position of the current slide, starting at 0, in controlled mode. */
  index?: number | undefined
  /** Continues from the last slide to the first, and the other way around. Defaults to `false`. */
  loop?: boolean | undefined
  /** Called with the position of the slide that became current. */
  onIndexChange?: ((index: number) => void) | undefined
  /** Direction in which the slides sit side by side. Defaults to `horizontal`. */
  orientation?: TCarouselOrientation | undefined
  /** How many slides share the width, or the height when vertical. It can be fractional. Defaults to `1`. */
  slidesPerView?: number | undefined
  /** How many slides one step moves. Defaults to `1`. */
  slidesToScroll?: number | undefined
}

/** Props for the strip that holds the slides. The slides go inside it. */
export type TCarouselContentProps = ComponentPropsWithoutRef<'div'>

/** Props for one slide. Give it an `aria-label` such as "1 of 5" so its position is announced. */
export type TCarouselItemProps = ComponentPropsWithoutRef<'div'>

/** Props for the buttons that move to the previous or the next slide. They are buttons, so they take the props of a button. */
export type TCarouselButtonProps = TButtonProps

/** Props for the row of buttons that jump to a slide. */
export type TCarouselDotsProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Names the button of each slide. Defaults to `Go to slide 1`, `Go to slide 2`, and so on. */
  getLabel?: ((index: number, count: number) => string) | undefined
}
