import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['circle', { cx: 10, cy: 8, r: 4 }],
  ['path', { d: 'M3 20a7 7 0 0 1 14 0' }],
  ['path', { d: 'M19 8v6' }],
  ['path', { d: 'M16 11h6' }],
]

/**
 * Adds a person.
 */
export const UserPlus = createSymbol({ name: 'UserPlus', symbolNode })
