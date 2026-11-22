import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'

import type { TButtonProps } from '../button/button.js'
import type { TTreeProps } from '../tree/types.js'

/** Props for `Sidebar.Root`, including layout and expansion controls. */
export type TSidebarRootProps = HTMLAttributes<HTMLDivElement> & {
  /** Current desktop expansion state. Mobile drawer visibility stays internal. */
  open?: boolean | undefined
  /** Initial expanded state when uncontrolled. Defaults to `true`. */
  defaultOpen?: boolean | undefined
  /** Called whenever desktop expansion is requested to change. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Expanded desktop width. Defaults to `16rem`. */
  width?: number | string | undefined
  /** Icon-only desktop width. Defaults to `3rem`. */
  collapsedWidth?: number | string | undefined
  /** Mobile drawer width. Defaults to `18rem`. */
  mobileWidth?: number | string | undefined
  /** Modifier shortcut key. `false` disables the shortcut; defaults to `b`. */
  keyboardShortcut?: string | false | undefined
  /** Enables one shared sliding surface for menu and submenu hover. Defaults to `true`. */
  animateOnHover?: boolean | undefined
  /** Accessible name of the sidebar navigation landmark. */
  label?: string | undefined
  /** Sidebar sections and an optional direct `Sidebar.Inset` child. */
  children?: ReactNode | undefined
}

/** Props for the sidebar's pinned header. */
export type TSidebarHeaderProps = HTMLAttributes<HTMLDivElement>

/** Props for the sidebar's brand area. */
export type TSidebarBrandProps = HTMLAttributes<HTMLDivElement> & {
  /** Mark displayed beside the brand name, and alone when collapsed. */
  icon?: ReactNode | undefined
  children?: ReactNode | undefined
}

/** Props for the sidebar's scrollable content area. */
export type TSidebarContentProps = HTMLAttributes<HTMLDivElement>

/** Props for a grouped set of sidebar navigation items. */
export type TSidebarGroupProps = HTMLAttributes<HTMLElement>

/** Props for a group heading. */
export type TSidebarGroupLabelProps = HTMLAttributes<HTMLHeadingElement>

/** Props for an icon-only action beside a group heading. */
export type TSidebarGroupActionProps = Omit<TButtonProps, 'variant' | 'size' | 'aria-label'> & {
  /** Accessible name describing the action. */
  'aria-label': string
}

/** Props for the content region inside a group. */
export type TSidebarGroupContentProps = HTMLAttributes<HTMLDivElement>

/** Props for a semantic list of sidebar items. */
export type TSidebarMenuProps = HTMLAttributes<HTMLUListElement>

/** Props for an item in a sidebar menu. */
export type TSidebarMenuItemProps = HTMLAttributes<HTMLLIElement>

export type TSidebarItemLabelProps =
  { children: string; label?: string } | { children: ReactNode; label: string }

/** Props for a navigational item. `href` renders an anchor; without it, a button is rendered. */
export type TSidebarItemProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onClick'> & {
  /** Destination for a native anchor. Omit to render an action button. */
  href?: string | undefined
  /** Optional Lucide icon or other mark displayed before the label. */
  icon?: ReactNode | undefined
  /** Marks the current destination with `aria-current="page"`. */
  active?: boolean | undefined
  /** Custom tooltip for icon-only mode; string labels are used by default. */
  tooltip?: string | undefined
  /** Accessible label for non-text children and tooltip text in icon-only mode. */
  label?: string | undefined
  /** Prevents activation. */
  disabled?: boolean | undefined
  /** Link target when `href` is provided. */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'] | undefined
  /** Link relationship when `href` is provided. */
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'] | undefined
  /** Button type when `href` is omitted. Defaults to `button`. */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | undefined
  /** Called when the item is activated. */
  onClick?: MouseEventHandler<HTMLElement> | undefined
} & TSidebarItemLabelProps

/** Props for an icon-only action beside a menu item. */
export type TSidebarMenuActionProps = Omit<TButtonProps, 'variant' | 'size' | 'aria-label'> & {
  /** Accessible name describing the action. */
  'aria-label': string
}

/** Props for a count or status badge beside a menu item. */
export type TSidebarMenuBadgeProps = HTMLAttributes<HTMLSpanElement>

/** Props for a collapsible nested navigation group. */
export type TSidebarSubmenuProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Visible label and accessible name for the disclosure button. */
  label: string
  /** Optional Lucide icon or other mark displayed before the label. */
  icon?: ReactNode | undefined
  /** Current expanded state. Pass `onOpenChange` to control it. */
  open?: boolean | undefined
  /** Initial expanded state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called whenever the nested navigation state is requested to change. */
  onOpenChange?: ((open: boolean) => void) | undefined
  children?: ReactNode | undefined
}

/** Props for a nested navigation item. */
export type TSidebarSubmenuItemProps = TSidebarItemProps

/**
 * Props for `Sidebar.Tree`, which inherits the sidebar's collapsed state and
 * handles compact branch clicks itself.
 */
export type TSidebarTreeProps = Omit<TTreeProps, 'compact' | 'onCompactBranchClick'>

/** Props for the sidebar's pinned footer. */
export type TSidebarFooterProps = HTMLAttributes<HTMLDivElement>

/** Props for the sidebar toggle button. */
export interface TSidebarTriggerProps {
  /** Accessible name override. The default describes the next state. */
  'aria-label'?: string | undefined
  /** Called after the trigger is activated. */
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  children?: ReactNode | undefined
  className?: string | undefined
  disabled?: boolean | undefined
  id?: string | undefined
  title?: string | undefined
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | undefined
}

/** Props for the narrow sidebar toggle rail. */
export interface TSidebarRailProps {
  /** Accessible name override. */
  'aria-label'?: string | undefined
  /** Called after the rail is activated. */
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  className?: string | undefined
  disabled?: boolean | undefined
  id?: string | undefined
  title?: string | undefined
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | undefined
}

/** Props for the main content area adjacent to the sidebar. */
export type TSidebarInsetProps = HTMLAttributes<HTMLDivElement>
