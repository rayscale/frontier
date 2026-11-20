import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'm6 9 6 6 6-6' }]]

/**
 * Points down or opens a list.
 */
export const ChevronDown = createSymbol({ name: 'ChevronDown', symbolNode })
