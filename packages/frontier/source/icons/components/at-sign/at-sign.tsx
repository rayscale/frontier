import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 12, r: 4 }],
  ['path', { d: 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' }],
]

/**
 * Marks an email address or a mention.
 */
export const AtSign = createIcon({ name: 'AtSign', iconNode })
