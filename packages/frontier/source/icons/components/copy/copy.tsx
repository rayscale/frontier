import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['rect', { x: 9, y: 9, width: 11, height: 11, rx: 2 }],
  ['path', { d: 'M5 15V6a2 2 0 0 1 2-2h9' }],
]

/**
 * Copies content.
 */
export const Copy = createIcon({ name: 'Copy', iconNode })
