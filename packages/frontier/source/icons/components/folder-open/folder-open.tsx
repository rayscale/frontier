import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M3 18V6a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v2' }],
  ['path', { d: 'M3 18 5.5 10H22l-2.5 8z' }],
]

/**
 * Represents an open folder or an empty collection.
 */
export const FolderOpen = createIcon({ name: 'FolderOpen', iconNode })
