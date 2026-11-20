import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'm4 11 8-7 8 7' }],
  ['path', { d: 'M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9' }],
]

/**
 * Represents the home page.
 */
export const Home = createIcon({ name: 'Home', iconNode })
