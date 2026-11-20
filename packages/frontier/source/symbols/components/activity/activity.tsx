import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'M3 12h4l3-8 4 16 3-8h4' }]]

/**
 * Represents activity or a pulse.
 */
export const Activity = createSymbol({ name: 'Activity', symbolNode })
