import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'm5 3 14 8-6.5 1.8L10 19z' }]]

/**
 * Represents a pointer that triggers an action.
 */
export const Pointer = createIcon({ name: 'Pointer', iconNode })
