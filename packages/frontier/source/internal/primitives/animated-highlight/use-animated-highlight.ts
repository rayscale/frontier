import type { RefObject } from 'react'
import { useEffect } from 'react'

/** Position, size, and corner radius of a highlight, relative to its container's padding box. */
export interface THighlightBounds {
  top: number
  left: number
  width: number
  height: number
  /** Target's corner radius in pixels, clamped to half its shortest side. */
  radius: number
}

export interface THighlightUpdate {
  /** Measured target bounds. Kept while no target exists so the highlight can fade out in place. */
  bounds: THighlightBounds | null
  /** Whether a valid target is currently highlighted. */
  targeted: boolean
  /**
   * Whether the bounds should be applied without animation. True for the first
   * position, for movement of the same target, and for any change while the
   * container is scrolling, so the highlight stays locked to the content.
   */
  skipAnimation: boolean
}

/**
 * Selects the element that receives the highlight. Base UI sets
 * `data-highlighted` on the active item and disabled items never become
 * highlight targets.
 */
const defaultSelector = '[data-highlighted]:not([data-disabled])'

/** Attributes whose change can move the highlight to another target. */
const defaultAttributes: readonly string[] = ['data-highlighted', 'data-disabled']

/** Chooses which element the highlight follows. */
export interface THighlightOptions {
  /** Selects the target inside the container. Defaults to the item with `data-highlighted`. */
  selector?: string | undefined
  /** Attributes to watch, so a change of any of them moves the highlight. */
  attributes?: readonly string[] | undefined
}

/** Time without scroll events after which the highlight animates target changes again. */
const scrollSettleMs = 150

/**
 * Resolves the target's top-left corner radius to pixels. Percentages are
 * relative to the shortest side, and the result is clamped so that fully
 * rounded targets (such as circles) stay round.
 */
function resolveRadius(target: HTMLElement, width: number, height: number) {
  const value = getComputedStyle(target).borderTopLeftRadius
  const amount = Number.parseFloat(value)
  if (!Number.isFinite(amount)) {
    return 0
  }

  const shortestSide = Math.min(width, height)
  const pixels = value.endsWith('%') ? (amount / 100) * shortestSide : amount
  return Math.min(Math.max(pixels, 0), shortestSide / 2)
}

/**
 * Measures the target relative to the container using layout offsets rather
 * than `getBoundingClientRect`. Offsets ignore transforms, so the measurement
 * stays correct while a popup is still scaling in. Scroll offsets of scrolled
 * ancestors between the target and the container are subtracted.
 */
export function measureTarget(
  container: HTMLElement,
  target: HTMLElement,
): THighlightBounds | null {
  let top = 0
  let left = 0
  let node: HTMLElement | null = target

  while (node && node !== container) {
    const parent: HTMLElement | null =
      node.offsetParent instanceof HTMLElement ? node.offsetParent : null
    top += node.offsetTop
    left += node.offsetLeft
    if (parent && parent !== container) {
      top -= parent.scrollTop
      left -= parent.scrollLeft
    }

    node = parent
  }

  if (!node) {
    return null
  }

  const width = target.offsetWidth
  const height = target.offsetHeight
  return {
    top,
    left,
    width,
    height,
    radius: resolveRadius(target, width, height),
  }
}

function isSameBounds(first: THighlightBounds | null, second: THighlightBounds | null): boolean {
  if (first === null || second === null) {
    return first === second
  }

  return (
    first.top === second.top &&
    first.left === second.left &&
    first.width === second.width &&
    first.height === second.height &&
    first.radius === second.radius
  )
}

/**
 * Tracks the highlighted item inside the element that contains the highlight
 * surface. The highlight element must be a direct child of the container that
 * holds the items, so that `parentElement` resolves to it.
 *
 * Measurements are batched into animation frames and refreshed when the
 * highlighted item changes, the container resizes, or any scrollable
 * descendant scrolls.
 */
export function useAnimatedHighlight(
  highlightRef: RefObject<HTMLElement | null>,
  onUpdate: (update: THighlightUpdate) => void,
  { selector = defaultSelector, attributes = defaultAttributes }: THighlightOptions = {},
): void {
  const attributeKey = attributes.join(' ')

  useEffect(() => {
    const container = highlightRef.current?.parentElement
    if (!container) {
      return undefined
    }

    let frame: number | null = null
    let scrolling = false
    let settleTimer: number | null = null
    let lastTarget: HTMLElement | null = null
    let lastBounds: THighlightBounds | null = null
    let lastHasTarget = false

    const update = () => {
      frame = null
      const target = container.querySelector<HTMLElement>(selector)
      const nextBounds = target ? measureTarget(container, target) : null

      if (target === null || nextBounds === null) {
        if (lastHasTarget) {
          lastHasTarget = false
          onUpdate({
            bounds: lastBounds,
            targeted: false,
            skipAnimation: false,
          })
        }

        return
      }

      if (lastHasTarget && lastTarget === target && isSameBounds(lastBounds, nextBounds)) {
        return
      }

      const skipAnimation = scrolling || lastBounds === null || lastTarget === target

      lastTarget = target
      lastBounds = nextBounds
      lastHasTarget = true
      onUpdate({ bounds: nextBounds, targeted: true, skipAnimation })
    }

    const scheduleUpdate = () => {
      frame ??= requestAnimationFrame(update)
    }

    const handleScroll = () => {
      scrolling = true
      if (settleTimer !== null) {
        clearTimeout(settleTimer)
      }

      settleTimer = window.setTimeout(() => {
        scrolling = false
        settleTimer = null
      }, scrollSettleMs)
      if (frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }

      update()
    }

    const mutationObserver = new MutationObserver(scheduleUpdate)
    mutationObserver.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: attributeKey.split(' '),
    })

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(container)

    container.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    })

    scheduleUpdate()

    return () => {
      if (frame !== null) {
        cancelAnimationFrame(frame)
      }

      if (settleTimer !== null) {
        clearTimeout(settleTimer)
      }

      mutationObserver.disconnect()
      resizeObserver.disconnect()
      container.removeEventListener('scroll', handleScroll, {
        capture: true,
      })
    }
  }, [attributeKey, highlightRef, onUpdate, selector])
}
