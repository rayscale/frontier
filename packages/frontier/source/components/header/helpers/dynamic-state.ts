import type { TDynamicHeaderState, TScrollTracker } from '../types.js'

/** Scroll offset at which a dynamic header stops being attached to the top. */
export const scrollThreshold = 80
/** Scroll offset at or below which a dynamic header is attached again. */
const topThreshold = 8
/** Downward scroll distance required before a scrolled header hides. */
const hideDistance = 72
/** Upward scroll distance required before a hidden header reappears. */
const revealDistance = 16

/**
 * Computes the next dynamic header state from a scroll event. Direction
 * changes reset the accumulated distance, so small jitter does not toggle
 * the header.
 */
export function reduceDynamicHeaderState(
  state: TDynamicHeaderState,
  scrollY: number,
  tracker: TScrollTracker,
  hide: boolean,
): TDynamicHeaderState {
  const next = resolveNextState(state, scrollY, tracker, hide)
  if (next !== state) {
    tracker.distance = 0
  }

  return next
}

function resolveNextState(
  state: TDynamicHeaderState,
  scrollY: number,
  tracker: TScrollTracker,
  hide: boolean,
): TDynamicHeaderState {
  const delta = scrollY - tracker.lastY
  tracker.lastY = scrollY

  if (scrollY <= topThreshold) {
    tracker.direction = 0
    return 'attached'
  }

  if (delta === 0) {
    return state
  }

  const direction = delta > 0 ? 1 : -1
  if (direction !== tracker.direction) {
    tracker.direction = direction
    tracker.distance = 0
  }

  tracker.distance += Math.abs(delta)

  if (state === 'attached') {
    return scrollY > scrollThreshold ? 'scrolled' : 'attached'
  }

  if (state === 'scrolled' && direction === 1 && hide && tracker.distance >= hideDistance) {
    return 'hidden'
  }

  if (state === 'hidden' && direction === -1 && tracker.distance >= revealDistance) {
    return 'scrolled'
  }

  return state
}
