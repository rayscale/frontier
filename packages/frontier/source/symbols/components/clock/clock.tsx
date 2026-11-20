import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M12 7v5l3 2' }],
]

/**
 * Represents time of day or duration.
 */
export const Clock = createSymbol({ name: 'Clock', symbolNode })
