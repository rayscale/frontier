import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['circle', { cx: 11, cy: 11, r: 8 }],
  ['path', { d: 'm21 21-4.3-4.3' }],
]

/**
 * Finds content, as in a search field or a lookup action.
 */
export const Search = createIcon({ name: 'Search', iconNode })
