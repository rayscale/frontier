import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M12 19V5' }],
  ['path', { d: 'm6 11 6-6 6 6' }],
]

/**
 * Points up.
 */
export const ArrowUp = createSymbol({ name: 'ArrowUp', symbolNode })
