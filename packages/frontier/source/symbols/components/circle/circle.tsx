import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['circle', { cx: 12, cy: 12, r: 9 }]]

/**
 * Represents an empty marker or a radio.
 */
export const Circle = createSymbol({ name: 'Circle', symbolNode })
