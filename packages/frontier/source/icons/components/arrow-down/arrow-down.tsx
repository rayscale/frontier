import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M12 5v14' }],
  ['path', { d: 'm6 13 6 6 6-6' }],
]

/**
 * Points down.
 */
export const ArrowDown = createIcon({ name: 'ArrowDown', iconNode })
