import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'm9 9 6 6' }],
  ['path', { d: 'm15 9-6 6' }],
]

/**
 * Marks a failure or an error.
 */
export const CircleX = createSymbol({ name: 'CircleX', symbolNode })
