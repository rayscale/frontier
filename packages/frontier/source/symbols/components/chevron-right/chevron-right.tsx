import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'm9 6 6 6-6 6' }]]

/**
 * Points to the right or to the next item.
 */
export const ChevronRight = createSymbol({ name: 'ChevronRight', symbolNode })
