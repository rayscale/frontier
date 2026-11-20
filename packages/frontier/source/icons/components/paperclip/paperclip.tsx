import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  [
    'path',
    { d: 'm20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7' },
  ],
]

/**
 * Attaches a file.
 */
export const Paperclip = createIcon({ name: 'Paperclip', iconNode })
