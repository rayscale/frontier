import type { HTMLAttributes, ReactNode } from 'react'

/** Positioning behavior of the header. */
export type THeaderMode = 'normal' | 'fixed' | 'dynamic'

/** Props for {@link Header}, in addition to native `header` attributes. */
export type THeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * `normal` stays in the document flow. `fixed` stays at the top of its
   * scroll container. `dynamic` floats after scrolling, hides on scroll down,
   * and reappears on scroll up.
   * @default 'normal'
   */
  mode?: THeaderMode | undefined
  /** Logo, navigation, actions, or any other header content. */
  children?: ReactNode | undefined
}

/** Visual state of a `dynamic` header. */
export type TDynamicHeaderState = 'attached' | 'floating' | 'hidden'

export interface TScrollTracker {
  lastY: number
  direction: -1 | 0 | 1
  distance: number
}
