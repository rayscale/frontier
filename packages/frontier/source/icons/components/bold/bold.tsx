import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M7 5h6a3.5 3.5 0 0 1 0 7H7z' }],
  ['path', { d: 'M7 12h7a3.5 3.5 0 0 1 0 7H7z' }],
]

/**
 * Applies bold emphasis to text.
 */
export const Bold = createIcon({ name: 'Bold', iconNode })
