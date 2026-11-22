import type { TIconMotion } from './types.js'

/** The movement that each built-in icon makes, by component name. */
export const iconMotions: ReadonlyMap<string, TIconMotion> = new Map<string, TIconMotion>([
  ['ArrowDown', 'nudge-down'],
  ['ArrowRight', 'nudge-right'],
  ['ArrowUp', 'nudge-up'],
  ['Bell', 'ring'],
  ['Check', 'draw'],
  ['ChevronDown', 'nudge-down'],
  ['ChevronLeft', 'nudge-left'],
  ['ChevronRight', 'nudge-right'],
  ['ChevronsLeft', 'nudge-left'],
  ['ChevronsRight', 'nudge-right'],
  ['Download', 'nudge-down'],
  ['LoaderCircle', 'sweep'],
  ['Plus', 'turn'],
  ['Settings', 'turn'],
  ['Upload', 'nudge-up'],
  ['X', 'turn'],
])
