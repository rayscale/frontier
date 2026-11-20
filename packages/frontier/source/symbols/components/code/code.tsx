import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'm8 8-4 4 4 4' }],
  ['path', { d: 'm16 8 4 4-4 4' }],
  ['path', { d: 'm14 5-4 14' }],
]

/**
 * Represents source code.
 */
export const Code = createSymbol({ name: 'Code', symbolNode })
