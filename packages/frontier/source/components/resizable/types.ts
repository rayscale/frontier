import type { ComponentPropsWithoutRef } from 'react'

/** Direction in which panels sit side by side: `horizontal` is a row, `vertical` is a column. */
export type TResizableOrientation = 'horizontal' | 'vertical'

/**
 * Size of a panel. A number is a percentage of the group; a string carries its own unit,
 * such as `"240px"` or `"20rem"`.
 */
export type TResizableSize = number | `${number}${'%' | 'px' | 'em' | 'rem' | 'vh' | 'vw'}`

/** Size of each panel as a percentage of the group, keyed by panel `id`. */
export type TResizableLayout = Readonly<{ [key: string]: number }>

/** Props for the element that lays out panels and the handles between them. */
export type TResizableRootProps = Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> & {
  /** Sizes the panels start with, keyed by panel `id`. Use it to restore a saved layout. */
  defaultLayout?: TResizableLayout | undefined
  /** Prevents every panel from being resized. */
  disabled?: boolean | undefined
  /** Called with the new layout once a resize has finished, not while the pointer moves. */
  onLayoutChange?: ((layout: TResizableLayout) => void) | undefined
  /** Direction in which panels sit side by side. Defaults to `horizontal`. */
  orientation?: TResizableOrientation | undefined
}

/** Props for a region whose size can change. */
export type TResizablePanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'id'> & {
  /** Size the panel collapses to. Defaults to `0`. */
  collapsedSize?: TResizableSize | undefined
  /** Lets the panel collapse when it is resized below `minSize`. */
  collapsible?: boolean | undefined
  /** Size the panel starts with. Panels without one share the remaining space. */
  defaultSize?: TResizableSize | undefined
  /** Prevents the panel from being resized, directly or by resizing its neighbors. */
  disabled?: boolean | undefined
  /** Identifies the panel in a layout. Required to save and restore a layout. */
  id?: string | undefined
  /** Largest size the panel can take. Defaults to the whole group. */
  maxSize?: TResizableSize | undefined
  /** Smallest size the panel can take. */
  minSize?: TResizableSize | undefined
  /** Called with the panel's size as a percentage of the group whenever it changes. */
  onResize?: ((size: number) => void) | undefined
}

/** Props for the separator that resizes the panels on either side of it. */
export type TResizableHandleProps = Omit<ComponentPropsWithoutRef<'div'>, 'id'> & {
  /** Prevents this handle from resizing its neighbors. */
  disabled?: boolean | undefined
  /** Shows a grip so the handle is easy to spot and grab. */
  grip?: boolean | undefined
  /** Identifies the handle in the group. */
  id?: string | undefined
}
