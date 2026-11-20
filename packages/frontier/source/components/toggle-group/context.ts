import { createContext, useContext } from 'react'

import type { TToggleSize, TToggleVariant } from '../toggle/toggle.js'

export interface TToggleGroupStyleContextValue {
  variant: TToggleVariant
  size: TToggleSize
}

export const toggleGroupStyleContext = createContext<TToggleGroupStyleContextValue | null>(null)

export function useToggleGroupStyleContext(componentName: string): TToggleGroupStyleContextValue {
  const context = useContext(toggleGroupStyleContext)

  if (!context) {
    throw new Error(`${componentName} must be rendered inside a ToggleGroup.`)
  }

  return context
}
