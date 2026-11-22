import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M12 16V4' }],
  ['path', { d: 'm7 9 5-5 5 5' }],
  ['path', { d: 'M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3' }],
]

/**
 * Sends a file to a destination.
 */
export const Upload = createIcon({ name: 'Upload', iconNode })
