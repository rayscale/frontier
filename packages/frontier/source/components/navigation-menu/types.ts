import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

/** Props for the {@link NavigationMenu} root, rendered as a `<nav>` landmark. */
export type TNavigationMenuProps = Omit<HTMLAttributes<HTMLElement>, 'defaultValue'> & {
  /** Identifier of the open item when controlled. `null` closes every item. */
  value?: string | null | undefined
  /** Initially open item when uncontrolled. Defaults to `null`. */
  defaultValue?: string | null | undefined
  /** Called with the identifier of the item that opened or closed. */
  onValueChange?: ((value: string | null) => void) | undefined
  /** Milliseconds before an item opens on hover. Defaults to `50`. */
  delay?: number | undefined
  /** Milliseconds before a hovered item closes. Defaults to `50`. */
  closeDelay?: number | undefined
  /** Navigation list, items, and links. */
  children?: ReactNode | undefined
}

/** Props for `NavigationMenu.List`, a `<ul>` of items. */
export type TNavigationMenuListProps = HTMLAttributes<HTMLUListElement>

/** Props for `NavigationMenu.Item`, a `<li>` that holds a trigger or a link. */
export type TNavigationMenuItemProps = HTMLAttributes<HTMLLIElement> & {
  /** Identifier used by `value` and `defaultValue`. Generated when omitted. */
  value?: string | undefined
}

/** Props for `NavigationMenu.Trigger`, a button that opens its item's content. */
export type TNavigationMenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

/** Props for `NavigationMenu.Content`, the panel shown when its item is open. */
export type TNavigationMenuContentProps = HTMLAttributes<HTMLDivElement>

/**
 * Props for `NavigationMenu.Group`, a column or section of links inside a
 * panel.
 */
export type TNavigationMenuGroupProps = HTMLAttributes<HTMLDivElement>

/** Props for `NavigationMenu.Link`, a native anchor for navigation. */
export type TNavigationMenuLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Marks the link as the current page. Defaults to `false`. */
  active?: boolean | undefined
  /** Closes any open dropdown when the link is activated. Defaults to `false`. */
  closeOnClick?: boolean | undefined
}
