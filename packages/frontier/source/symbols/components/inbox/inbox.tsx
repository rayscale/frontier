import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M4 13 6 6h12l2 7v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z' }],
  ['path', { d: 'M4 13h4l1 2h6l1-2h4' }],
]

/**
 * Represents incoming items or an empty list.
 */
export const Inbox = createSymbol({ name: 'Inbox', symbolNode })
