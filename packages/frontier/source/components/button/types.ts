import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

/** Visual appearance of the button. */
export type TButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

/** Available button sizes, including icon-only sizes. */
export type TButtonSize = 'small' | 'medium' | 'large' | 'icon' | 'icon-small' | 'icon-large'

/** Props for {@link Button}, including Motion props. */
export type TButtonProps = Omit<HTMLMotionProps<'button'>, 'disabled' | 'children'> & {
  [key: string]: unknown
  /** Button content. Icon-only buttons need an accessible name. */
  children?: ReactNode
  /** Visual appearance. Defaults to `primary`. */
  variant?: TButtonVariant
  /** Button size. Defaults to `medium`. */
  size?: TButtonSize
  /** Disables the button and its interaction animations. Defaults to `false`. */
  disabled?: boolean
  /** When true, renders the child element with button styles and interactions instead of a button element. */
  asChild?: boolean
}
