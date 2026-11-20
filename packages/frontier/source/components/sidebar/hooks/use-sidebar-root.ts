import { type CSSProperties, useCallback, useEffect, useId, useState } from 'react'

import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useMediaQuery } from '../../../internal/helpers/use-media-query.js'
import { toCssLength } from '../helpers/css-length.js'

const mobileQuery = '(max-width: 48rem)'

interface TUseSidebarRootOptions {
  open: boolean | undefined
  defaultOpen: boolean
  onOpenChange: ((open: boolean) => void) | undefined
  keyboardShortcut: string | false
  width: number | string
  collapsedWidth: number | string
  mobileWidth: number | string
}

export function useSidebarRoot({
  open,
  defaultOpen,
  onOpenChange,
  keyboardShortcut,
  width,
  collapsedWidth,
  mobileWidth,
}: TUseSidebarRootOptions): {
  sidebarId: string
  mobileState: boolean
  openState: boolean
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
  setOpen: (nextOpen: boolean) => void
  toggleSidebar: () => void
  sidebarStyle: CSSProperties & TCssCustomProperties
  mobileDrawerStyle: CSSProperties & TCssCustomProperties
} {
  const sidebarId = useId()
  const mobileState = useMediaQuery(mobileQuery)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [mobileOpen, setMobileOpen] = useState(false)
  const openState = open ?? uncontrolledOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) {
        setUncontrolledOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [onOpenChange, open],
  )

  const toggleSidebar = useCallback(() => {
    if (mobileState) {
      setMobileOpen((currentOpen) => !currentOpen)
    } else {
      setOpen(!openState)
    }
  }, [mobileState, openState, setOpen])

  useEffect(() => {
    if (keyboardShortcut === false) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      const editing =
        target instanceof HTMLElement &&
        (target.isContentEditable || target.matches('input, textarea, select, [role="textbox"]'))

      if (
        !editing &&
        !event.repeat &&
        !event.shiftKey &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === keyboardShortcut.toLowerCase()
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyboardShortcut, toggleSidebar])

  const sidebarStyle: CSSProperties & TCssCustomProperties = {
    '--_sidebar-width': toCssLength(width),
    '--_sidebar-collapsed-width': toCssLength(collapsedWidth),
  }
  const mobileDrawerStyle: CSSProperties & TCssCustomProperties = {
    '--_drawer-horizontal-size': toCssLength(mobileWidth),
  }

  return {
    sidebarId,
    mobileState,
    openState,
    mobileOpen,
    setMobileOpen,
    setOpen,
    toggleSidebar,
    sidebarStyle,
    mobileDrawerStyle,
  }
}
