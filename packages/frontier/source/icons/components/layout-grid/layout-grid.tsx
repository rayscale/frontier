import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['rect', { x: 4, y: 4, width: 7, height: 7, rx: 1.5 }],
  ['rect', { x: 13, y: 4, width: 7, height: 7, rx: 1.5 }],
  ['rect', { x: 4, y: 13, width: 7, height: 7, rx: 1.5 }],
  ['rect', { x: 13, y: 13, width: 7, height: 7, rx: 1.5 }],
]

/**
 * Represents a grid of items.
 */
export const LayoutGrid = createIcon({ name: 'LayoutGrid', iconNode })
