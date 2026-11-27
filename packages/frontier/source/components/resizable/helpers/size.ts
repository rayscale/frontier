import type { TResizableSize } from '../types.js'

/** Converts a public size into the unit the layout engine expects: a bare number is a percentage. */
export function toLayoutSize(size: TResizableSize): string {
  return typeof size === 'number' ? `${String(size)}%` : size
}
