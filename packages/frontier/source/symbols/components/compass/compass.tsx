import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'm15.5 8.5-2 5-5 2 2-5z' }],
]

/**
 * Guides the way to a destination.
 */
export const Compass = createSymbol({ name: 'Compass', symbolNode })
