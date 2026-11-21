import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'm12 3 9 4.5-9 4.5-9-4.5z' }],
  ['path', { d: 'm3 12 9 4.5 9-4.5' }],
  ['path', { d: 'm3 16.5 9 4.5 9-4.5' }],
]

/**
 * Represents content stacked above other content.
 */
export const Layers = createSymbol({ name: 'Layers', symbolNode })
