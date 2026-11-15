import type { InputHTMLAttributes, ReactNode } from 'react'

type TCheckboxBaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'disabled' | 'type'
> & {
  /** Visible text next to the mark. It is also the accessible name. */
  label: ReactNode
  /** Helper text announced as the description of the checkbox. */
  description?: ReactNode
}

interface TCheckboxEnabledProps {
  disabled?: false
  disabledReason?: never
}

interface TCheckboxDisabledProps {
  disabled: true
  /** Explains why the checkbox is unavailable. It replaces the description. */
  disabledReason: string
}

export type TCheckboxProps = TCheckboxBaseProps & (TCheckboxEnabledProps | TCheckboxDisabledProps)
