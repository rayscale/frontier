import { forwardRef, isValidElement } from 'react'

import {
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from '../../internal/primitives/menu/menu.js'
import { Button } from '../button/button.js'

import type {
  TDropdownMenuCheckboxItemProps,
  TDropdownMenuContentProps,
  TDropdownMenuGroupLabelProps,
  TDropdownMenuGroupProps,
  TDropdownMenuItemProps,
  TDropdownMenuProps,
  TDropdownMenuRadioGroupProps,
  TDropdownMenuRadioItemProps,
  TDropdownMenuSeparatorProps,
  TDropdownMenuSubmenuProps,
  TDropdownMenuSubmenuTriggerProps,
  TDropdownMenuTriggerProps,
} from './types.js'

export type {
  TDropdownMenuCheckboxItemProps,
  TDropdownMenuContentProps,
  TDropdownMenuGroupLabelProps,
  TDropdownMenuGroupProps,
  TDropdownMenuItemProps,
  TDropdownMenuProps,
  TDropdownMenuRadioGroupProps,
  TDropdownMenuRadioItemProps,
  TDropdownMenuSeparatorProps,
  TDropdownMenuSubmenuProps,
  TDropdownMenuSubmenuTriggerProps,
  TDropdownMenuTriggerProps,
} from './types.js'
import { omitUndefined } from '../../internal/helpers/omit-undefined.js'

function DropdownMenuRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: TDropdownMenuProps) {
  return (
    <MenuRoot {...omitUndefined({ open, onOpenChange })} defaultOpen={defaultOpen}>
      {children}
    </MenuRoot>
  )
}

function DropdownMenuTrigger({ children }: TDropdownMenuTriggerProps) {
  const trigger = isValidElement(children) ? children : <Button>{children}</Button>

  return <MenuTrigger render={trigger} />
}

const DropdownMenuContent = forwardRef<HTMLDivElement, TDropdownMenuContentProps>(
  function DropdownMenuContent(
    { side, align, sideOffset, alignOffset, className, children, ...props },
    ref,
  ) {
    return (
      <MenuPopup
        ref={ref}
        {...omitUndefined({ side, align, sideOffset, alignOffset, className })}
        {...omitUndefined(props)}
      >
        {children}
      </MenuPopup>
    )
  },
)

const DropdownMenuItem = forwardRef<HTMLDivElement, TDropdownMenuItemProps>(
  function DropdownMenuItem(props, ref) {
    return <MenuItem ref={ref} {...omitUndefined(props)} />
  },
)

const DropdownMenuGroup = forwardRef<HTMLDivElement, TDropdownMenuGroupProps>(
  function DropdownMenuGroup(props, ref) {
    return <MenuGroup ref={ref} {...omitUndefined(props)} />
  },
)

const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, TDropdownMenuCheckboxItemProps>(
  function DropdownMenuCheckboxItem({ onCheckedChange, ...props }, ref) {
    return (
      <MenuCheckboxItem
        ref={ref}
        onCheckedChange={(checked) => onCheckedChange?.(checked)}
        {...omitUndefined(props)}
      />
    )
  },
)

const DropdownMenuRadioGroup = forwardRef<HTMLDivElement, TDropdownMenuRadioGroupProps>(
  function DropdownMenuRadioGroup({ onValueChange, ...props }, ref) {
    return (
      <MenuRadioGroup
        ref={ref}
        onValueChange={(value) => {
          if (typeof value === 'string') {
            onValueChange?.(value)
          }
        }}
        {...omitUndefined(props)}
      />
    )
  },
)

const DropdownMenuRadioItem = forwardRef<HTMLDivElement, TDropdownMenuRadioItemProps>(
  function DropdownMenuRadioItem(props, ref) {
    return <MenuRadioItem ref={ref} {...omitUndefined(props)} />
  },
)

const DropdownMenuGroupLabel = forwardRef<HTMLDivElement, TDropdownMenuGroupLabelProps>(
  function DropdownMenuGroupLabel(props, ref) {
    return <MenuGroupLabel ref={ref} {...omitUndefined(props)} />
  },
)

const DropdownMenuSeparator = forwardRef<HTMLDivElement, TDropdownMenuSeparatorProps>(
  function DropdownMenuSeparator(props, ref) {
    return <MenuSeparator ref={ref} {...omitUndefined(props)} />
  },
)

function DropdownMenuSubmenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: TDropdownMenuSubmenuProps) {
  return (
    <MenuSubmenuRoot {...omitUndefined({ open, onOpenChange })} defaultOpen={defaultOpen}>
      {children}
    </MenuSubmenuRoot>
  )
}

const DropdownMenuSubmenuTrigger = forwardRef<HTMLDivElement, TDropdownMenuSubmenuTriggerProps>(
  function DropdownMenuSubmenuTrigger(props, ref) {
    return <MenuSubmenuTrigger ref={ref} {...omitUndefined(props)} />
  },
)

export interface TDropdownMenuComponent extends React.FC<TDropdownMenuProps> {
  Root: typeof DropdownMenuRoot
  /** Renders the trigger element that opens the dropdown menu. */
  Trigger: typeof DropdownMenuTrigger
  /** Renders the menu popup container. */
  Content: typeof DropdownMenuContent
  /** Renders a selectable menu item. */
  Item: typeof DropdownMenuItem
  /** Renders a menu item that toggles a checked state. */
  CheckboxItem: typeof DropdownMenuCheckboxItem
  /** Groups radio menu items so that exactly one is selected. */
  RadioGroup: typeof DropdownMenuRadioGroup
  /** Renders a radio menu item within a radio group. */
  RadioItem: typeof DropdownMenuRadioItem
  /** Groups related menu items. */
  Group: typeof DropdownMenuGroup
  /** Renders the label of a menu group. */
  GroupLabel: typeof DropdownMenuGroupLabel
  /** Renders a line separator between menu items or groups. */
  Separator: typeof DropdownMenuSeparator
  /** Renders a nested submenu. */
  Submenu: typeof DropdownMenuSubmenu
  /** Renders the trigger for a nested submenu. */
  SubmenuTrigger: typeof DropdownMenuSubmenuTrigger
}

/**
 * Action menu opened from a trigger. Compose it with `DropdownMenu.Trigger`,
 * `DropdownMenu.Content`, `DropdownMenu.Item`, and the optional group,
 * label, and separator parts. Use `Shortcut` inside an item to show a key
 * combination. Nest a `DropdownMenu.Submenu` for a submenu. Submenus open to the
 * inline end by default and flip to the other side when there is no room.
 * Forwards refs to the DOM element each part renders.
 */
export const DropdownMenu: TDropdownMenuComponent = Object.assign(DropdownMenuRoot, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Group: DropdownMenuGroup,
  GroupLabel: DropdownMenuGroupLabel,
  Separator: DropdownMenuSeparator,
  Submenu: DropdownMenuSubmenu,
  SubmenuTrigger: DropdownMenuSubmenuTrigger,
})
