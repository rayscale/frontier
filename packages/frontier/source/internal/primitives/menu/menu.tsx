import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react'

import { Check, ChevronRight, Circle } from '../../../icons/index.js'
import { omitUndefined } from '../../../internal/helpers/omit-undefined.js'
import { AnimatedHighlight } from '../animated-highlight/animated-highlight.js'

import '../../styles/floating-surface.css'
import './menu.css'

/** Side of the trigger where the menu popup is placed. */
export type TMenuSide = 'top' | 'right' | 'bottom' | 'left'

/** Alignment of the menu popup along the chosen side. */
export type TMenuAlign = 'start' | 'center' | 'end'

export interface TMenuRootProps {
  /** Controlled open state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the menu opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  children?: ReactNode | undefined
}

export interface TMenuTriggerProps {
  /** Element that toggles the menu. Base UI merges its handlers into it. */
  render: ReactElement
}

export type TMenuContextTriggerProps = ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger>

export type TMenuPopupProps = Omit<ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className'> & {
  className?: string | undefined
  side?: TMenuSide | undefined
  align?: TMenuAlign | undefined
  sideOffset?: number | undefined
  alignOffset?: number | undefined
}

export type TMenuItemProps = Omit<ComponentPropsWithoutRef<typeof BaseMenu.Item>, 'className'> & {
  className?: string | undefined
}

export type TMenuCheckboxItemProps = Omit<
  ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>,
  'className'
> & {
  className?: string | undefined
}

export type TMenuRadioGroupProps = Omit<
  ComponentPropsWithoutRef<typeof BaseMenu.RadioGroup>,
  'className'
> & {
  className?: string | undefined
}

export type TMenuRadioItemProps = Omit<
  ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>,
  'className'
> & {
  className?: string | undefined
}

export interface TMenuSubmenuRootProps {
  /** Controlled open state of the submenu. */
  open?: boolean | undefined
  /** Initial open state of the submenu when uncontrolled. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the submenu opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  children?: ReactNode | undefined
}

export type TMenuSubmenuTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>,
  'className'
> & {
  className?: string | undefined
}

export type TMenuGroupProps = Omit<ComponentPropsWithoutRef<typeof BaseMenu.Group>, 'className'> & {
  className?: string | undefined
}

export type TMenuGroupLabelProps = Omit<
  ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>,
  'className'
> & {
  className?: string | undefined
}

export type TMenuSeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof BaseMenu.Separator>,
  'className'
> & {
  className?: string | undefined
}

function classNames(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(' ')
}

/**
 * Wires Base UI's menu state into One. Keyboard navigation, focus
 * management, and dismissal come from Base UI.
 */
export function MenuRoot({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: TMenuRootProps): ReactElement {
  return (
    <BaseMenu.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
    >
      {children}
    </BaseMenu.Root>
  )
}

/** Renders the trigger element, delegating its rendering to Base UI. */
export function MenuTrigger({ render }: TMenuTriggerProps): ReactElement {
  return <BaseMenu.Trigger render={render} />
}

/**
 * Renders the popup in a portal beside the trigger. The highlight is the first
 * child so that it sits behind the items.
 */
const MenuSubmenuContext = createContext(false)

type TMenuPopupSurfaceProps = Omit<ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className'> & {
  className?: string | undefined
}

/** The styled popup shared by root menus and context menus. */
const MenuPopupSurface = forwardRef<HTMLDivElement, TMenuPopupSurfaceProps>(
  function MenuPopupSurface({ className, children, ...props }, ref) {
    return (
      <BaseMenu.Popup
        ref={ref}
        className={classNames('frontier-menu__popup frontier-floating-surface', className)}
        {...props}
      >
        <AnimatedHighlight />
        {children}
      </BaseMenu.Popup>
    )
  },
)

export const MenuPopup = forwardRef<HTMLDivElement, TMenuPopupProps>(function MenuPopup(
  { side, align, sideOffset = 4, alignOffset, className, children, ...props },
  ref,
) {
  const submenuState = useContext(MenuSubmenuContext)
  const resolvedSide = side ?? (submenuState ? undefined : 'bottom')
  const resolvedAlign = align ?? (submenuState ? undefined : 'start')

  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={resolvedSide}
        align={resolvedAlign}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="frontier-menu__positioner"
      >
        <MenuPopupSurface ref={ref} {...omitUndefined({ className })} {...omitUndefined(props)}>
          {children}
        </MenuPopupSurface>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
})

/** Wraps a context menu's root. Its popup opens at the pointer. */
export function MenuContextRoot({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: TMenuRootProps): ReactElement {
  return (
    <BaseContextMenu.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
    >
      {children}
    </BaseContextMenu.Root>
  )
}

/** Region that opens the context menu on right click or long press. */
export const MenuContextTrigger = forwardRef<HTMLDivElement, TMenuContextTriggerProps>(
  function MenuContextTrigger({ children, ...props }, ref) {
    return (
      <BaseContextMenu.Trigger ref={ref} {...props}>
        {children}
      </BaseContextMenu.Trigger>
    )
  },
)

/**
 * Renders a context menu popup at the pointer. Base UI supplies the default
 * offsets and places submenus beside their trigger.
 */
export const MenuContextPopup = forwardRef<HTMLDivElement, TMenuPopupSurfaceProps>(
  function MenuContextPopup({ className, children, ...props }, ref) {
    return (
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="frontier-menu__positioner">
          <MenuPopupSurface ref={ref} {...omitUndefined({ className })} {...omitUndefined(props)}>
            {children}
          </MenuPopupSurface>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    )
  },
)

/**
 * Wraps a submenu's trigger and popup. Its popup is rendered with
 * `MenuPopup`, so it shares the same portal and styling as the root menu.
 */
export function MenuSubmenuRoot({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: TMenuSubmenuRootProps): ReactElement {
  return (
    <BaseMenu.SubmenuRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
    >
      <MenuSubmenuContext.Provider value={true}>{children}</MenuSubmenuContext.Provider>
    </BaseMenu.SubmenuRoot>
  )
}

/** Styled like a menu item, with a trailing chevron that marks the submenu. */
export const MenuSubmenuTrigger = forwardRef<HTMLDivElement, TMenuSubmenuTriggerProps>(
  function MenuSubmenuTrigger({ className, children, ...props }, ref) {
    return (
      <BaseMenu.SubmenuTrigger
        ref={ref}
        className={classNames('frontier-menu__item frontier-menu__submenu-trigger', className)}
        {...props}
      >
        {children}
        <ChevronRight size={16} aria-hidden="true" className="frontier-menu__submenu-chevron" />
      </BaseMenu.SubmenuTrigger>
    )
  },
)

export const MenuItem = forwardRef<HTMLDivElement, TMenuItemProps>(function MenuItem(
  { className, ...props },
  ref,
) {
  return (
    <BaseMenu.Item ref={ref} className={classNames('frontier-menu__item', className)} {...props} />
  )
})

/** A menu item that toggles a checked state and shows a check mark when on. */
export const MenuCheckboxItem = forwardRef<HTMLDivElement, TMenuCheckboxItemProps>(
  function MenuCheckboxItem({ className, children, ...props }, ref) {
    return (
      <BaseMenu.CheckboxItem
        ref={ref}
        className={classNames('frontier-menu__item frontier-menu__item--selectable', className)}
        {...props}
      >
        <BaseMenu.CheckboxItemIndicator className="frontier-menu__item-indicator" keepMounted>
          <Check size={16} aria-hidden="true" />
        </BaseMenu.CheckboxItemIndicator>
        {children}
      </BaseMenu.CheckboxItem>
    )
  },
)

/** Groups radio items so that exactly one of them is checked at a time. */
export const MenuRadioGroup = forwardRef<HTMLDivElement, TMenuRadioGroupProps>(
  function MenuRadioGroup({ className, ...props }, ref) {
    return (
      <BaseMenu.RadioGroup
        ref={ref}
        className={classNames('frontier-menu__radio-group', className)}
        {...props}
      />
    )
  },
)

/** A menu item within a `MenuRadioGroup` that shows a dot when selected. */
export const MenuRadioItem = forwardRef<HTMLDivElement, TMenuRadioItemProps>(function MenuRadioItem(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseMenu.RadioItem
      ref={ref}
      className={classNames('frontier-menu__item frontier-menu__item--selectable', className)}
      {...props}
    >
      <BaseMenu.RadioItemIndicator className="frontier-menu__item-indicator" keepMounted>
        <Circle size={8} fill="currentColor" aria-hidden="true" />
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  )
})

export const MenuGroup = forwardRef<HTMLDivElement, TMenuGroupProps>(function MenuGroup(
  { className, ...props },
  ref,
) {
  return (
    <BaseMenu.Group
      ref={ref}
      className={classNames('frontier-menu__group', className)}
      {...props}
    />
  )
})

export const MenuGroupLabel = forwardRef<HTMLDivElement, TMenuGroupLabelProps>(
  function MenuGroupLabel({ className, ...props }, ref) {
    return (
      <BaseMenu.GroupLabel
        ref={ref}
        className={classNames('frontier-menu__group-label', className)}
        {...props}
      />
    )
  },
)

export const MenuSeparator = forwardRef<HTMLDivElement, TMenuSeparatorProps>(function MenuSeparator(
  { className, ...props },
  ref,
) {
  return (
    <BaseMenu.Separator
      ref={ref}
      className={classNames('frontier-menu__separator', className)}
      {...props}
    />
  )
})
