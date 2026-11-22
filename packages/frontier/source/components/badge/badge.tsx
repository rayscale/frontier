import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

import './badge.css'

/** Visual appearance of the badge. */
export type TBadgeVariant =
  'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'info'

/** Available badge sizes. */
export type TBadgeSize = 'small' | 'medium'

/** Props for {@link Badge}, in addition to native `span` attributes. */
export type TBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Text, icons, or other inline content. */
  children?: ReactNode | undefined
  /** Visual appearance. Defaults to `default`. */
  variant?: TBadgeVariant | undefined
  /** Size. Defaults to `medium`. */
  size?: TBadgeSize | undefined
}

/** Renders a non-interactive inline label. */
export function Badge({
  children,
  className,
  size = 'medium',
  variant = 'default',
  ...props
}: TBadgeProps): ReactElement {
  const classes = [
    'frontier-badge',
    `frontier-badge--${variant}`,
    `frontier-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span {...props} className={classes}>
      {children}
    </span>
  )
}
