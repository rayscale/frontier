import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { TMenuAlign, TMenuSide } from '../../internal/primitives/menu/menu.js'

/** Props for the {@link DropdownMenu} root component. */
export interface TDropdownMenuProps {
  /** Controlled open state. Omit to let the menu manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the menu opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Menu parts, such as `DropdownMenu.Trigger` and `DropdownMenu.Content`. */
  children?: ReactNode | undefined
}

/** Props for `DropdownMenu.Trigger`. */
export interface TDropdownMenuTriggerProps {
  /**
   * A single element that opens the menu. Its attributes and `onClick` are
   * preserved. Any other content is wrapped in a `Button`.
   */
  children: ReactNode
}

/** Props for `DropdownMenu.Content`, which renders the menu popup. */
export type TDropdownMenuContentProps = ComponentPropsWithoutRef<'div'> & {
  /** Side of the trigger where the menu appears. Defaults to `bottom`, or the inline end for submenus. */
  side?: TMenuSide | undefined
  /** Alignment along the chosen side. Defaults to `start`. */
  align?: TMenuAlign | undefined
  /** Distance in pixels between the trigger and the menu. Defaults to `4`. */
  sideOffset?: number | undefined
  /** Distance in pixels to shift the menu along the aligned edge. */
  alignOffset?: number | undefined
}

/**
 * Props for `DropdownMenu.Item`. Activating an item closes the menu. Use
 * `disabled` to keep an item visible but unavailable.
 */
export type TDropdownMenuItemProps = ComponentPropsWithoutRef<'div'> & {
  /** Disables the item. Disabled items are skipped by keyboard navigation. */
  disabled?: boolean | undefined
}

/** Props for `DropdownMenu.Group`. */
export type TDropdownMenuGroupProps = ComponentPropsWithoutRef<'div'>

/**
 * Props for `DropdownMenu.CheckboxItem`, a menu item that toggles a checked
 * state. It shows a check mark when on. Unlike `DropdownMenu.Item`, activating
 * it keeps the menu open so several options can be toggled in a row.
 */
export type TDropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<'div'> & {
  /** Controlled checked state. Omit to let the item manage its own state. */
  checked?: boolean | undefined
  /** Initial checked state when uncontrolled. Defaults to `false`. */
  defaultChecked?: boolean | undefined
  /** Called with the new checked state when the item is activated. */
  onCheckedChange?: ((checked: boolean) => void) | undefined
  /** Disables the item. Disabled items are skipped by keyboard navigation. */
  disabled?: boolean | undefined
}

/**
 * Props for `DropdownMenu.RadioGroup`, which groups `DropdownMenu.RadioItem`
 * parts so that exactly one of them is selected.
 */
export type TDropdownMenuRadioGroupProps = ComponentPropsWithoutRef<'div'> & {
  /** Controlled value of the selected radio item. */
  value?: string | undefined
  /** Initial value when uncontrolled. */
  defaultValue?: string | undefined
  /** Called with the newly selected value. */
  onValueChange?: ((value: string) => void) | undefined
}

/**
 * Props for `DropdownMenu.RadioItem`. Selecting it keeps the menu open and
 * shows a dot. Its `value` identifies it within the enclosing radio group.
 */
export type TDropdownMenuRadioItemProps = ComponentPropsWithoutRef<'div'> & {
  /** TValue this item represents within its `DropdownMenu.RadioGroup`. */
  value: string
  /** Disables the item. Disabled items are skipped by keyboard navigation. */
  disabled?: boolean | undefined
}

/** Props for `DropdownMenu.GroupLabel`. */
export type TDropdownMenuGroupLabelProps = ComponentPropsWithoutRef<'div'>

/** Props for `DropdownMenu.Separator`. */
export type TDropdownMenuSeparatorProps = ComponentPropsWithoutRef<'div'>

/**
 * Props for `DropdownMenu.Submenu`, a nested menu opened from a
 * `DropdownMenu.SubmenuTrigger` inside another menu.
 */
export interface TDropdownMenuSubmenuProps {
  /** Controlled open state of the submenu. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the submenu opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** A `DropdownMenu.SubmenuTrigger` and a `DropdownMenu.Content`. */
  children?: ReactNode | undefined
}

/**
 * Props for `DropdownMenu.SubmenuTrigger`. It is styled as an item and shows
 * a chevron. Hovering or pressing Right Arrow opens the submenu.
 */
export type TDropdownMenuSubmenuTriggerProps = ComponentPropsWithoutRef<'div'> & {
  /** Disables the trigger so its submenu cannot be opened. */
  disabled?: boolean | undefined
}
