import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M12 7v5l3 2' }],
]

/**
 * Represents time of day or duration.
 */
export const Clock = createIcon({ name: 'Clock', iconNode })
