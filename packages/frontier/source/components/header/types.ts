import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

import type { TNavigationMenuProps } from '../navigation-menu/index.js'

/** Positioning behavior of the header. */
export type THeaderMode = 'normal' | 'fixed' | 'dynamic'

/** Props for {@link Header}, in addition to native `header` attributes. */
export type THeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * `normal` stays in the document flow. `fixed` stays at the top of its
   * scroll container. `dynamic` stays pinned to the top, gains a surface after
   * scrolling, hides on scroll down, and reappears on scroll up.
   * @default 'normal'
   */
  mode?: THeaderMode | undefined
  /** Logo, navigation, actions, or any other header content. */
  children?: ReactNode | undefined
}

/**
 * Props for `Header.NavigationMenu`, in addition to the navigation menu props
 * that apply to both layouts.
 */
export type THeaderNavigationMenuProps = Omit<TNavigationMenuProps, 'layout'> & {
  /** Accessible name of the navigation landmark. */
  label?: string | undefined
  /** Accessible name of the button that opens the compact panel. Defaults to `Menu`. */
  toggleLabel?: string | undefined
  /**
   * Forces the compact panel on or off. When omitted, the navigation becomes
   * compact at 48rem and below.
   */
  compact?: boolean | undefined
}

/** Native `button` attributes accepted by the compact menu button. */
export type TButtonHTMLProps = ButtonHTMLAttributes<HTMLButtonElement>

/** Visual state of a `dynamic` header. */
export type TDynamicHeaderState = 'attached' | 'scrolled' | 'hidden'

export interface TScrollTracker {
  lastY: number
  direction: -1 | 0 | 1
  distance: number
}
