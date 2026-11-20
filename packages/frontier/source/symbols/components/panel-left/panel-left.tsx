import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }],
  ['path', { d: 'M9 4v16' }],
]

/**
 * Toggles a side panel.
 */
export const PanelLeft = createSymbol({ name: 'PanelLeft', symbolNode })
