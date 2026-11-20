import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }],
  ['path', { d: 'M9 4v16' }],
]

/**
 * Toggles a side panel.
 */
export const PanelLeft = createIcon({ name: 'PanelLeft', iconNode })
