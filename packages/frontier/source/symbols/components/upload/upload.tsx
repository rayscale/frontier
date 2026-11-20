import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M12 16V4' }],
  ['path', { d: 'm7 9 5-5 5 5' }],
  ['path', { d: 'M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3' }],
]

/**
 * Sends a file to a destination.
 */
export const Upload = createSymbol({ name: 'Upload', symbolNode })
