import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5' }],
  ['path', { d: 'M12 17h.01' }],
]

/**
 * Offers help or an explanation.
 */
export const CircleHelp = createIcon({ name: 'CircleHelp', iconNode })
