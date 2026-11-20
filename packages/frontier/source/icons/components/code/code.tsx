import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'm8 8-4 4 4 4' }],
  ['path', { d: 'm16 8 4 4-4 4' }],
  ['path', { d: 'm14 5-4 14' }],
]

/**
 * Represents source code.
 */
export const Code = createIcon({ name: 'Code', iconNode })
