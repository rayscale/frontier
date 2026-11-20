import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'm9 9 6 6' }],
  ['path', { d: 'm15 9-6 6' }],
]

/**
 * Marks a failure or an error.
 */
export const CircleX = createIcon({ name: 'CircleX', iconNode })
