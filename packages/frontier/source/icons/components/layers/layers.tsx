import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'm12 3 9 4.5-9 4.5-9-4.5z' }],
  ['path', { d: 'm3 12 9 4.5 9-4.5' }],
  ['path', { d: 'm3 16.5 9 4.5 9-4.5' }],
]

/**
 * Represents content stacked above other content.
 */
export const Layers = createIcon({ name: 'Layers', iconNode })
