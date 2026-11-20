import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z' }]]

/**
 * Represents the dark theme or night.
 */
export const Moon = createIcon({ name: 'Moon', iconNode })
