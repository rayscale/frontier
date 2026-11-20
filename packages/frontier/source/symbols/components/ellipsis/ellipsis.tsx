import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M5 12h.01' }],
  ['path', { d: 'M12 12h.01' }],
  ['path', { d: 'M19 12h.01' }],
]

/**
 * Shows that more options are available.
 */
export const Ellipsis = createSymbol({ name: 'Ellipsis', symbolNode })
