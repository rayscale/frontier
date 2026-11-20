import { useEffect, useState } from 'react'

/**
 * A counter that advances on its own, so a demo can drive a component without anyone touching it.
 * It stays at zero when the visitor prefers reduced motion, and it pauses while the tab is hidden.
 */
export function useTick(interval: number, start = 0): number {
  const [tick, setTick] = useState(start)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setTick((current) => current + 1)
      }
    }, interval)

    return () => {
      window.clearInterval(timer)
    }
  }, [interval])

  return tick
}
