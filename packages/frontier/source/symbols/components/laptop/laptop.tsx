import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['rect', { x: 5, y: 5, width: 14, height: 10, rx: 2 }],
  ['path', { d: 'M3 19h18' }],
]

/**
 * Represents a computer or the system theme.
 */
export const Laptop = createSymbol({ name: 'Laptop', symbolNode })
