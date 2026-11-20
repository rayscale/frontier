import type { HTMLAttributes, ReactElement } from 'react'

import { LoaderCircle } from '../../icons/index.js'

import './spinner.css'

/** Available loading indicator sizes. */
export type TSpinnerSize = 'small' | 'medium' | 'large'

/** Props for {@link Spinner}, in addition to native `span` attributes. */
export type TSpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  /** Additional CSS class for the status element. */
  className?: string | undefined
  /** Accessible status name. Defaults to `Loading`; `aria-label` takes precedence. */
  label?: string | undefined
  /** Indicator size. Defaults to `medium`. */
  size?: TSpinnerSize | undefined
}

/** Renders a decorative loading icon inside an accessible status element. */
export function Spinner({
  className,
  label = 'Loading',
  size = 'medium',
  'aria-label': ariaLabel,
  ...props
}: TSpinnerProps): ReactElement {
  const classes = ['frontier-spinner', `frontier-spinner--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span {...props} className={classes} role="status" aria-label={ariaLabel ?? label}>
      <LoaderCircle className="frontier-spinner__icon" aria-hidden="true" />
    </span>
  )
}
