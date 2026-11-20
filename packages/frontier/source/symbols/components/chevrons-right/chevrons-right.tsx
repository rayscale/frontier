import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'm6 7 5 5-5 5' }],
  ['path', { d: 'm13 7 5 5-5 5' }],
]

/**
 * Jumps to the last item.
 */
export const ChevronsRight = createSymbol({ name: 'ChevronsRight', symbolNode })
