import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['rect', { x: 3, y: 5, width: 18, height: 14, rx: 3 }],
  ['path', { d: 'm4 8 8 6 8-6' }],
]

/**
 * Represents email.
 */
export const Mail = createSymbol({ name: 'Mail', symbolNode })
