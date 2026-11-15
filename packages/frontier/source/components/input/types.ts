import type { InputHTMLAttributes, ReactNode } from 'react'

export type TInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled'> & {
  /** Visible label associated with the native input. */
  label?: ReactNode
  /** Helper text associated with the input. */
  description?: ReactNode
  /** Error message associated with the input; also marks it invalid. */
  error?: ReactNode
  /** Marks the input invalid even when no error is displayed. */
  invalid?: boolean
  /** Keeps the input focusable while preventing edits. */
  disabled?: boolean
  /** Explains why the input is unavailable. It replaces the description. */
  disabledReason?: ReactNode
  /** Content displayed before the value. */
  leadingIcon?: ReactNode
  /** Prevents assistive technologies from hiding the leading content. */
  leadingIconInteractive?: boolean
  /** Content displayed after the value. */
  trailingIcon?: ReactNode
  /** Prevents assistive technologies from hiding the trailing content. */
  trailingIconInteractive?: boolean
}
