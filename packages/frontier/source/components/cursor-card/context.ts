import { createContext } from 'react'

import type { TCursorCardPosition } from './types.js'

export interface TCursorCardSettings {
  readonly closeDelay: number
  readonly openDelay: number
  readonly track: (position: TCursorCardPosition) => void
}

const emptyPosition: TCursorCardPosition = { height: 0, width: 0, x: 0, y: 0 }

export const cursorCardSettingsContext = createContext<TCursorCardSettings>({
  closeDelay: 0,
  openDelay: 0,
  track: () => undefined,
})

export const cursorCardPositionContext = createContext<TCursorCardPosition>(emptyPosition)
