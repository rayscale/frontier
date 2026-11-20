import type { FieldsetHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

/** Available sizes for a radio group. */
export type TRadioGroupSize = 'small' | 'medium' | 'large'

/** Direction in which the radio options are laid out. */
export type TRadioGroupOrientation = 'horizontal' | 'vertical'

/** Props for a radio group. Use `value` with `onValueChange` for controlled state or `defaultValue` for uncontrolled state. */
export type TRadioGroupProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'defaultValue' | 'name' | 'onChange' | 'value'
> & {
  /** Shared form name for every radio in the group. Generated when omitted. */
  name?: string | undefined
  /** Visible group label, rendered as the fieldset legend. */
  label?: ReactNode | undefined
  /** Helper text associated with the group for assistive technologies. */
  description?: ReactNode | undefined
  /** TValue selected initially when the group is uncontrolled. */
  defaultValue?: string | undefined
  /** Selected value when the group is controlled. */
  value?: string | undefined
  /** Called with the newly selected value when the user changes the selection. */
  onValueChange?: ((value: string) => void) | undefined
  /** Disables every option in the group. Defaults to `false`. */
  disabled?: boolean | undefined
  /** Requires one option to be selected before form submission. Defaults to `false`. */
  required?: boolean | undefined
  /** TLayout direction of the options. Defaults to `vertical`. */
  orientation?: TRadioGroupOrientation | undefined
  /** Visual size of the options. Defaults to `medium`. */
  size?: TRadioGroupSize | undefined
}

/** Props for a single radio option within a `RadioGroup`. */
export type TRadioGroupItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked' | 'name' | 'size' | 'type'
> & {
  /** TValue submitted with the form when this option is selected. */
  value: string
  /** Visible label associated with the option. */
  label?: ReactNode | undefined
  /** Helper text associated with the option for assistive technologies. */
  description?: ReactNode | undefined
}
