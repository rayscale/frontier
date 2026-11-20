import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['rect', { x: 3, y: 4, width: 18, height: 4, rx: 1 }],
  ['path', { d: 'M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8' }],
  ['path', { d: 'M10 12h4' }],
]

/**
 * Stores an item out of the way.
 */
export const Archive = createSymbol({ name: 'Archive', symbolNode })
