import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'm11 7-5 5 5 5' }],
  ['path', { d: 'm18 7-5 5 5 5' }],
]

/**
 * Jumps to the first item.
 */
export const ChevronsLeft = createIcon({ name: 'ChevronsLeft', iconNode })
