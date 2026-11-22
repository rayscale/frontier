import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [['path', { d: 'M21 12a9 9 0 1 1-6.2-8.56' }]]

/**
 * Shows that work is in progress.
 */
export const LoaderCircle = createIcon({ name: 'LoaderCircle', iconNode })
