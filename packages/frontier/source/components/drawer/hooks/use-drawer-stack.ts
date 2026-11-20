import { type ForwardedRef, type RefObject, useCallback, useMemo, useRef } from 'react'

import type { TDrawerStackEntry } from '../context.js'

/** Pointer movement above this many pixels is a swipe, not a click. */
const clickTolerancePx = 4

/** Mounted drawers, ordered from the back-most to the front-most. */
const openDrawerStack: TDrawerStackEntry[] = []
let pressOrigin: { x: number; y: number } | null = null
/** How many drawers were mounted before the current press, so drawers it opens are ignored. */
let pressStackLength = 0

function handleDocumentPointerDown(event: globalThis.PointerEvent) {
  pressOrigin = { x: event.clientX, y: event.clientY }
  pressStackLength = openDrawerStack.length
}

/**
 * Base UI dismisses only the front-most drawer on an outside click, and it
 * ignores clicks on a lower drawer when that drawer is nested. Clicking a lower
 * drawer, or the page behind the stack, closes the drawers in front of it.
 */
function handleDocumentClick(event: globalThis.MouseEvent) {
  const origin = pressOrigin
  pressOrigin = null

  if (
    !origin ||
    Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > clickTolerancePx
  ) {
    return
  }

  const stack = openDrawerStack.slice(0, pressStackLength)
  const frontIndex = stack.length - 1
  let clickedIndex = -1

  for (let index = frontIndex; index >= 0; index -= 1) {
    const entry = stack[index]

    if (!entry) {
      continue
    }

    if (isPointInsideElement(entry.popupRef.current, event.clientX, event.clientY)) {
      clickedIndex = index
      break
    }
  }

  if (clickedIndex === frontIndex) {
    return
  }

  if (clickedIndex === -1 && frontIndex === 0) {
    return
  }

  const firstIndexToClose = clickedIndex === -1 ? frontIndex : clickedIndex + 1

  for (let index = frontIndex; index >= firstIndexToClose; index -= 1) {
    const entry = stack[index]

    if (!entry) {
      continue
    }

    if (!entry.closeOnBackdropClickRef.current) {
      return
    }

    entry.close()
  }
}

function addOpenDrawer(entry: TDrawerStackEntry) {
  if (openDrawerStack.length === 0) {
    document.addEventListener('pointerdown', handleDocumentPointerDown, true)
    document.addEventListener('click', handleDocumentClick)
  }

  openDrawerStack.push(entry)
}

function removeOpenDrawer(entry: TDrawerStackEntry) {
  const index = openDrawerStack.indexOf(entry)

  if (index !== -1) {
    openDrawerStack.splice(index, 1)
  }

  if (openDrawerStack.length === 0) {
    document.removeEventListener('pointerdown', handleDocumentPointerDown, true)
    document.removeEventListener('click', handleDocumentClick)
    pressOrigin = null
  }
}

function isPointInsideElement(element: HTMLElement | null, x: number, y: number) {
  if (!element) {
    return false
  }

  const rect = element.getBoundingClientRect()

  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

export function useDrawerStack(actionsRef: RefObject<{ close: () => void } | null>): {
  closeOnBackdropClickRef: RefObject<boolean>
  stackEntry: TDrawerStackEntry
} {
  const popupRef = useRef<HTMLElement | null>(null)
  const closeOnBackdropClickRef = useRef(true)
  const stackEntry = useMemo<TDrawerStackEntry>(
    () => ({
      popupRef,
      close: () => actionsRef.current?.close(),
      closeOnBackdropClickRef,
    }),
    [actionsRef],
  )

  return { closeOnBackdropClickRef, stackEntry }
}

export function useDrawerPopupRegistration(
  stackEntry: TDrawerStackEntry,
  ref: ForwardedRef<HTMLDivElement>,
): (element: HTMLDivElement | null) => void {
  return useCallback(
    (element: HTMLDivElement | null) => {
      const previousElement = stackEntry.popupRef.current
      stackEntry.popupRef.current = element
      if (previousElement && !element) {
        removeOpenDrawer(stackEntry)
      } else if (element && !previousElement) {
        addOpenDrawer(stackEntry)
      }

      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    },
    [ref, stackEntry],
  )
}
