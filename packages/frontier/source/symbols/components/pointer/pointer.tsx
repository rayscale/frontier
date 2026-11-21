import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'm5 3 14 8-6.5 1.8L10 19z' }]]

/**
 * Represents a pointer that triggers an action.
 */
export const Pointer = createSymbol({ name: 'Pointer', symbolNode })
