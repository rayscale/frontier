import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M19 5h-8' }],
  ['path', { d: 'M13 19H5' }],
  ['path', { d: 'm15 5-6 14' }],
]

/**
 * Applies italic emphasis to text.
 */
export const Italic = createSymbol({ name: 'Italic', symbolNode })
