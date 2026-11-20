import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M8 12h.01' }],
  ['path', { d: 'M12 12h.01' }],
  ['path', { d: 'M16 12h.01' }],
]

/**
 * Shows that more options are available.
 */
export const CircleEllipsis = createSymbol({ name: 'CircleEllipsis', symbolNode })
