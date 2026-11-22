import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6' }],
  ['path', { d: 'M18.4 3.6a2 2 0 0 1 2.8 2.8L12 15.6l-4 1 1-4z' }],
]

/**
 * Edits content.
 */
export const SquarePen = createIcon({ name: 'SquarePen', iconNode })
