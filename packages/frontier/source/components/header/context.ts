import { createContext, type RefObject, useContext } from 'react'

import type { THeaderMode } from './types.js'

export interface THeaderContext {
  mode: THeaderMode
  expanded: boolean
  headerRef: RefObject<HTMLElement | null>
  setExpanded: (expanded: boolean) => void
}

export const headerContext = createContext<THeaderContext | null>(null)

export function useHeaderContext(): THeaderContext | null {
  return useContext(headerContext)
}
