import type {
  ButtonHTMLAttributes,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react'

export type TButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type TButtonBaseProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-disabled' | 'children' | 'disabled' | 'onBlur' | 'onClick' | 'onKeyDown' | 'onKeyUp'
> & {
  asChild?: boolean
  onBlur?: FocusEventHandler<HTMLElement>
  onClick?: MouseEventHandler<HTMLElement>
  onKeyDown?: KeyboardEventHandler<HTMLElement>
  onKeyUp?: KeyboardEventHandler<HTMLElement>
  variant?: TButtonVariant
}

interface TButtonTextProps {
  children: ReactNode
  disabled?: false
  disabledReason?: never
  iconOnly?: false
}

interface TButtonDisabledTextProps {
  children: ReactNode
  disabled: true
  disabledReason: string
  iconOnly?: false
}

interface TButtonIconProps {
  children: ReactNode
  iconOnly: true
  'aria-label': string
  disabled?: false
  disabledReason?: never
}

interface TButtonDisabledIconProps {
  children: ReactNode
  disabled: true
  disabledReason: string
  iconOnly: true
  'aria-label': string
}

export type TButtonProps = TButtonBaseProps &
  (TButtonTextProps | TButtonDisabledTextProps | TButtonIconProps | TButtonDisabledIconProps)
