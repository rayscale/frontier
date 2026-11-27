import { SheetContent } from './parts/content.js'
import { SheetRoot, SheetTrigger } from './parts/root.js'
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './parts/sections.js'
import type { TSheetProps } from './types.js'

import './sheet.css'

export type {
  TSheetCloseProps,
  TSheetContentProps,
  TSheetDescriptionProps,
  TSheetFooterProps,
  TSheetHeaderProps,
  TSheetProps,
  TSheetSide,
  TSheetSize,
  TSheetTitleProps,
  TSheetTriggerProps,
} from './types.js'

export interface TSheetComponent extends React.FC<TSheetProps> {
  /** Renders the trigger element that opens the sheet. */
  Trigger: typeof SheetTrigger
  /** Renders the modal sheet surface and backdrop. */
  Content: typeof SheetContent
  /** Lays out header content at the top of the sheet. */
  Header: typeof SheetHeader
  /** Renders the sheet title. */
  Title: typeof SheetTitle
  /** Renders the sheet description. */
  Description: typeof SheetDescription
  /** Lays out footer action buttons at the bottom of the sheet. */
  Footer: typeof SheetFooter
  /** Renders a button that closes the sheet. */
  Close: typeof SheetClose
}

/**
 * Compound modal sheet built on Base UI. Compose `Sheet.Trigger`,
 * `Sheet.Content`, `Sheet.Header`, `Sheet.Title`, `Sheet.Description`,
 * `Sheet.Footer`, and `Sheet.Close` inside the root.
 */
export const Sheet: TSheetComponent = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Footer: SheetFooter,
  Close: SheetClose,
})
