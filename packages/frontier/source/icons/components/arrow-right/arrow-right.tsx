import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M5 12h14' }],
  ['path', { d: 'm13 6 6 6-6 6' }],
]

/**
 * Points forward or to the next destination.
 */
export const ArrowRight = createIcon({ name: 'ArrowRight', iconNode })
