import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M19 5h-8' }],
  ['path', { d: 'M13 19H5' }],
  ['path', { d: 'm15 5-6 14' }],
]

/**
 * Applies italic emphasis to text.
 */
export const Italic = createIcon({ name: 'Italic', iconNode })
