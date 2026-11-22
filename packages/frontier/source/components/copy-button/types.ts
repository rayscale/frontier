import type { ReactNode } from 'react'

import type { TButtonProps, TButtonSize, TButtonVariant } from '../button/button.js'

export type TCopyButtonProps = Omit<
  TButtonProps,
  'children' | 'onClick' | 'size' | 'type' | 'variant'
> & {
  /** Text copied to the clipboard. */
  value: string
  /** Visible and accessible label before copying. Defaults to `Copy`. */
  label?: string | undefined
  /** Visible and accessible label after copying. Defaults to `Copied`. */
  copiedLabel?: string | undefined
  /** How long the copied state is shown, in milliseconds. Defaults to 1600. */
  timeout?: number | undefined
  /** Whether to render the text label beside the icon. Defaults to `true`. */
  showLabel?: boolean | undefined
  /** Icon shown before copying. Defaults to the copy icon. */
  icon?: ReactNode | undefined
  /** Icon shown after copying. Defaults to the check icon. */
  copiedIcon?: ReactNode | undefined
  /** Called after a successful copy. */
  onCopy?: ((value: string) => void) | undefined
  /** Called when copying fails. */
  onError?: ((error: unknown) => void) | undefined
  /** Button size. Defaults to `small`. */
  size?: TButtonSize | undefined
  /** Button variant. Defaults to `ghost`. */
  variant?: TButtonVariant | undefined
  /** Native button type. Defaults to `button`. */
  type?: 'button' | 'submit' | 'reset' | undefined
}
