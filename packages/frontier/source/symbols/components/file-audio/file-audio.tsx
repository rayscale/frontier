import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  ['path', { d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' }],
  ['path', { d: 'M14 3v5h5' }],
  ['path', { d: 'M11 18v-5l4-1v5' }],
]

/**
 * Represents an audio file.
 */
export const FileAudio = createSymbol({ name: 'FileAudio', symbolNode })
