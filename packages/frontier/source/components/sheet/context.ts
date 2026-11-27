import { createContext, type RefObject, useContext } from 'react'

import type { TSheetSide } from './types.js'

/** One mounted sheet in the stack, used to close it and the sheets in front of it. */
export interface TSheetStackEntry {
  popupRef: RefObject<HTMLElement | null>
  close: () => void
  closeOnBackdropClickRef: RefObject<boolean>
}

export interface TSheetContextValue {
  closeOnBackdropClickRef: RefObject<boolean>
  side: TSheetSide
  stackEntry: TSheetStackEntry
}

export const sheetContext = createContext<TSheetContextValue | null>(null)

export function useSheetContext(componentName: string): TSheetContextValue {
  const context = useContext(sheetContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Sheet.`)
  }

  return context
}
