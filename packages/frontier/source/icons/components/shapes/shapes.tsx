import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M12 3 17 10H7z' }],
  ['circle', { cx: 7, cy: 17, r: 4 }],
  ['rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 }],
]

/**
 * A triangle, a circle, and a square that stand for a set of icons.
 */
export const Shapes = createIcon({ name: 'Shapes', iconNode })
