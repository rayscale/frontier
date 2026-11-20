import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 11, cy: 11, r: 7 }],
  ['path', { d: 'm20 20-3.5-3.5' }],
  ['path', { d: 'm9 9 4 4' }],
  ['path', { d: 'm13 9-4 4' }],
]

/**
 * Shows that a search found nothing.
 */
export const SearchX = createSymbol({ name: 'SearchX', symbolNode })
