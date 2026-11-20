import { type RefObject, useEffect, useState } from 'react'

import { floatThreshold, reduceDynamicHeaderState } from '../helpers/dynamic-state.js'
import type { TDynamicHeaderState, TScrollTracker } from '../types.js'

/**
 * Tracks window scroll and returns the dynamic header state. The listener is
 * only attached while `enabled` is true.
 */
export function useDynamicHeaderState(
  elementRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): TDynamicHeaderState {
  const [state, setState] = useState<TDynamicHeaderState>('attached')

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
    let current: TDynamicHeaderState = window.scrollY > floatThreshold ? 'floating' : 'attached'
    setState(current)

    const handleScroll = () => {
      const hide = !elementRef.current?.contains(document.activeElement)
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
