import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M5 12h.01' }],
  ['path', { d: 'M12 12h.01' }],
  ['path', { d: 'M19 12h.01' }],
]

/**
 * Shows that more options are available.
 */
export const Ellipsis = createIcon({ name: 'Ellipsis', iconNode })
