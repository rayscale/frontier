import type { HTMLAttributes, ReactNode } from 'react'

import type { TButtonProps } from '../button/button.js'

/** Edge of the viewport that the drawer slides in from. */
export type TDrawerSide = 'right' | 'left' | 'top' | 'bottom'

/**
 * Size of the drawer. Sets the width of `left` and `right` drawers and the
 * height of `top` and `bottom` drawers.
 */
export type TDrawerSize = 'small' | 'medium' | 'large'

/** Props for the {@link Drawer} root component. */
export interface TDrawerProps {
  /** Controlled open state. Omit to let the drawer manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the drawer opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Edge the drawer slides in from. Defaults to `right`. */
  side?: TDrawerSide | undefined
  /** Drawer parts, such as `Drawer.Trigger` and `Drawer.Content`. */
  children?: ReactNode | undefined
}

/** Props for `Drawer.Trigger`. */
export interface TDrawerTriggerProps {
  /** A single element that opens the drawer. Other content is wrapped in a `Button`. */
  children: ReactNode
}

/** Props for `Drawer.Content`, which renders the drawer surface. */
export type TDrawerContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Size of the drawer. Defaults to `medium`. */
  size?: TDrawerSize | undefined
  /** Shows a close button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean | undefined
  /** Closes the drawer when the backdrop is clicked. Defaults to `true`. */
  closeOnBackdropClick?: boolean | undefined
}

/** Props for `Drawer.Header`. */
export type TDrawerHeaderProps = HTMLAttributes<HTMLDivElement>

/** Props for `Drawer.Title`. */
export type TDrawerTitleProps = HTMLAttributes<HTMLHeadingElement>

/** Props for `Drawer.Description`. */
export type TDrawerDescriptionProps = HTMLAttributes<HTMLParagraphElement>

/** Props for `Drawer.Footer`. */
export type TDrawerFooterProps = HTMLAttributes<HTMLDivElement>

/** Props for `Drawer.Close`. Always renders with `type="button"`. */
export type TDrawerCloseProps = TButtonProps
