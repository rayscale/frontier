import type { TProgressCircularProps, TProgressProps, TProgressSize } from '../types.js'

const defaultMax = 100

const colorTokens = new Map<string, string>([
  ['primary', 'var(--frontier-color-primary)'],
  ['success', 'var(--frontier-color-success)'],
  ['danger', 'var(--frontier-color-danger)'],
])

const trackColorTokens = new Map<string, string>([
  ['subtle', 'var(--frontier-color-border-subtle)'],
  ['default', 'var(--frontier-color-border)'],
  ['strong', 'var(--frontier-color-border-strong)'],
])

export function resolveMax(max: number | undefined): number {
  return max !== undefined && Number.isFinite(max) && max > 0 ? max : defaultMax
}

export function resolveValue(value: number | undefined, max: number): number | undefined {
  if (value === undefined || Number.isNaN(value)) {
    return undefined
  }

  return Math.min(Math.max(value, 0), max)
}

export function resolveColor(color: TProgressProps['color']): string | undefined {
  if (color === undefined) {
    return undefined
  }

  return colorTokens.get(color) ?? color
}

export function resolveTrackColor(trackColor: TProgressProps['trackColor']): string | undefined {
  if (trackColor === undefined) {
    return undefined
  }

  return trackColorTokens.get(trackColor) ?? trackColor
}

export function resolveThickness(thickness: TProgressProps['thickness']): string | undefined {
  if (thickness === undefined) {
    return undefined
  }

  return typeof thickness === 'number' ? `${String(thickness)}px` : thickness
}

export function isProgressSize(size: unknown): size is TProgressSize {
  return size === 'small' || size === 'medium' || size === 'large'
}

export function resolveDiameter(size: TProgressCircularProps['size']): string | undefined {
  if (size === undefined || isProgressSize(size)) {
    return undefined
  }

  return typeof size === 'number' ? `${String(size)}px` : size
}
