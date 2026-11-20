import type { TDrawerSide } from '../types.js'

export const swipeDirectionBySide = {
  right: 'right',
  left: 'left',
  top: 'up',
  bottom: 'down',
} as const satisfies { [TKey in TDrawerSide]: 'up' | 'down' | 'left' | 'right' }
