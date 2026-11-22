import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['rect', { x: 5, y: 5, width: 14, height: 10, rx: 2 }],
  ['path', { d: 'M3 19h18' }],
]

/**
 * Represents a computer or the system theme.
 */
export const Laptop = createIcon({ name: 'Laptop', iconNode })
