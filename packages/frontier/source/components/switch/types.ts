import type { InputHTMLAttributes, ReactNode } from 'react'

type TSwitchBaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'disabled' | 'role' | 'type'
> & {
  /** Visible text next to the track. It is also the accessible name. */
  label: ReactNode
  /** Helper text announced as the description of the switch. */
  description?: ReactNode
}

interface TSwitchEnabledProps {
  disabled?: false
  disabledReason?: never
}

interface TSwitchDisabledProps {
  disabled: true
  /** Explains why the switch is unavailable. It replaces the description. */
  disabledReason: string
}

export type TSwitchProps = TSwitchBaseProps & (TSwitchEnabledProps | TSwitchDisabledProps)
