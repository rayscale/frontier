import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['rect', { x: 4, y: 5, width: 16, height: 16, rx: 3 }],
  ['path', { d: 'M8 3v4' }],
  ['path', { d: 'M16 3v4' }],
  ['path', { d: 'M4 10h16' }],
  ['path', { d: 'M8 15h8' }],
]

/**
 * Represents a span between two dates.
 */
export const CalendarRange = createSymbol({ name: 'CalendarRange', symbolNode })
