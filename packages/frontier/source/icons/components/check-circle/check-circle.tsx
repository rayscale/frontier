import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'm8.5 12 2.5 2.5 4.5-5' }],
]

/**
 * Confirms that something succeeded or is complete.
 */
export const CheckCircle = createIcon({ name: 'CheckCircle', iconNode })
