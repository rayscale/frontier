import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'm15 6-6 6 6 6' }]]

/**
 * Points to the left or to the previous item.
 */
export const ChevronLeft = createSymbol({ name: 'ChevronLeft', symbolNode })
