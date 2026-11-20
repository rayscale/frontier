import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M7 4v7a5 5 0 0 0 10 0V4' }],
  ['path', { d: 'M5 20h14' }],
]

/**
 * Underlines text.
 */
export const Underline = createSymbol({ name: 'Underline', symbolNode })
