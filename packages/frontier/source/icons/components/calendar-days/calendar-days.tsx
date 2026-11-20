import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
  ['rect', { x: 4, y: 5, width: 16, height: 16, rx: 3 }],
  ['path', { d: 'M8 3v4' }],
  ['path', { d: 'M16 3v4' }],
  ['path', { d: 'M4 10h16' }],
  ['path', { d: 'M8 14h.01' }],
  ['path', { d: 'M12 14h.01' }],
  ['path', { d: 'M16 14h.01' }],
  ['path', { d: 'M8 18h.01' }],
  ['path', { d: 'M12 18h.01' }],
]

/**
 * Represents a calendar with individual days.
 */
export const CalendarDays = createIcon({ name: 'CalendarDays', iconNode })
