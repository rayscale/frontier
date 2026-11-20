import { createContext, useContext } from 'react'

import type { TNavigationMenuLayout } from './types.js'

export interface TNavigationMenuContext {
  layout: TNavigationMenuLayout
  value: string | null
  setValue: (value: string | null) => void
}

export interface TNavigationMenuItemContext {
  value: string
  open: boolean
  triggerId: string
  panelId: string
}

const defaultContext: TNavigationMenuContext = {
  layout: 'inline',
  value: null,
  setValue: () => undefined,
}

export const navigationMenuContext = createContext<TNavigationMenuContext>(defaultContext)

export const navigationMenuItemContext = createContext<TNavigationMenuItemContext | null>(null)

export function useNavigationMenuContext(): TNavigationMenuContext {
  return useContext(navigationMenuContext)
}

export function useNavigationMenuItemContext(): TNavigationMenuItemContext | null {
  return useContext(navigationMenuItemContext)
}
