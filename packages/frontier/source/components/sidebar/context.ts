import { createContext, useContext } from 'react'

export interface TSidebarContextValue {
  open: boolean
  mobile: boolean
  mobileOpen: boolean
  sidebarId: string
  setOpen: (open: boolean) => void
  setMobileOpen: (open: boolean) => void
  toggleSidebar: () => void
}

export const sidebarContext = createContext<TSidebarContextValue | null>(null)

export function useSidebarContext(componentName: string): TSidebarContextValue {
  const context = useContext(sidebarContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Sidebar.Root.`)
  }

  return context
}
