import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M5 5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2z' }],
  ['path', { d: 'M5 19a2 2 0 0 0 2 2h12v-4' }],
]

/**
 * Represents reference material to read.
 */
export const Book = createSymbol({ name: 'Book', symbolNode })
