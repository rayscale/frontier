import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'm6 7 5 5-5 5' }],
  ['path', { d: 'm13 7 5 5-5 5' }],
]

/**
 * Jumps to the last item.
 */
export const ChevronsRight = createIcon({ name: 'ChevronsRight', iconNode })
