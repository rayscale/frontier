import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/** Props for the {@link Breadcrumb} root, rendered as a navigation landmark. */
export type TBreadcrumbProps = ComponentPropsWithoutRef<'nav'> & {
  /**
   * Shown between items. It is rendered inside an element hidden from
   * assistive technology. Defaults to a chevron.
   */
  separator?: ReactNode | undefined
  /**
   * Enables collapsing. When the trail has more entries than this, the
   * middle entries are replaced by an ellipsis button that opens a menu of
   * the hidden entries. The count includes the first entry, the ellipsis,
   * and the last entries. Values below 3 are treated as 3. Omit to show
   * every entry.
   */
  maxVisibleItems?: number | undefined
  /** Items and dropdowns, in order from the root to the current location. */
  children?: ReactNode | undefined
}

/** Props for `Breadcrumb.Item`. */
export interface TBreadcrumbItemProps {
  /** Destination of the item. Items without a destination are shown as text. */
  href?: string | undefined
  /** Marks the item as the current page. It is not rendered as a link. */
  current?: boolean | undefined
  /** Visible label of the item. */
  children?: ReactNode | undefined
}

/** A destination offered by `Breadcrumb.Dropdown`. */
export interface TBreadcrumbDropdownItem {
  /** Visible label of the destination. */
  label: ReactNode
  /** Destination the menu item navigates to. */
  href: string
}

/** Props for `Breadcrumb.Dropdown`, an entry that opens a menu of destinations. */
export interface TBreadcrumbDropdownProps {
  /** Visible label of the trigger. */
  label: ReactNode
  /** Destinations listed in the menu. */
  items: readonly TBreadcrumbDropdownItem[]
}
