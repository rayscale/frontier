import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['path', { d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' }],
  ['path', { d: 'M14 3v5h5' }],
  ['path', { d: 'm8 18 3-3 2 2 2-2 1 1' }],
]

/**
 * Represents an image file.
 */
export const FileImage = createIcon({ name: 'FileImage', iconNode })
