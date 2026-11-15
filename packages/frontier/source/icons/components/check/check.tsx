import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'M20 6 9 17l-5-5' }]]

/**
 * Confirms a value or a completed step, as in a checked box.
 */
export const Check = createIcon({ name: 'Check', iconNode })
