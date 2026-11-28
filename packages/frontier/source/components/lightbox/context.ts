import { createContext, useContext } from 'react'

import type { TLightboxItem } from './types.js'

export interface TLightboxContextValue {
  readonly count: number
  /** Which way people went to reach the shown picture. */
  readonly direction: 'forward' | 'backward'
  readonly goTo: (index: number) => void
  readonly index: number
  readonly item: TLightboxItem | undefined
  readonly items: readonly TLightboxItem[]
  readonly next: () => void
  readonly nextAvailable: boolean
  readonly previous: () => void
  readonly previousAvailable: boolean
}

export const lightboxContext = createContext<TLightboxContextValue | null>(null)

export function useLightboxContext(componentName: string): TLightboxContextValue {
  const context = useContext(lightboxContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Lightbox.`)
  }

  return context
}
