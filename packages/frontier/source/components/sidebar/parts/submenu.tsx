import { forwardRef, useId, useState } from 'react'

import { ChevronDown } from '../../../symbols/index.js'
import { Button } from '../../button/button.js'
import { Collapsible } from '../../collapsible/collapsible.js'
import { Tooltip } from '../../tooltip/tooltip.js'
import { useSidebarContext } from '../context.js'
import type { TSidebarSubmenuItemProps, TSidebarSubmenuProps } from '../types.js'

import { SidebarItem } from './menu.js'

export const SidebarSubmenu = forwardRef<HTMLDivElement, TSidebarSubmenuProps>(
  function SidebarSubmenu(
    { label, symbol, open, defaultOpen = false, onOpenChange, className, children, ...props },
    ref,
  ) {
    const {
      mobile,
      open: sidebarOpen,
      setOpen: setSidebarOpen,
    } = useSidebarContext('Sidebar.Submenu')
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const [beenOpened, setHasBeenOpened] = useState(false)
    const openState = open ?? uncontrolledOpen
    const submenuId = useId()

    const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen) {
        setHasBeenOpened(true)
      }

      if (open === undefined) {
        setUncontrolledOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    }

    const handleClick = () => {
      if (!sidebarOpen && !mobile) {
        setSidebarOpen(true)
      } else {
        handleOpenChange(!openState)
      }
    }

    const trigger = (
      <Button
        variant="ghost"
        className="frontier-sidebar__submenu-trigger"
        data-sidebar="menu-button"
        aria-label={label}
        aria-expanded={openState && (sidebarOpen || mobile)}
        aria-controls={submenuId}
        onClick={handleClick}
      >
        {symbol && (
          <span className="frontier-sidebar__item-symbol" aria-hidden="true">
            {symbol}
          </span>
        )}
        <span className="frontier-sidebar__item-label">{label}</span>
        <ChevronDown aria-hidden="true" className="frontier-sidebar__submenu-chevron" />
      </Button>
    )

    return (
      <Collapsible.Root
        {...props}
        ref={ref}
        open={openState}
        onOpenChange={handleOpenChange}
        data-sidebar-stagger={beenOpened ? 'true' : undefined}
        className={['frontier-sidebar__submenu', className].filter(Boolean).join(' ')}
      >
        {!sidebarOpen && !mobile ? (
          <Tooltip content={label} placement="right">
            {trigger}
          </Tooltip>
        ) : (
          trigger
        )}
        <Collapsible.Content id={submenuId} className="frontier-sidebar__submenu-content">
          <ul className="frontier-sidebar__submenu-list">{children}</ul>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  },
)

export const SidebarSubmenuItem = forwardRef<HTMLElement, TSidebarSubmenuItemProps>(
  function SidebarSubmenuItem({ className, ...props }, ref) {
    return (
      <li className={['frontier-sidebar__submenu-item', className].filter(Boolean).join(' ')}>
        <SidebarItem {...props} ref={ref} />
      </li>
    )
  },
)
