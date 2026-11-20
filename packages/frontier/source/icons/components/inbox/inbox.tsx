import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M4 13 6 6h12l2 7v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z' }],
  ['path', { d: 'M4 13h4l1 2h6l1-2h4' }],
]

/**
 * Represents incoming items or an empty list.
 */
export const Inbox = createIcon({ name: 'Inbox', iconNode })
