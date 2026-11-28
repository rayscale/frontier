import { createContext, type RefObject, useContext } from 'react'

import type { TSize, TZoom } from './helpers/zoom.js'

/** What the trigger knows about its image, to show it larger. */
export interface TImageZoomSource {
  readonly alt: string
  readonly height: number
  readonly src: string
  readonly width: number
}

export interface TImageZoomContextValue {
  readonly imageRef: RefObject<HTMLImageElement | null>
  readonly maxZoom: number
  /** Whether the enlarged image is on the screen, which is until it has flown back. */
  readonly mounted: boolean
  readonly open: boolean
  readonly pan: (deltaX: number, deltaY: number, size: TSize) => void
  readonly requestOpenChange: (open: boolean) => void
  readonly setMounted: (mounted: boolean) => void
  /** Which way another trigger is from one, in the order of the page: `1` if it comes after, `-1` if before. */
  readonly getDirection: (from: string | undefined, to: string | undefined) => 1 | -1
  readonly getTrigger: () => HTMLButtonElement | null
  readonly registerTrigger: (key: string, node: HTMLButtonElement | null) => void
  readonly setSource: (key: string, source: TImageZoomSource) => void
  readonly setValue: (value: string | undefined) => void
  readonly source: TImageZoomSource | null
  /** Which trigger the image is shown for, when there are several. */
  readonly value: string | undefined
  readonly zoom: TZoom
  readonly zoomAt: (scale: number, cursor: { x: number; y: number }, size: TSize) => void
  readonly zoomBy: (factor: number, size: TSize) => void
}

export const imageZoomContext = createContext<TImageZoomContextValue | null>(null)

export function useImageZoomContext(componentName: string): TImageZoomContextValue {
  const context = useContext(imageZoomContext)

  if (!context) {
    throw new Error(`${componentName} must be used within ImageZoom.`)
  }

  return context
}
