import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'm3 18 4.5-12L12 18' }],
  ['path', { d: 'M5 14h5' }],
  ['path', { d: 'M20 12v6' }],
  ['circle', { cx: 17, cy: 15, r: 3 }],
]

/**
 * A capital and a lowercase letter that stand for a typeface.
 */
export const Typeface = createSymbol({ name: 'Typeface', symbolNode })
