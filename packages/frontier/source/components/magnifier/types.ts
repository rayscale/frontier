import type { ReactElement } from 'react'

/** Props for the {@link Magnifier} component. */
export interface TMagnifierProps {
  /** The image to look at closely, as one `img` element. */
  children: ReactElement
  /** Stops the lens from opening. Defaults to `false`. */
  disabled?: boolean | undefined
  /** Time to wait after the pointer enters the image before the lens opens, in milliseconds. Defaults to `0`. */
  openDelay?: number | undefined
  /** Shape of the lens. Defaults to `circle`. */
  shape?: 'circle' | 'square' | undefined
  /** Width and height of the lens, in pixels. Defaults to `160`. */
  size?: number | undefined
  /** Source of the picture seen through the lens. Defaults to the source of the image, so pass a sharper one to see more detail. */
  src?: string | undefined
  /** How many times larger the picture is seen through the lens than it is on the page. Defaults to `2`. */
  zoom?: number | undefined
}
