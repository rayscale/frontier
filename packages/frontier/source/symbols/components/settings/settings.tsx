import { createSymbol } from '../../create-symbol.js'
import type { TSymbolNode } from '../../types.js'

const symbolNode: TSymbolNode = [
  [
    'path',
    {
      d: 'M10.3 4h3.4l.6 2.2 1.9 1.1 2.2-.6 1.7 3-1.6 1.6v2.2l1.6 1.6-1.7 3-2.2-.6-1.9 1.1-.6 2.2h-3.4l-.6-2.2-1.9-1.1-2.2.6-1.7-3 1.6-1.6v-2.2L4.2 9.7l1.7-3 2.2.6 1.9-1.1z',
    },
  ],
  ['circle', { cx: 12, cy: 12, r: 3 }],
]

/**
 * Opens settings.
 */
export const Settings = createSymbol({ name: 'Settings', symbolNode })
