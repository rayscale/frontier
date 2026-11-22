import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M8 12h.01' }],
  ['path', { d: 'M12 12h.01' }],
  ['path', { d: 'M16 12h.01' }],
]

/**
 * Shows that more options are available.
 */
export const CircleEllipsis = createIcon({ name: 'CircleEllipsis', iconNode })
