import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M18 6 6 18' }],
  ['path', { d: 'm6 6 12 12' }],
]

/**
 * Closes, dismisses, or removes something.
 */
export const X = createIcon({ name: 'X', iconNode })
