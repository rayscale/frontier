import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'M20 6 9 17l-5-5' }]]

/**
 * Confirms a value or a completed step, as in a checked box.
 */
export const Check = createSymbol({ name: 'Check', symbolNode })
