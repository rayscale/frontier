import { type ForwardedRef, type RefObject, useCallback, useMemo, useRef } from 'react'

import type { TSheetStackEntry } from '../context.js'

/** Pointer movement above this many pixels is a swipe, not a click. */
const clickTolerancePx = 4

/** Mounted sheets, ordered from the back-most to the front-most. */
const openSheetStack: TSheetStackEntry[] = []
let pressOrigin: { x: number; y: number } | null = null
/** How many sheets were mounted before the current press, so sheets it opens are ignored. */
let pressStackLength = 0

function handleDocumentPointerDown(event: globalThis.PointerEvent) {
  pressOrigin = { x: event.clientX, y: event.clientY }
  pressStackLength = openSheetStack.length
}

/**
 * Base UI dismisses only the front-most sheet on an outside click, and it
 * ignores clicks on a lower sheet when that sheet is nested. Clicking a lower
 * sheet, or the page behind the stack, closes the sheets in front of it.
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

  const stack = openSheetStack.slice(0, pressStackLength)
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

function addOpenSheet(entry: TSheetStackEntry) {
  if (openSheetStack.length === 0) {
    document.addEventListener('pointerdown', handleDocumentPointerDown, true)
    document.addEventListener('click', handleDocumentClick)
  }

  openSheetStack.push(entry)
}

function removeOpenSheet(entry: TSheetStackEntry) {
  const index = openSheetStack.indexOf(entry)

  if (index !== -1) {
    openSheetStack.splice(index, 1)
  }

  if (openSheetStack.length === 0) {
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

export function useSheetStack(actionsRef: RefObject<{ close: () => void } | null>): {
  closeOnBackdropClickRef: RefObject<boolean>
  stackEntry: TSheetStackEntry
} {
  const popupRef = useRef<HTMLElement | null>(null)
  const closeOnBackdropClickRef = useRef(true)
  const stackEntry = useMemo<TSheetStackEntry>(
    () => ({
      popupRef,
      close: () => actionsRef.current?.close(),
      closeOnBackdropClickRef,
    }),
    [actionsRef],
  )

  return { closeOnBackdropClickRef, stackEntry }
}

export function useSheetPopupRegistration(
  stackEntry: TSheetStackEntry,
  ref: ForwardedRef<HTMLDivElement>,
): (element: HTMLDivElement | null) => void {
  return useCallback(
    (element: HTMLDivElement | null) => {
      const previousElement = stackEntry.popupRef.current
      stackEntry.popupRef.current = element
      if (previousElement && !element) {
        removeOpenSheet(stackEntry)
      } else if (element && !previousElement) {
        addOpenSheet(stackEntry)
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
