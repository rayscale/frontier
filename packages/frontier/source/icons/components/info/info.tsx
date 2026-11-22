import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 12, r: 9 }],
  ['path', { d: 'M12 11v5' }],
  ['path', { d: 'M12 8h.01' }],
]

/**
 * Provides neutral information.
 */
export const Info = createIcon({ name: 'Info', iconNode })
