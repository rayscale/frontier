import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { type ReactElement, useCallback, useMemo, useRef, useState } from 'react'

import { imageZoomContext, type TImageZoomContextValue, type TImageZoomSource } from '../context.js'
import { clampZoom, restingZoom, type TSize, zoomAround } from '../helpers/zoom.js'
import type { TImageZoomProps } from '../types.js'

function isSameSource(first: TImageZoomSource | undefined, second: TImageZoomSource): boolean {
  return (
    first?.alt === second.alt &&
    first.height === second.height &&
    first.src === second.src &&
    first.width === second.width
  )
}

export function ImageZoomRoot({
  children,
  defaultOpen = false,
  defaultValue,
  maxZoom = 4,
  onOpenChange,
  onValueChange,
  open,
  value,
}: TImageZoomProps): ReactElement {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [zoom, setZoom] = useState(restingZoom)
  const [sources, setSources] = useState<ReadonlyMap<string, TImageZoomSource>>(new Map())
  const [mounted, setMounted] = useState(false)
  const triggers = useRef(new Map<string, HTMLButtonElement>())
  const imageRef = useRef<HTMLImageElement | null>(null)
  const current = open ?? internalOpen
  const currentValue = value ?? internalValue

  // A closed image is never zoomed, so it opens at its resting size and flies back that way.
  // Another image starts at its resting size too.
  const [shownValue, setShownValue] = useState(currentValue)
  if ((!current && zoom !== restingZoom) || shownValue !== currentValue) {
    setShownValue(currentValue)
    setZoom(restingZoom)
  }

  const requestOpenChange = useCallback(
    (next: boolean) => {
      if (open === undefined) {
        setInternalOpen(next)
      }

      onOpenChange?.(next)
    },
    [onOpenChange, open],
  )

  const setValue = useCallback(
    (next: string | undefined) => {
      if (value === undefined) {
        setInternalValue(next)
      }

      onValueChange?.(next)
    },
    [onValueChange, value],
  )

  const registerTrigger = useCallback((key: string, node: HTMLButtonElement | null) => {
    if (node) {
      triggers.current.set(key, node)
    } else {
      triggers.current.delete(key)
    }
  }, [])

  // Triggers set their source from an effect, so this keeps one identity, and data that did not
  // change keeps the same map. Without both, setting it would run the effect again without end.
  const setSource = useCallback((key: string, source: TImageZoomSource) => {
    setSources((previous) =>
      isSameSource(previous.get(key), source) ? previous : new Map(previous).set(key, source),
    )
  }, [])

  const contextValue = useMemo<TImageZoomContextValue>(
    () => ({
      getDirection: (from, to) => {
        const first = triggers.current.get(from ?? '')
        const second = triggers.current.get(to ?? '')

        return first &&
          second &&
          first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_PRECEDING
          ? -1
          : 1
      },
      getTrigger: () =>
        triggers.current.get(currentValue ?? '') ?? triggers.current.values().next().value ?? null,
      imageRef,
      maxZoom,
      mounted,
      open: current,
      pan: (deltaX: number, deltaY: number, size: TSize) => {
        setZoom((previous) =>
          previous.scale === 1
            ? previous
            : clampZoom(
                { ...previous, x: previous.x + deltaX, y: previous.y + deltaY },
                size,
                maxZoom,
              ),
        )
      },
      registerTrigger,
      requestOpenChange,
      setMounted,
      setSource,
      setValue,
      source: sources.get(currentValue ?? '') ?? null,
      value: currentValue,
      zoom,
      zoomAt: (scale, cursor, size) => {
        setZoom((previous) => zoomAround(previous, scale, cursor, size, maxZoom))
      },
      zoomBy: (factor, size) => {
        setZoom((previous) =>
          zoomAround(previous, previous.scale * factor, { x: 0, y: 0 }, size, maxZoom),
        )
      },
    }),
    [
      current,
      currentValue,
      maxZoom,
      mounted,
      registerTrigger,
      requestOpenChange,
      setSource,
      setValue,
      sources,
      zoom,
    ],
  )

  return (
    <imageZoomContext.Provider value={contextValue}>
      <BaseDialog.Root
        open={current}
        onOpenChange={(next) => {
          requestOpenChange(next)
        }}
      >
        {children}
      </BaseDialog.Root>
    </imageZoomContext.Provider>
  )
}
