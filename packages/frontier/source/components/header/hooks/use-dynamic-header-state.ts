import { type RefObject, useEffect, useRef, useState } from 'react'

import { reduceDynamicHeaderState, scrollThreshold } from '../helpers/dynamic-state.js'
import type { TDynamicHeaderState, TScrollTracker } from '../types.js'

/**
 * Tracks window scroll and returns the dynamic header state. The listener is
 * only attached while `enabled` is true. While `locked` is true the header
 * never hides, such as when its navigation panel is open.
 */
export function useDynamicHeaderState(
  elementRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  locked = false,
): TDynamicHeaderState {
  const [state, setState] = useState<TDynamicHeaderState>('attached')
  const lockedRef = useRef(locked)

  useEffect(() => {
    lockedRef.current = locked
  }, [locked])

  useEffect(() => {
    if (!enabled) {
      setState('attached')
      return undefined
    }

    const tracker: TScrollTracker = {
      lastY: window.scrollY,
      direction: 0,
      distance: 0,
    }
    let current: TDynamicHeaderState = window.scrollY > scrollThreshold ? 'scrolled' : 'attached'
    setState(current)

    const handleScroll = () => {
      const hide = !lockedRef.current && !elementRef.current?.contains(document.activeElement)
      const next = reduceDynamicHeaderState(current, window.scrollY, tracker, hide)
      if (next !== current) {
        current = next
        setState(next)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [enabled, elementRef])

  return state
}
