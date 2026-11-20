import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M18 6 6 18' }],
  ['path', { d: 'm6 6 12 12' }],
]

/**
 * Closes, dismisses, or removes something.
 */
export const X = createSymbol({ name: 'X', symbolNode })
