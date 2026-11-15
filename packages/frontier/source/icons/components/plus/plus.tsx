import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M12 5v14' }],
  ['path', { d: 'M5 12h14' }],
]

/**
 * Adds or creates something, as in a new item.
 */
export const Plus = createIcon({ name: 'Plus', iconNode })
