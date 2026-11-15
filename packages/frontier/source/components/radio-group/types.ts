import type { FieldsetHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

type TRadioGroupBaseProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'children' | 'disabled' | 'name' | 'onChange'
> & {
  children: ReactNode
  /** Visible group name, rendered as the fieldset legend. */
  label?: ReactNode
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
}

export type TRadioGroupProps = TRadioGroupBaseProps

export type TRadioGroupItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked' | 'name' | 'type' | 'value'
> & {
  /** Value submitted with the form when this option is selected. */
  value: string
  /** Visible name of the option. It is also the accessible name. */
  label: ReactNode
}
