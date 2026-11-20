import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'M5 12h14' }]]

/**
 * Removes or decreases something.
 */
export const Minus = createIcon({ name: 'Minus', iconNode })
