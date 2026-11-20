import { DialogClose, DialogContent } from './parts/content.js'
import { DialogRoot, DialogTrigger } from './parts/root.js'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './parts/sections.js'
import type { TDialogProps } from './types.js'

import './dialog.css'

export type {
  TDialogCloseProps,
  TDialogContentProps,
  TDialogDescriptionProps,
  TDialogFooterProps,
  TDialogHeaderProps,
  TDialogProps,
  TDialogSize,
  TDialogTitleProps,
  TDialogTriggerProps,
} from './types.js'

export interface TDialogComponent extends React.FC<TDialogProps> {
  /** Renders the trigger element that opens the dialog. */
  Trigger: typeof DialogTrigger
  /** Renders the modal dialog popup container and backdrop. */
  Content: typeof DialogContent
  /** Contains the header structure of the dialog. */
  Header: typeof DialogHeader
  /** Renders the accessible dialog title. */
  Title: typeof DialogTitle
  /** Renders the accessible dialog description. */
  Description: typeof DialogDescription
  /** Lays out action buttons at the bottom of the dialog. */
  Footer: typeof DialogFooter
  /** Renders a button that closes the dialog when activated. */
  Close: typeof DialogClose
}

/**
 * Compound modal dialog built on Base UI. Compose `Dialog.Trigger`,
 * `Dialog.Content`, `Dialog.Header`, `Dialog.Title`, `Dialog.Description`,
 * `Dialog.Footer`, and `Dialog.Close` inside the root.
 */
export const Dialog: TDialogComponent = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
})
