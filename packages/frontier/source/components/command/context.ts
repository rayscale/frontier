import { createContext, useContext } from 'react'

import type { TCommandItem } from './types.js'

export interface TCommandContextValue {
  selectItem: (item: TCommandItem) => void
}

export const commandContext = createContext<TCommandContextValue | null>(null)

export function useCommandContext(componentName: string): TCommandContextValue {
  const context = useContext(commandContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Command.`)
  }

  return context
}
