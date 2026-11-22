import { forwardRef, useId } from 'react'

import { ChevronDown } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import {
  navigationMenuItemContext,
  useNavigationMenuContext,
  useNavigationMenuItemContext,
} from '../context.js'
import type {
  TNavigationMenuContentProps,
  TNavigationMenuItemProps,
  TNavigationMenuLinkProps,
  TNavigationMenuListProps,
  TNavigationMenuProps,
  TNavigationMenuTriggerProps,
} from '../types.js'

function revealState(revealed: boolean | undefined): 'in' | 'out' | undefined {
  if (revealed === undefined) {
    return undefined
  }

  return revealed ? 'in' : 'out'
}

export const StackedRoot = forwardRef<
  HTMLElement,
  Omit<
    TNavigationMenuProps,
    'defaultValue' | 'delay' | 'closeDelay' | 'layout' | 'onValueChange' | 'value'
  >
>(function StackedRoot({ revealed, className, children, ...props }, ref) {
  return (
    <nav
      {...props}
      ref={ref}
      data-reveal={revealState(revealed)}
      className={classNames(
        'frontier-navigation-menu',
        'frontier-navigation-menu--stacked',
        className,
      )}
    >
      {children}
    </nav>
  )
})

export const StackedList = forwardRef<HTMLUListElement, TNavigationMenuListProps>(
  function StackedList({ className, ...props }, ref) {
    return (
      <ul
        {...props}
        ref={ref}
        className={classNames('frontier-navigation-menu__list', className)}
      />
    )
  },
)

export const StackedItem = forwardRef<HTMLLIElement, TNavigationMenuItemProps>(function StackedItem(
  { value, className, ...props },
  ref,
) {
  const { value: openValue } = useNavigationMenuContext()
  const generatedValue = useId()
  const triggerId = useId()
  const panelId = useId()
  const itemValue = value ?? generatedValue

  return (
    <navigationMenuItemContext.Provider
      value={{ value: itemValue, open: openValue === itemValue, triggerId, panelId }}
    >
      <li
        {...props}
        ref={ref}
        className={classNames('frontier-navigation-menu__item', className)}
      />
    </navigationMenuItemContext.Provider>
  )
})

export const StackedTrigger = forwardRef<HTMLButtonElement, TNavigationMenuTriggerProps>(
  function StackedTrigger({ className, children, onClick, ...props }, ref) {
    const { setValue } = useNavigationMenuContext()
    const item = useNavigationMenuItemContext()

    return (
      <button
        type="button"
        {...props}
        ref={ref}
        id={item?.triggerId}
        aria-expanded={item?.open ?? false}
        aria-controls={item?.panelId}
        className={classNames('frontier-navigation-menu__trigger', className)}
        onClick={(event) => {
          onClick?.(event)

          if (!event.defaultPrevented && item) {
            setValue(item.open ? null : item.value)
          }
        }}
      >
        {children}
        <ChevronDown
          className="frontier-navigation-menu__trigger-icon"
          aria-hidden="true"
          focusable="false"
          size={16}
        />
      </button>
    )
  },
)

export const StackedContent = forwardRef<HTMLDivElement, TNavigationMenuContentProps>(
  function StackedContent({ className, children, ...props }, ref) {
    const item = useNavigationMenuItemContext()
    const open = item?.open ?? false

    return (
      <div
        {...props}
        ref={ref}
        id={item?.panelId}
        role="region"
        aria-labelledby={item?.triggerId}
        inert={!open}
        data-open={open ? '' : undefined}
        className={classNames(
          'frontier-navigation-menu__content',
          'frontier-navigation-menu__content--stacked',
          className,
        )}
      >
        <div className="frontier-navigation-menu__content-inner">{children}</div>
      </div>
    )
  },
)

export const StackedLink = forwardRef<HTMLAnchorElement, TNavigationMenuLinkProps>(
  function StackedLink({ active, closeOnClick, className, onClick, ...props }, ref) {
    const { setValue } = useNavigationMenuContext()

    return (
      <a
        {...props}
        ref={ref}
        aria-current={active ? 'page' : props['aria-current']}
        data-active={active ? '' : undefined}
        className={classNames('frontier-navigation-menu__link', className)}
        onClick={(event) => {
          onClick?.(event)

          if (closeOnClick) {
            setValue(null)
          }
        }}
      />
    )
  },
)
