import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M7 5h6a3.5 3.5 0 0 1 0 7H7z' }],
  ['path', { d: 'M7 12h7a3.5 3.5 0 0 1 0 7H7z' }],
]

/**
 * Applies bold emphasis to text.
 */
export const Bold = createSymbol({ name: 'Bold', symbolNode })
