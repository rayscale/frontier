import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M12 3 17 10H7z' }],
  ['circle', { cx: 7, cy: 17, r: 4 }],
  ['rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 }],
]

/**
 * A triangle, a circle, and a square that stand for a set of symbols.
 */
export const Shapes = createSymbol({ name: 'Shapes', symbolNode })
