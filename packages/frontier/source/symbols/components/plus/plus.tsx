import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M12 5v14' }],
  ['path', { d: 'M5 12h14' }],
]

/**
 * Adds or creates something, as in a new item.
 */
export const Plus = createSymbol({ name: 'Plus', symbolNode })
