/** How an enlarged image is scaled and moved. The offset is in pixels from where it rests centered. */
export interface TZoom {
  readonly scale: number
  readonly x: number
  readonly y: number
}

export interface TSize {
  readonly height: number
  readonly width: number
}

export const restingZoom: TZoom = { scale: 1, x: 0, y: 0 }

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** The farthest an enlarged image can be moved, so its edges never leave the middle of the screen. */
function getLimit(scale: number, length: number): number {
  return Math.max(0, ((scale - 1) * length) / 2)
}

/** Keeps the image inside the limits for its scale. */
export function clampZoom(zoom: TZoom, size: TSize, maxZoom: number): TZoom {
  const scale = clamp(zoom.scale, 1, maxZoom)
  const limitX = getLimit(scale, size.width)
  const limitY = getLimit(scale, size.height)

  return scale === 1
    ? restingZoom
    : { scale, x: clamp(zoom.x, -limitX, limitX), y: clamp(zoom.y, -limitY, limitY) }
}

/**
 * Changes the scale and keeps the part of the image under the cursor where it is. The cursor is
 * measured in pixels from the center of the image.
 */
export function zoomAround(
  zoom: TZoom,
  nextScale: number,
  cursor: { x: number; y: number },
  size: TSize,
  maxZoom: number,
): TZoom {
  const scale = clamp(nextScale, 1, maxZoom)
  const ratio = scale / zoom.scale

  return clampZoom(
    {
      scale,
      x: cursor.x - (cursor.x - zoom.x) * ratio,
      y: cursor.y - (cursor.y - zoom.y) * ratio,
    },
    size,
    maxZoom,
  )
}
