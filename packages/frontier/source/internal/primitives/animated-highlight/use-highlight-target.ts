import {
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { findHighlightTarget } from './find-highlight-target.js'

interface TUseHighlightTargetOptions {
  enabled: boolean
  containerRef: RefObject<HTMLElement | null>
  selector: string
  /** Items that never take the highlight, such as one that already has its own marker. */
  excludeSelector?: string | undefined
}

/**
 * Whether an element shows its focus because of the keyboard. A click focuses an item too, but it
 * is the pointer that is acting then, so the highlight must not stay on that item afterwards.
 */
function isFocusVisible(element: EventTarget | null): boolean {
  if (!(element instanceof Element)) {
    return false
  }

  try {
    return element.matches(':focus-visible')
  } catch {
    return true
  }
}

export function useHighlightTarget({
  enabled,
  containerRef,
  selector,
  excludeSelector,
}: TUseHighlightTargetOptions): {
  handlePointerOver: (event: ReactPointerEvent<HTMLElement>) => void
  handlePointerLeave: () => void
  handleFocusCapture: (event: ReactFocusEvent<HTMLElement>) => void
  handleBlurCapture: (event: ReactFocusEvent<HTMLElement>) => void
} {
  const pointerTargetRef = useRef<HTMLElement | null>(null)
  const focusedTargetRef = useRef<HTMLElement | null>(null)
  const highlightedTargetRef = useRef<HTMLElement | null>(null)
  const highlightSourceRef = useRef<'pointer' | 'focus'>('pointer')

  const updateHighlight = useCallback(() => {
    const nextTarget =
      highlightSourceRef.current === 'pointer'
        ? (pointerTargetRef.current ?? focusedTargetRef.current)
        : (focusedTargetRef.current ?? pointerTargetRef.current)
    const previousTarget = highlightedTargetRef.current

    if (previousTarget === nextTarget) {
      return
    }

    previousTarget?.removeAttribute('data-highlighted')
    nextTarget?.setAttribute('data-highlighted', '')
    highlightedTargetRef.current = nextTarget
  }, [])

  const resolveTarget = (target: EventTarget | null): HTMLElement | null => {
    const found = findHighlightTarget(target, containerRef.current, selector)

    return found && excludeSelector && found.matches(excludeSelector) ? null : found
  }

  const handlePointerOver = (event: ReactPointerEvent<HTMLElement>) => {
    highlightSourceRef.current = 'pointer'

    if (!enabled || event.pointerType === 'touch') {
      pointerTargetRef.current = null
      updateHighlight()
      return
    }

    const element = event.target instanceof Element ? event.target : null
    if (!element?.closest(selector)) {
      // Between two items the highlight stays where it is, so crossing the space is not a flicker.
      updateHighlight()
      return
    }

    pointerTargetRef.current = resolveTarget(event.target)
    updateHighlight()
  }

  const handlePointerLeave = () => {
    pointerTargetRef.current = null
    highlightSourceRef.current = 'pointer'
    updateHighlight()
  }

  const handleFocusCapture = (event: ReactFocusEvent<HTMLElement>) => {
    const focused = enabled && isFocusVisible(event.target) ? resolveTarget(event.target) : null

    // Focus that arrives while the pointer is over the same item came from a click.
    focusedTargetRef.current = focused === pointerTargetRef.current ? null : focused
    highlightSourceRef.current = 'focus'
    updateHighlight()
  }

  const handleBlurCapture = (event: ReactFocusEvent<HTMLElement>) => {
    focusedTargetRef.current =
      enabled && isFocusVisible(event.relatedTarget) ? resolveTarget(event.relatedTarget) : null
    highlightSourceRef.current = 'focus'
    updateHighlight()
  }

  useEffect(() => {
    if (enabled) {
      return
    }

    pointerTargetRef.current = null
    focusedTargetRef.current = null
    updateHighlight()
  }, [enabled, updateHighlight])

  return {
    handlePointerOver,
    handlePointerLeave,
    handleFocusCapture,
    handleBlurCapture,
  }
}
