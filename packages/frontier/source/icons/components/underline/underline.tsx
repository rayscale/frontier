import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M7 4v7a5 5 0 0 0 10 0V4' }],
  ['path', { d: 'M5 20h14' }],
]

/**
 * Underlines text.
 */
export const Underline = createIcon({ name: 'Underline', iconNode })
