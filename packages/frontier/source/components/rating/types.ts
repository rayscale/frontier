import type { HTMLAttributes, ReactNode } from 'react'

/** Props for the {@link Rating} component. */
export type TRatingProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue'> & {
  /** Lets people click the rating they already gave to take it back. Defaults to `false`. */
  allowClear?: boolean | undefined
  /** Rating at the start, in uncontrolled mode. Defaults to `0`. */
  defaultValue?: number | undefined
  /** Stops people from changing the rating. */
  disabled?: boolean | undefined
  /** Names each choice, and the whole rating when it is read only. Defaults to `3 of 5`. */
  getLabel?: ((value: number, max: number) => string) | undefined
  /** The shape that is repeated. Defaults to a star. */
  icon?: ReactNode | undefined
  /** Name of the rating. Say what is rated, such as `Rate this recipe`. */
  label?: string | undefined
  /** How many shapes there are, and the highest rating. Defaults to `5`. */
  max?: number | undefined
  /** Name of the field, so the rating is sent with a form. */
  name?: string | undefined
  /** Called with the new rating. It is `0` when the rating is taken back. */
  onValueChange?: ((value: number) => void) | undefined
  /** `1` for whole shapes, `0.5` to let people give half of one. Defaults to `1`. */
  precision?: 0.5 | 1 | undefined
  /** Shows the rating without letting people change it. */
  readOnly?: boolean | undefined
  /** Size of the shapes. Defaults to `md`. */
  size?: 'sm' | 'md' | 'lg' | undefined
  /** Rating, in controlled mode. `0` is no rating. */
  value?: number | undefined
}
