import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'm11 7-5 5 5 5' }],
  ['path', { d: 'm18 7-5 5 5 5' }],
]

/**
 * Jumps to the first item.
 */
export const ChevronsLeft = createSymbol({ name: 'ChevronsLeft', symbolNode })
