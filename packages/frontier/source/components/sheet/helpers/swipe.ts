import type { TSheetSide } from '../types.js'

export const swipeDirectionBySide = {
  right: 'right',
  left: 'left',
  top: 'up',
  bottom: 'down',
} as const satisfies { [TKey in TSheetSide]: 'up' | 'down' | 'left' | 'right' }
