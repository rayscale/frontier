import type { HTMLAttributes, ReactNode } from 'react'

import type { TButtonProps } from '../button/button.js'

/** Edge of the viewport that the sheet slides in from. */
export type TSheetSide = 'right' | 'left' | 'top' | 'bottom'

/**
 * Size of the sheet. Sets the width of `left` and `right` sheets and the
 * height of `top` and `bottom` sheets.
 */
export type TSheetSize = 'small' | 'medium' | 'large'

/** Props for the {@link Sheet} root component. */
export interface TSheetProps {
  /** Controlled open state. Omit to let the sheet manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the sheet opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Edge the sheet slides in from. Defaults to `right`. */
  side?: TSheetSide | undefined
  /** Sheet parts, such as `Sheet.Trigger` and `Sheet.Content`. */
  children?: ReactNode | undefined
}

/** Props for `Sheet.Trigger`. */
export interface TSheetTriggerProps {
  /** A single element that opens the sheet. Other content is wrapped in a `Button`. */
  children: ReactNode
}

/** Props for `Sheet.Content`, which renders the sheet surface. */
export type TSheetContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Size of the sheet. Defaults to `medium`. */
  size?: TSheetSize | undefined
  /** Shows a close button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean | undefined
  /** Closes the sheet when the backdrop is clicked. Defaults to `true`. */
  closeOnBackdropClick?: boolean | undefined
}

/** Props for `Sheet.Header`. */
export type TSheetHeaderProps = HTMLAttributes<HTMLDivElement>

/** Props for `Sheet.Title`. */
export type TSheetTitleProps = HTMLAttributes<HTMLHeadingElement>

/** Props for `Sheet.Description`. */
export type TSheetDescriptionProps = HTMLAttributes<HTMLParagraphElement>

/** Props for `Sheet.Footer`. */
export type TSheetFooterProps = HTMLAttributes<HTMLDivElement>

/** Props for `Sheet.Close`. Always renders with `type="button"`. */
export type TSheetCloseProps = TButtonProps
