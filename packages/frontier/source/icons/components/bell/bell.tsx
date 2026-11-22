import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M6 9a6 6 0 0 1 12 0c0 6 2 7 2 8H4c0-1 2-2 2-8' }],
  ['path', { d: 'M10 20a2 2 0 0 0 4 0' }],
]

/**
 * Represents notifications.
 */
export const Bell = createIcon({ name: 'Bell', iconNode })
