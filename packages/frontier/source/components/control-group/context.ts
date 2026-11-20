import { createContext, useContext } from 'react'

import type { TControlGroupOrientation } from './types.js'

export const controlGroupOrientationContext = createContext<TControlGroupOrientation | null>(null)

export function useControlGroupOrientation(): TControlGroupOrientation | null {
  return useContext(controlGroupOrientationContext)
}
