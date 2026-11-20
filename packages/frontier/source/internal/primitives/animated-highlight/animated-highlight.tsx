import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { type ReactElement, useCallback, useRef } from 'react'

import { durationFast, springHighlight } from '../../../styles/motion.js'

import { type THighlightUpdate, useAnimatedHighlight } from './use-animated-highlight.js'

import './animated-highlight.css'

/** Props for {@link AnimatedHighlight}. */
export interface TAnimatedHighlightProps {
  /** Extra class for component-specific shape, such as corner radii. */
  className?: string | undefined
  /**
   * Morphs the corner radius to match the highlighted item, so circular and
   * rounded items keep their shape while the highlight moves between them.
   */
  followTargetShape?: boolean | undefined
}

/**
 * A single background surface that glides between highlighted items. Render it
 * as the first child of a positioned container that holds the items, and mark
 * the highlighted item with `data-highlighted`.
 */
export function AnimatedHighlight({
  className,
  followTargetShape = false,
}: TAnimatedHighlightProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion() ?? false
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  const radius = useMotionValue(0)
  const opacity = useMotionValue(0)
  const borderRadius = useTransform(radius, (value) => `${String(value)}px`)

  const handleUpdate = useCallback(
    ({ bounds, targeted, skipAnimation }: THighlightUpdate) => {
      const instant = prefersReducedMotion || skipAnimation
      const apply = (value: MotionValue<number>, to: number) => {
        if (instant) {
          value.jump(to)
        } else {
          animate(value, to, springHighlight)
        }
      }

      apply(x, bounds?.left ?? 0)
      apply(y, bounds?.top ?? 0)
      apply(width, bounds?.width ?? 0)
      apply(height, bounds?.height ?? 0)
      apply(radius, bounds?.radius ?? 0)

      const targetOpacity = targeted ? 1 : 0
      if (instant) {
        opacity.jump(targetOpacity)
      } else {
        animate(opacity, targetOpacity, { duration: durationFast })
      }
    },
    [prefersReducedMotion, x, y, width, height, radius, opacity],
  )

  useAnimatedHighlight(ref, handleUpdate)

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={['frontier-animated-highlight', className].filter(Boolean).join(' ')}
      style={{
        x,
        y,
        width,
        height,
        opacity,
        ...(followTargetShape && { borderRadius }),
      }}
    />
  )
}
