import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'M3 12h4l3-8 4 16 3-8h4' }]]

/**
 * Represents activity or a pulse.
 */
export const Activity = createIcon({ name: 'Activity', iconNode })
