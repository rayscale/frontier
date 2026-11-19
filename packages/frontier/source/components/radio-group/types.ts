import type { FieldsetHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

/** Direction in which the radio options are laid out. */
export type TRadioGroupOrientation = 'vertical' | 'horizontal'

type TRadioGroupBaseProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'children' | 'disabled' | 'name' | 'onChange'
> & {
  children: ReactNode
  /** Visible group name, rendered as the fieldset legend. */
  label?: ReactNode
  /** Helper text announced as the description of the group. */
  description?: ReactNode
  /** Error message associated with the group; also marks it invalid. */
  error?: ReactNode
  /** Marks the group invalid even when no error is displayed. */
  invalid?: boolean
  /** Initial selection when the group is uncontrolled. */
  defaultValue?: string
  /** Selected value when the group is controlled. */
  value?: string
  /** Called with the newly selected value when the selection changes. */
  onValueChange?: (value: string) => void
  /** Shared form name for every option. Generated when omitted. */
  name?: string
  /** Requires one option to be selected. */
  required?: boolean
  /** Layout direction of the options. Defaults to vertical. */
  orientation?: TRadioGroupOrientation
}

interface TRadioGroupEnabledProps {
  disabled?: false
  disabledReason?: never
}

interface TRadioGroupDisabledProps {
  disabled: true
  /** Explains why the group is unavailable. It replaces the description. */
  disabledReason: string
}

export type TRadioGroupProps = TRadioGroupBaseProps &
  (TRadioGroupEnabledProps | TRadioGroupDisabledProps)

export type TRadioGroupItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked' | 'name' | 'required' | 'type' | 'value'
> & {
  /** Value submitted with the form when this option is selected. */
  value: string
  /** Visible name of the option. It is also the accessible name. */
  label: ReactNode
  /** Helper text announced as the description of the option. */
  description?: ReactNode
  /** Disables this option only. */
  disabled?: boolean
}
