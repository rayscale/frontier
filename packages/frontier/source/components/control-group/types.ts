import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

import type { TSeparatorOrientation, TSeparatorProps } from '../separator/separator.js'

/** TLayout direction of the group. */
export type TControlGroupOrientation = 'horizontal' | 'vertical'

/** Props for the ControlGroup root. */
export type TControlGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
  /** TLayout direction. Defaults to `horizontal`. */
  orientation?: TControlGroupOrientation
}

/** Props for the ControlGroup separator. */
export type TControlGroupSeparatorProps = Omit<TSeparatorProps, 'orientation'> & {
  /** Line direction. Defaults to the axis perpendicular to the group. */
  orientation?: TSeparatorOrientation
}

/** Props for the ControlGroup text part. */
export type TControlGroupTextProps = HTMLAttributes<HTMLSpanElement> & {
  /** Element to render instead of the default `span`. */
  render?: ReactElement<{
    className?: string
    children?: ReactNode
  }>
}
