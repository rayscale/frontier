import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' }],
  ['path', { d: 'M14 3v5h5' }],
  ['path', { d: 'M12 12v6' }],
  ['path', { d: 'M9 15h6' }],
]

/**
 * Adds a file.
 */
export const FilePlus = createSymbol({ name: 'FilePlus', symbolNode })
