import type { HTMLAttributes } from 'react'

/** Direction of the dividing line. */
export type TSeparatorOrientation = 'horizontal' | 'vertical'

/** One border color token names. */
export type TSeparatorColor = 'subtle' | 'default' | 'strong'

/** Props for {@link Separator}, in addition to native `div` attributes. */
export type TSeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'> & {
  /** Additional CSS class for the separator element. */
  className?: string
  /**
   * Line color. A One token name maps to its border token, and any other
   * string is used as CSS as provided. Defaults to the standard border color.
   */
  color?: TSeparatorColor | (string & NonNullable<unknown>)
  /**
   * Whether the separator is purely visual. Decorative separators are removed
   * from the accessibility tree; semantic separators expose `role="separator"`.
   * Defaults to `false`.
   */
  decorative?: boolean
  /** Orientation of the line. Defaults to `horizontal`. */
  orientation?: TSeparatorOrientation
  /**
   * Line thickness. A number is treated as pixels, and any other string is used
   * as CSS as provided. Defaults to the standard border width.
   */
  thickness?: number | (string & NonNullable<unknown>)
}
