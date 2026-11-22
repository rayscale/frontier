import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { type ReactElement, useEffect, useRef } from 'react'

import { measureTarget } from '../../../internal/primitives/animated-highlight/use-animated-highlight.js'
import { durationFast, springHighlight } from '../../../styles/motion.js'

const targetSelector = '[data-current]:not([data-disabled])'
const railSelector = '.frontier-tree__group-content'

/** Where the marker rests: on the guide line that leads to the row, at the height of the row. */
interface TRailPosition {
  left: number
  top: number
  height: number
}

function measurePosition(
  container: HTMLElement,
  row: HTMLElement,
  barWidth: number,
): TRailPosition | null {
  const bounds = measureTarget(container, row)
  if (!bounds) {
    return null
  }

  const inset = Number.parseFloat(getComputedStyle(row).paddingBlockStart) || 0
  const rail = row.parentElement?.closest<HTMLElement>(railSelector)
  const railBounds = rail ? measureTarget(container, rail) : null
  const line = rail ? Number.parseFloat(getComputedStyle(rail).borderInlineStartWidth) || 1 : 0

  return {
    left: railBounds ? railBounds.left + line / 2 - barWidth / 2 : 0,
    top: bounds.top + inset,
    height: Math.max(bounds.height - inset * 2, 0),
  }
}

function samePosition(first: TRailPosition | null, second: TRailPosition | null): boolean {
  if (first === null || second === null) {
    return first === second
  }

  return first.left === second.left && first.top === second.top && first.height === second.height
}

/**
 * The marker of the current row. It sits on the guide line that leads to the row, and when the
 * current row changes it moves straight to the new one. Render it as a direct child of the
 * container that holds the rows, and mark the current row with `data-current`.
 */
export function TreeCurrentRail(): ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion() ?? false
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const height = useMotionValue(0)
  const opacity = useMotionValue(0)

  useEffect(() => {
    const element = ref.current
    const container = element?.parentElement
    if (!element || !container) {
      return undefined
    }

    let frame: number | null = null
    let lastTarget: HTMLElement | null = null
    let lastPosition: TRailPosition | null = null

    const update = () => {
      frame = null
      const target = container.querySelector<HTMLElement>(targetSelector)
      const position = target ? measurePosition(container, target, element.offsetWidth || 2) : null

      if (!target || !position) {
        if (lastTarget) {
          lastTarget = null
          animate(opacity, 0, { duration: durationFast })
        }

        return
      }

      if (target === lastTarget && samePosition(lastPosition, position)) {
        return
      }

      // The first position, and the same row that moves because the tree around it changed, are
      // applied at once. Only a change of row travels.
      const instant = prefersReducedMotion || lastPosition === null || target === lastTarget
      const wasHidden = lastTarget === null

      const settle = (value: typeof x, to: number) => {
        if (instant) {
          value.jump(to)
        } else {
          animate(value, to, springHighlight)
        }
      }

      settle(x, position.left)
      settle(y, position.top)
      settle(height, position.height)

      if (instant || wasHidden) {
        opacity.jump(1)
      } else {
        animate(opacity, 1, { duration: durationFast })
      }

      lastTarget = target
      lastPosition = position
    }

    const schedule = () => {
      frame ??= requestAnimationFrame(update)
    }

    const mutations = new MutationObserver(schedule)
    mutations.observe(container, {
      attributes: true,
      attributeFilter: ['data-current', 'data-disabled'],
      childList: true,
      subtree: true,
    })
    const resizes = new ResizeObserver(schedule)
    resizes.observe(container)
    schedule()

    return () => {
      if (frame !== null) {
        cancelAnimationFrame(frame)
      }

      mutations.disconnect()
      resizes.disconnect()
    }
  }, [height, opacity, prefersReducedMotion, x, y])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="frontier-tree__rail"
      style={{ height, opacity, x, y }}
    />
  )
}
