import { DrawerContent } from './parts/content.js'
import { DrawerRoot, DrawerTrigger } from './parts/root.js'
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './parts/sections.js'
import type { TDrawerProps } from './types.js'

import './drawer.css'

export type {
  TDrawerCloseProps,
  TDrawerContentProps,
  TDrawerDescriptionProps,
  TDrawerFooterProps,
  TDrawerHeaderProps,
  TDrawerProps,
  TDrawerSide,
  TDrawerSize,
  TDrawerTitleProps,
  TDrawerTriggerProps,
} from './types.js'

export interface TDrawerComponent extends React.FC<TDrawerProps> {
  /** Renders the trigger element that opens the drawer. */
  Trigger: typeof DrawerTrigger
  /** Renders the modal drawer surface and backdrop. */
  Content: typeof DrawerContent
  /** Lays out header content at the top of the drawer. */
  Header: typeof DrawerHeader
  /** Renders the drawer title. */
  Title: typeof DrawerTitle
  /** Renders the drawer description. */
  Description: typeof DrawerDescription
  /** Lays out footer action buttons at the bottom of the drawer. */
  Footer: typeof DrawerFooter
  /** Renders a button that closes the drawer. */
  Close: typeof DrawerClose
}

/**
 * Compound modal drawer built on Base UI. Compose `Drawer.Trigger`,
 * `Drawer.Content`, `Drawer.Header`, `Drawer.Title`, `Drawer.Description`,
 * `Drawer.Footer`, and `Drawer.Close` inside the root.
 */
export const Drawer: TDrawerComponent = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Close: DrawerClose,
})
