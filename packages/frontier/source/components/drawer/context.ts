import { createContext, type RefObject, useContext } from 'react'

import type { TDrawerSide } from './types.js'

/** One mounted drawer in the stack, used to close it and the drawers in front of it. */
export interface TDrawerStackEntry {
  popupRef: RefObject<HTMLElement | null>
  close: () => void
  closeOnBackdropClickRef: RefObject<boolean>
}

export interface TDrawerContextValue {
  closeOnBackdropClickRef: RefObject<boolean>
  side: TDrawerSide
  stackEntry: TDrawerStackEntry
}

export const drawerContext = createContext<TDrawerContextValue | null>(null)

export function useDrawerContext(componentName: string): TDrawerContextValue {
  const context = useContext(drawerContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Drawer.`)
  }

  return context
}
