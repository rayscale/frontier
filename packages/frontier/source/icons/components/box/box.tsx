import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M12 3 4 7v10l8 4 8-4V7z' }],
  ['path', { d: 'm4 7 8 4 8-4' }],
  ['path', { d: 'M12 11v10' }],
]

/**
 * Represents a package or an object.
 */
export const Box = createIcon({ name: 'Box', iconNode })
