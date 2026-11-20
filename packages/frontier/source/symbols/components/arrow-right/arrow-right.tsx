import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M5 12h14' }],
  ['path', { d: 'm13 6 6 6-6 6' }],
]

/**
 * Points forward or to the next destination.
 */
export const ArrowRight = createSymbol({ name: 'ArrowRight', symbolNode })
