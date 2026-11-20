import type { FieldsetHTMLAttributes, ReactNode } from 'react'

import type { TCheckboxProps } from '../checkbox/checkbox.js'

/** Props for a checkbox group. Use `value` with `onValueChange` for controlled state or `defaultValue` for uncontrolled state. */
export type TCheckboxGroupProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'defaultValue' | 'onChange' | 'value'
> & {
  /** Visible group label, rendered as the fieldset legend. */
  label?: ReactNode | undefined
  /** Helper text associated with the group for assistive technologies. */
  description?: ReactNode | undefined
  /** Values selected initially when the group is uncontrolled. Defaults to none. */
  defaultValue?: readonly string[] | undefined
  /** Selected values when the group is controlled. */
  value?: readonly string[] | undefined
  /** Called with the complete list of selected values after each user change. */
  onValueChange?: ((value: string[]) => void) | undefined
  /** Disables every option in the group. Defaults to `false`. */
  disabled?: boolean | undefined
}

/** Props for a single option within a `CheckboxGroup`. */
export type TCheckboxGroupItemProps = Omit<
  TCheckboxProps,
  'checked' | 'defaultChecked' | 'indeterminate' | 'onChange'
> & {
  /** TValue included in the group's selection when this option is checked. */
  value: string
}
