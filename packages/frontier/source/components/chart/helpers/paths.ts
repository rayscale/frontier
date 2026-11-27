import { area, curveLinear, curveMonotoneX, curveStep, line } from 'd3-shape'

import type { TChartCurve } from '../types.js'

export interface TChartPoint {
  readonly value: number | null
  readonly x: number
}

const curves = {
  linear: curveLinear,
  monotone: curveMonotoneX,
  step: curveStep,
} as const

/** The path of a line through the points, with a gap wherever a point has no value. */
export function buildLinePath(
  points: readonly TChartPoint[],
  toY: (value: number) => number,
  curve: TChartCurve,
): string {
  return (
    line<TChartPoint>()
      .defined((point) => point.value !== null)
      .x((point) => point.x)
      .y((point) => toY(point.value ?? 0))
      .curve(curves[curve])(points) ?? ''
  )
}

/** The path of the region between a line through the points and a baseline. */
export function buildAreaPath(
  points: readonly TChartPoint[],
  toY: (value: number) => number,
  baseline: number,
  curve: TChartCurve,
): string {
  return (
    area<TChartPoint>()
      .defined((point) => point.value !== null)
      .x((point) => point.x)
      .y0(baseline)
      .y1((point) => toY(point.value ?? 0))
      .curve(curves[curve])(points) ?? ''
  )
}

/** The outline of a bar whose free end is rounded, growing up from the baseline or down from it. */
export function buildBarPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  grows: 'up' | 'down',
): string {
  const r = Math.max(0, Math.min(radius, width / 2, height))
  const right = x + width
  const bottom = y + height

  if (grows === 'up') {
    return `M${String(x)} ${String(bottom)}V${String(y + r)}A${String(r)} ${String(r)} 0 0 1 ${String(x + r)} ${String(y)}H${String(right - r)}A${String(r)} ${String(r)} 0 0 1 ${String(right)} ${String(y + r)}V${String(bottom)}Z`
  }

  return `M${String(x)} ${String(y)}V${String(bottom - r)}A${String(r)} ${String(r)} 0 0 0 ${String(x + r)} ${String(bottom)}H${String(right - r)}A${String(r)} ${String(r)} 0 0 0 ${String(right)} ${String(bottom - r)}V${String(y)}Z`
}
