import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 12, cy: 8, r: 4 }],
  ['path', { d: 'M4 21a8 8 0 0 1 16 0' }],
]

/**
 * Represents a person or an account.
 */
export const UserRound = createSymbol({ name: 'UserRound', symbolNode })
