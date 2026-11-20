import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/** Props for the {@link ContextMenu} root component. */
export interface TContextMenuProps {
  /** Controlled open state. Omit to let the menu manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the menu opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** A `ContextMenu.Trigger` and a `ContextMenu.Content`. */
  children?: ReactNode | undefined
}

/**
 * Props for `ContextMenu.Trigger`, the region that opens the menu on right
 * click or long press. It renders a `div` around its children.
 */
export type TContextMenuTriggerProps = ComponentPropsWithoutRef<'div'>

/** Props for `ContextMenu.Content`, which renders the menu popup at the pointer. */
export type TContextMenuContentProps = ComponentPropsWithoutRef<'div'>

/**
 * Props for `ContextMenu.Item`. Activating an item closes the menu. Use
 * `disabled` to keep an item visible but unavailable.
 */
export type TContextMenuItemProps = ComponentPropsWithoutRef<'div'> & {
  /** Disables the item. Disabled items are skipped by keyboard navigation. */
  disabled?: boolean | undefined
}

/** Props for `ContextMenu.Group`. */
export type TContextMenuGroupProps = ComponentPropsWithoutRef<'div'>

/**
 * Props for `ContextMenu.CheckboxItem`, a menu item that toggles a checked
 * state. Activating it keeps the menu open so several options can be toggled.
 */
export type TContextMenuCheckboxItemProps = ComponentPropsWithoutRef<'div'> & {
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
 * Props for `ContextMenu.RadioGroup`, which groups `ContextMenu.RadioItem`
 * parts so that exactly one of them is selected.
 */
export type TContextMenuRadioGroupProps = ComponentPropsWithoutRef<'div'> & {
  /** Controlled value of the selected radio item. */
  value?: string | undefined
  /** Initial value when uncontrolled. */
  defaultValue?: string | undefined
  /** Called with the newly selected value. */
  onValueChange?: ((value: string) => void) | undefined
}

/**
 * Props for `ContextMenu.RadioItem`. Selecting it keeps the menu open and
 * shows a dot. Its `value` identifies it within the enclosing radio group.
 */
export type TContextMenuRadioItemProps = ComponentPropsWithoutRef<'div'> & {
  /** TValue this item represents within its `ContextMenu.RadioGroup`. */
  value: string
  /** Disables the item. Disabled items are skipped by keyboard navigation. */
  disabled?: boolean | undefined
}

/** Props for `ContextMenu.GroupLabel`. */
export type TContextMenuGroupLabelProps = ComponentPropsWithoutRef<'div'>

/** Props for `ContextMenu.Separator`. */
export type TContextMenuSeparatorProps = ComponentPropsWithoutRef<'div'>

/**
 * Props for `ContextMenu.Submenu`, a nested menu opened from a
 * `ContextMenu.SubmenuTrigger` inside the context menu.
 */
export interface TContextMenuSubmenuProps {
  /** Controlled open state of the submenu. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the submenu opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** A `ContextMenu.SubmenuTrigger` and a `ContextMenu.Content`. */
  children?: ReactNode | undefined
}

/**
 * Props for `ContextMenu.SubmenuTrigger`. It is styled as an item and shows
 * a chevron. Hovering or pressing Right Arrow opens the submenu.
 */
export type TContextMenuSubmenuTriggerProps = ComponentPropsWithoutRef<'div'> & {
  /** Disables the trigger so its submenu cannot be opened. */
  disabled?: boolean | undefined
}
