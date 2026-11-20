import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'm9 6 6 6-6 6' }]]

/**
 * Points to the right or to the next item.
 */
export const ChevronRight = createIcon({ name: 'ChevronRight', iconNode })
