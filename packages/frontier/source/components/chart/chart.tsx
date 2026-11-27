import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { ChartXAxis, ChartYAxis } from './parts/axes.js'
import { ChartGrid } from './parts/grid.js'
import { ChartLegend } from './parts/legend.js'
import { ChartArea, ChartBar, ChartLine } from './parts/marks.js'
import { ChartPlot } from './parts/plot.js'
import { ChartRoot } from './parts/root.js'
import { ChartTooltip } from './parts/tooltip.js'
import type { TChartRootProps } from './types.js'

import './chart.css'

export type {
  TChartAreaProps,
  TChartBarProps,
  TChartConfig,
  TChartCurve,
  TChartDatum,
  TChartGridProps,
  TChartLegendProps,
  TChartLineProps,
  TChartMargin,
  TChartPlotProps,
  TChartRootProps,
  TChartSeriesConfig,
  TChartTooltipInfo,
  TChartTooltipItem,
  TChartTooltipProps,
  TChartXAxisProps,
  TChartYAxisProps,
} from './types.js'

export interface TChartComponent extends ForwardRefExoticComponent<
  TChartRootProps & RefAttributes<HTMLDivElement>
> {
  /** Holds the data and the series, and shares them with the parts of the chart. */
  Root: typeof ChartRoot
  /** The drawing area. It measures its container, scales the data, and gives the marks their place. */
  Plot: typeof ChartPlot
  /** Grid lines behind the marks. */
  Grid: typeof ChartGrid
  /** Labels for each position along the bottom of the plot. */
  XAxis: typeof ChartXAxis
  /** Labels for the value scale along the left of the plot. */
  YAxis: typeof ChartYAxis
  /** A series drawn as bars. */
  Bar: typeof ChartBar
  /** A series drawn as a line. */
  Line: typeof ChartLine
  /** A series drawn as an area under a line. */
  Area: typeof ChartArea
  /** A card that follows the cursor across the plot and shows the values at that position. */
  Tooltip: typeof ChartTooltip
  /** A list that names each series with its color. */
  Legend: typeof ChartLegend
}

/**
 * Charts a series of values for each position along an axis, as bars, lines, areas, or a mix of
 * them. Compose it with `Chart.Root` and `Chart.Plot`, and add the axes, grid, marks, tooltip, and
 * legend you need.
 */
export const Chart: TChartComponent = Object.assign(ChartRoot, {
  Root: ChartRoot,
  Plot: ChartPlot,
  Grid: ChartGrid,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Bar: ChartBar,
  Line: ChartLine,
  Area: ChartArea,
  Tooltip: ChartTooltip,
  Legend: ChartLegend,
})
