import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'm6 9 6 6 6-6' }]]

/**
 * Points down or opens a list.
 */
export const ChevronDown = createIcon({ name: 'ChevronDown', iconNode })
