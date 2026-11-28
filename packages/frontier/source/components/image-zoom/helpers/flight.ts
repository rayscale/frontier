/** Where the image starts, as seen from where it rests in the middle of the screen. */
export interface TFlight {
  /** Corner radius of the image at the start, in pixels, so that it looks like the trigger's. */
  readonly radius: number
  readonly transform: string
}

/**
 * Measures how to put the frame over the trigger: moved to its center and scaled to its width.
 */
export function measureFlight(frame: HTMLElement, trigger: HTMLElement): TFlight | null {
  const thumbnail = trigger.querySelector('img') ?? trigger
  const from = thumbnail.getBoundingClientRect()

  // The frame is measured where it rests, before it moves, so room kept around it is counted.
  const rest = frame.getBoundingClientRect()

  if (rest.width === 0 || from.width === 0) {
    return null
  }

  const scale = from.width / rest.width
  const x = from.left + from.width / 2 - (rest.left + rest.width / 2)
  const y = from.top + from.height / 2 - (rest.top + rest.height / 2)
  const radius = Number.parseFloat(getComputedStyle(thumbnail).borderTopLeftRadius)

  return {
    radius: Number.isNaN(radius) ? 0 : radius / scale,
    transform: `translate(${String(x)}px, ${String(y)}px) scale(${String(scale)})`,
  }
}

/** Reads a duration and an easing from the motion tokens, so the flight moves like everything else. */
export function readMotion(
  element: HTMLElement,
  durationToken: string,
  easingToken: string,
): { duration: number; easing: string } {
  const style = getComputedStyle(element)

  return {
    duration: Number.parseFloat(style.getPropertyValue(durationToken)) || 0,
    easing: style.getPropertyValue(easingToken).trim() || 'ease',
  }
}
