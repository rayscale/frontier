import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'm15 6-6 6 6 6' }]]

/**
 * Points to the left or to the previous item.
 */
export const ChevronLeft = createIcon({ name: 'ChevronLeft', iconNode })
