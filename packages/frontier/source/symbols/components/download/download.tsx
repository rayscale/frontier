import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M12 4v12' }],
  ['path', { d: 'm7 11 5 5 5-5' }],
  ['path', { d: 'M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3' }],
]

/**
 * Brings a file or package to the device.
 */
export const Download = createSymbol({ name: 'Download', symbolNode })
