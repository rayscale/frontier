import type { ScaleBand, ScaleLinear } from 'd3-scale'
import { createContext, useContext } from 'react'

import type { TChartDatum, TChartMargin } from './types.js'

export interface TChartSeries {
  readonly color: string
  readonly key: string
  readonly label: string
}

export interface TChartContextValue {
  readonly data: readonly TChartDatum[]
  readonly labels: readonly string[]
  readonly series: readonly TChartSeries[]
  readonly xKey: string
}

export interface TChartPlotContextValue {
  readonly activeIndex: number | null
  readonly barKeys: readonly string[]
  readonly height: number
  readonly innerHeight: number
  readonly innerWidth: number
  readonly margin: TChartMargin
  readonly registerBar: (key: string) => () => void
  readonly setActiveIndex: (index: number | null) => void
  readonly width: number
  readonly xScale: ScaleBand<number>
  readonly yScale: ScaleLinear<number, number>
}

export const chartContext = createContext<TChartContextValue | null>(null)

export const chartPlotContext = createContext<TChartPlotContextValue | null>(null)

export function useChart(): TChartContextValue {
  const context = useContext(chartContext)

  if (!context) {
    throw new Error('Chart parts must be rendered inside Chart.Root.')
  }

  return context
}

export function useChartPlot(): TChartPlotContextValue {
  const context = useContext(chartPlotContext)

  if (!context) {
    throw new Error('Chart marks, axes, and the tooltip must be rendered inside Chart.Plot.')
  }

  return context
}

/** The series of a key, or a neutral one for a key the chart was not configured with. */
export function useChartSeries(key: string): TChartSeries {
  const { series } = useChart()

  return (
    series.find((item) => item.key === key) ?? {
      color: 'var(--frontier-color-chart-1)',
      key,
      label: key,
    }
  )
}
