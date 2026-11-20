import type { HTMLAttributes, ReactNode } from 'react'

/** Available segmented control sizes. */
export type TSegmentedControlSize = 'small' | 'medium' | 'large'

/** A selectable option in a {@link SegmentedControl}. */
export interface TSegmentedControlOption<TValue extends string = string> {
  /** Visible label content. */
  label: ReactNode
  /** Unique value for this option. */
  value: TValue
  /** Whether this option is disabled. */
  disabled?: boolean | undefined
  /** Optional icon displayed alongside the label. */
  icon?: ReactNode | undefined
  /** Optional explicit accessible name for the option. */
  'aria-label'?: string | undefined
}

/** Props for a single-selection options group. */
export type TSegmentedControlProps<TValue extends string = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> & {
  /** Options displayed in the group. */
  options: readonly TSegmentedControlOption<TValue>[]
  /** Selected value in controlled mode. */
  value?: TValue | undefined
  /** Initial value in uncontrolled mode. */
  defaultValue?: TValue | undefined
  /** Called with the selected value when the selection changes. */
  onChange?: ((value: TValue) => void) | undefined
  /** Disables all options. */
  disabled?: boolean | undefined
  /** Visual size. Defaults to `medium`. */
  size?: TSegmentedControlSize | undefined
  /** Name shared by native radio inputs for form submission. */
  name?: string | undefined
  /** Optional visible group label rendered above the control. */
  label?: ReactNode | undefined
}
