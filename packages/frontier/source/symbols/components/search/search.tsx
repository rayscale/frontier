import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 11, cy: 11, r: 8 }],
  ['path', { d: 'm21 21-4.3-4.3' }],
]

/**
 * Finds content, as in a search field or a lookup action.
 */
export const Search = createSymbol({ name: 'Search', symbolNode })
