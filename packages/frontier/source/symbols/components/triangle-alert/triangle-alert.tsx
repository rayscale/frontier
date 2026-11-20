import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M10.3 4.5 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0z' }],
  ['path', { d: 'M12 9v4' }],
  ['path', { d: 'M12 17h.01' }],
]

/**
 * Warns about a risk or a problem.
 */
export const TriangleAlert = createSymbol({ name: 'TriangleAlert', symbolNode })
