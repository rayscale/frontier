import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'm12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z' }],
  ['path', { d: 'M19 16v4' }],
  ['path', { d: 'M17 18h4' }],
]

/**
 * Marks something new or highlighted.
 */
export const Sparkles = createSymbol({ name: 'Sparkles', symbolNode })
