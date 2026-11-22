import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 10, cy: 8, r: 4 }],
  ['path', { d: 'M3 20a7 7 0 0 1 14 0' }],
  ['path', { d: 'M19 8v6' }],
  ['path', { d: 'M16 11h6' }],
]

/**
 * Adds a person.
 */
export const UserPlus = createIcon({ name: 'UserPlus', iconNode })
