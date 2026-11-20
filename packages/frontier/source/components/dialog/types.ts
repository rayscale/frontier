import type { HTMLAttributes, ReactNode } from 'react'

import type { TButtonProps } from '../button/button.js'

/** Available dialog widths. */
export type TDialogSize = 'small' | 'medium' | 'large'

/** Props for the {@link Dialog} root component. */
export interface TDialogProps {
  /** Controlled open state. Omit to let the dialog manage its own state. */
  open?: boolean
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean
  /** Called with the requested open state when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Dialog parts, such as `Dialog.Trigger` and `Dialog.Content`. */
  children?: ReactNode
}

/** Props for `Dialog.Trigger`. */
export interface TDialogTriggerProps {
  /** A single element that opens the dialog. Other content is wrapped in a `Button`. */
  children: ReactNode
}

/** Props for `Dialog.Content`, which renders the modal popup. */
export type TDialogContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Width of the dialog. Defaults to `medium`. */
  size?: TDialogSize
  /** Shows a close button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean
  /** Closes the dialog when the backdrop is clicked. Defaults to `true`. */
  closeOnBackdropClick?: boolean
}

/** Props for `Dialog.Header`. */
export type TDialogHeaderProps = HTMLAttributes<HTMLDivElement>

/** Props for `Dialog.Title`. */
export type TDialogTitleProps = HTMLAttributes<HTMLHeadingElement>

/** Props for `Dialog.Description`. */
export type TDialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>

/** Props for `Dialog.Footer`. */
export type TDialogFooterProps = HTMLAttributes<HTMLDivElement>

/** Props for `Dialog.Close`. Always renders with `type="button"`. */
export type TDialogCloseProps = TButtonProps
