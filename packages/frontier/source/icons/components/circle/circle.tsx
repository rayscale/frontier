import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['circle', { cx: 12, cy: 12, r: 9 }]]

/**
 * Represents an empty marker or a radio.
 */
export const Circle = createIcon({ name: 'Circle', iconNode })
