import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M12 5v14' }],
  ['path', { d: 'm6 13 6 6 6-6' }],
]

/**
 * Points down.
 */
export const ArrowDown = createSymbol({ name: 'ArrowDown', symbolNode })
