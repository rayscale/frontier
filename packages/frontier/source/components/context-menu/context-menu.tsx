import { forwardRef } from 'react'

import {
  MenuCheckboxItem,
  MenuContextPopup,
  MenuContextRoot,
  MenuContextTrigger,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from '../../internal/primitives/menu/menu.js'

import type {
  TContextMenuCheckboxItemProps,
  TContextMenuContentProps,
  TContextMenuGroupLabelProps,
  TContextMenuGroupProps,
  TContextMenuItemProps,
  TContextMenuProps,
  TContextMenuRadioGroupProps,
  TContextMenuRadioItemProps,
  TContextMenuSeparatorProps,
  TContextMenuSubmenuProps,
  TContextMenuSubmenuTriggerProps,
  TContextMenuTriggerProps,
} from './types.js'

export type {
  TContextMenuCheckboxItemProps,
  TContextMenuContentProps,
  TContextMenuGroupLabelProps,
  TContextMenuGroupProps,
  TContextMenuItemProps,
  TContextMenuProps,
  TContextMenuRadioGroupProps,
  TContextMenuRadioItemProps,
  TContextMenuSeparatorProps,
  TContextMenuSubmenuProps,
  TContextMenuSubmenuTriggerProps,
  TContextMenuTriggerProps,
} from './types.js'
import { omitUndefined } from '../../internal/helpers/omit-undefined.js'

function ContextMenuRoot({ open, defaultOpen = false, onOpenChange, children }: TContextMenuProps) {
  return (
    <MenuContextRoot {...omitUndefined({ open, onOpenChange })} defaultOpen={defaultOpen}>
      {children}
    </MenuContextRoot>
  )
}

const ContextMenuTrigger = forwardRef<HTMLDivElement, TContextMenuTriggerProps>(
  function ContextMenuTrigger(props, ref) {
    return <MenuContextTrigger ref={ref} {...omitUndefined(props)} />
  },
)

const ContextMenuContent = forwardRef<HTMLDivElement, TContextMenuContentProps>(
  function ContextMenuContent(props, ref) {
    return <MenuContextPopup ref={ref} {...omitUndefined(props)} />
  },
)

const ContextMenuItem = forwardRef<HTMLDivElement, TContextMenuItemProps>(
  function ContextMenuItem(props, ref) {
    return <MenuItem ref={ref} {...omitUndefined(props)} />
  },
)

const ContextMenuGroup = forwardRef<HTMLDivElement, TContextMenuGroupProps>(
  function ContextMenuGroup(props, ref) {
    return <MenuGroup ref={ref} {...omitUndefined(props)} />
  },
)

const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, TContextMenuCheckboxItemProps>(
  function ContextMenuCheckboxItem({ onCheckedChange, ...props }, ref) {
    return (
      <MenuCheckboxItem
        ref={ref}
        onCheckedChange={(checked) => onCheckedChange?.(checked)}
        {...omitUndefined(props)}
      />
    )
  },
)

const ContextMenuRadioGroup = forwardRef<HTMLDivElement, TContextMenuRadioGroupProps>(
  function ContextMenuRadioGroup({ onValueChange, ...props }, ref) {
    return (
      <MenuRadioGroup
        ref={ref}
        onValueChange={(value) => {
          if (typeof value === 'string') {
            onValueChange?.(value)
          }
        }}
        {...props}
      />
    )
  },
)

const ContextMenuRadioItem = forwardRef<HTMLDivElement, TContextMenuRadioItemProps>(
  function ContextMenuRadioItem(props, ref) {
    return <MenuRadioItem ref={ref} {...omitUndefined(props)} />
  },
)

const ContextMenuGroupLabel = forwardRef<HTMLDivElement, TContextMenuGroupLabelProps>(
  function ContextMenuGroupLabel(props, ref) {
    return <MenuGroupLabel ref={ref} {...omitUndefined(props)} />
  },
)

const ContextMenuSeparator = forwardRef<HTMLDivElement, TContextMenuSeparatorProps>(
  function ContextMenuSeparator(props, ref) {
    return <MenuSeparator ref={ref} {...omitUndefined(props)} />
  },
)

function ContextMenuSubmenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: TContextMenuSubmenuProps) {
  return (
    <MenuSubmenuRoot {...omitUndefined({ open, onOpenChange })} defaultOpen={defaultOpen}>
      {children}
    </MenuSubmenuRoot>
  )
}

const ContextMenuSubmenuTrigger = forwardRef<HTMLDivElement, TContextMenuSubmenuTriggerProps>(
  function ContextMenuSubmenuTrigger(props, ref) {
    return <MenuSubmenuTrigger ref={ref} {...omitUndefined(props)} />
  },
)

export interface TContextMenuComponent extends React.FC<TContextMenuProps> {
  Root: typeof ContextMenuRoot
  /** Renders the trigger region that opens the menu on right click or long press. */
  Trigger: typeof ContextMenuTrigger
  /** Renders the popup container for menu items. */
  Content: typeof ContextMenuContent
  /** Renders a selectable menu action item. */
  Item: typeof ContextMenuItem
  /** Renders a menu item that toggles a checked state. */
  CheckboxItem: typeof ContextMenuCheckboxItem
  /** Groups radio items so that exactly one is selected. */
  RadioGroup: typeof ContextMenuRadioGroup
  /** Renders a menu item within a radio group. */
  RadioItem: typeof ContextMenuRadioItem
  /** Groups related menu items. */
  Group: typeof ContextMenuGroup
  /** Renders the label of a menu group. */
  GroupLabel: typeof ContextMenuGroupLabel
  /** Renders a line separator between menu items or groups. */
  Separator: typeof ContextMenuSeparator
  /** Renders a nested submenu. */
  Submenu: typeof ContextMenuSubmenu
  /** Renders the trigger for a nested submenu. */
  SubmenuTrigger: typeof ContextMenuSubmenuTrigger
}

/**
 * Action menu opened by right clicking or long pressing its trigger region.
 * Compose it with `ContextMenu.Trigger`, `ContextMenu.Content`, and
 * `ContextMenu.Item`, plus the optional group, label, separator, checkbox,
 * radio, and submenu parts. The menu opens at the pointer, and submenus open
 * beside their trigger. Forwards refs to the DOM element each part renders.
 */
export const ContextMenu: TContextMenuComponent = Object.assign(ContextMenuRoot, {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Group: ContextMenuGroup,
  GroupLabel: ContextMenuGroupLabel,
  Separator: ContextMenuSeparator,
  Submenu: ContextMenuSubmenu,
  SubmenuTrigger: ContextMenuSubmenuTrigger,
})
