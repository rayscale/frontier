import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 12, cy: 8, r: 4 }],
  ['path', { d: 'M4 21a8 8 0 0 1 16 0' }],
]

/**
 * Represents a person or an account.
 */
export const UserRound = createIcon({ name: 'UserRound', iconNode })
