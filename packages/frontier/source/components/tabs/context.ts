import { createContext } from 'react'

import type { TTabsOrientation } from './types.js'

export interface TTabsPanelContextValue {
  orientation: TTabsOrientation
  previousValue: { current: string | null }
  value: string | null
}

export const tabsPanelContext = createContext<TTabsPanelContextValue | null>(null)
export const tabsHighlightContext = createContext<string | null>(null)
