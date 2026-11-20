import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'M5 12h14' }]]

/**
 * Removes or decreases something.
 */
export const Minus = createSymbol({ name: 'Minus', symbolNode })
