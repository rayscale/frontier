import type { HTMLAttributes } from 'react'

/** Props for {@link NumberFlow}, in addition to native `span` attributes. */
export type TNumberFlowProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Number to display. Changes animate digit by digit. */
  value: number
  /** Options passed to `Intl.NumberFormat`, such as currency or percent styles. */
  format?: Intl.NumberFormatOptions | undefined
  /** BCP 47 locale for grouping and numerals. Defaults to the platform locale. */
  locale?: string | undefined
  /** Transition duration in milliseconds. Defaults to the base motion duration. */
  duration?: number | undefined
  /** Additional CSS class for the root element. */
  className?: string | undefined
}
