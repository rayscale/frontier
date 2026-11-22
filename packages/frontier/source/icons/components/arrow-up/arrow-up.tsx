import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M12 19V5' }],
  ['path', { d: 'm6 11 6-6 6 6' }],
]

/**
 * Points up.
 */
export const ArrowUp = createIcon({ name: 'ArrowUp', iconNode })
