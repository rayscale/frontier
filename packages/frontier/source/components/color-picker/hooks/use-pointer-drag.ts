import { type PointerEvent as ReactPointerEvent, useRef, useState } from 'react'

export interface TDragPoint {
  readonly rect: DOMRect
  readonly x: number
  readonly y: number
}

interface TPointerDragHandlers {
  readonly dragging: boolean
  readonly onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => void
  readonly onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void
  readonly onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void
  readonly onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void
}

/**
 * Follows the pointer from the moment it goes down on an element until it is released, reporting
 * where it is each time. The first input inside the element takes the focus so the keyboard can
 * carry on from where the pointer stopped.
 */
export function usePointerDrag(
  onDrag: (point: TDragPoint) => void,
  disabled: boolean,
  startsInside: (point: TDragPoint) => boolean = () => true,
): TPointerDragHandlers {
  const active = useRef(false)
  const [dragging, setDragging] = useState(false)

  function report(event: ReactPointerEvent<HTMLElement>): TDragPoint {
    return {
      rect: event.currentTarget.getBoundingClientRect(),
      x: event.clientX,
      y: event.clientY,
    }
  }

  function finish(event: ReactPointerEvent<HTMLElement>): void {
    if (!active.current) {
      return
    }

    active.current = false
    setDragging(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return {
    dragging,
    onPointerCancel: finish,
    onPointerDown(event) {
      if (disabled || event.button !== 0) {
        return
      }

      const point = report(event)
      if (!startsInside(point)) {
        return
      }

      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.querySelector('input')?.focus()
      active.current = true
      setDragging(true)
      onDrag(point)
    },
    onPointerMove(event) {
      if (active.current) {
        onDrag(report(event))
      }
    },
    onPointerUp: finish,
  }
}
