import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['rect', { x: 9, y: 9, width: 11, height: 11, rx: 2 }],
  ['path', { d: 'M5 15V6a2 2 0 0 1 2-2h9' }],
]

/**
 * Copies content.
 */
export const Copy = createSymbol({ name: 'Copy', symbolNode })
