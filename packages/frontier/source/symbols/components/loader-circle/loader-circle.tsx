import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [['path', { d: 'M21 12a9 9 0 1 1-6.2-8.56' }]]

/**
 * Shows that work is in progress.
 */
export const LoaderCircle = createSymbol({ name: 'LoaderCircle', symbolNode })
