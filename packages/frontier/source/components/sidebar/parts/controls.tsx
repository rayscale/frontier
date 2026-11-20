import { forwardRef } from 'react'

import { PanelLeft } from '../../../symbols/index.js'
import { Button } from '../../button/button.js'
import { useSidebarContext } from '../context.js'
import type { TSidebarRailProps, TSidebarTriggerProps } from '../types.js'

function resolveTriggerName(mobile: boolean, mobileOpen: boolean, open: boolean): string {
  if (mobile) {
    return mobileOpen ? 'Close sidebar' : 'Open sidebar'
  }

  return open ? 'Collapse sidebar' : 'Expand sidebar'
}

export const SidebarTrigger = forwardRef<HTMLButtonElement, TSidebarTriggerProps>(
  function SidebarTrigger(
    { 'aria-label': accessibleName, onClick, className, children, ...props },
    ref,
  ) {
    const { open, mobile, mobileOpen, sidebarId, toggleSidebar } =
      useSidebarContext('Sidebar.Trigger')
    const expanded = mobile ? mobileOpen : open
    const defaultName = resolveTriggerName(mobile, mobileOpen, open)

    return (
      <Button
        {...props}
        ref={ref}
        variant="ghost"
        size="symbol"
        className={['frontier-sidebar__trigger', className].filter(Boolean).join(' ')}
        aria-label={accessibleName ?? defaultName}
        aria-expanded={expanded}
        aria-controls={sidebarId}
        onClick={(event) => {
          onClick?.(event)

          if (!event.defaultPrevented) {
            toggleSidebar()
          }
        }}
      >
        {children ?? <PanelLeft aria-hidden="true" className="frontier-sidebar__trigger-symbol" />}
      </Button>
    )
  },
)

export const SidebarRail = forwardRef<HTMLButtonElement, TSidebarRailProps>(function SidebarRail(
  { 'aria-label': accessibleName = 'Toggle sidebar', onClick, className, ...props },
  ref,
) {
  const { open, mobile, mobileOpen, sidebarId, toggleSidebar } = useSidebarContext('Sidebar.Rail')

  return (
    <Button
      {...props}
      ref={ref}
      variant="ghost"
      size="symbol-small"
      className={['frontier-sidebar__rail', className].filter(Boolean).join(' ')}
      aria-label={accessibleName}
      aria-controls={sidebarId}
      aria-expanded={mobile ? mobileOpen : open}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          toggleSidebar()
        }
      }}
    />
  )
})
