import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { TCursorCardContentProps } from '../cursor-card/cursor-card.js'

/** One row of data: a value for the x key and a number for each series. */
export type TChartDatum = Readonly<{ [key: string]: string | number | null | undefined }>

/** How one series is named and colored. */
export interface TChartSeriesConfig {
  /** CSS color of the series. Defaults to the next `--frontier-color-chart-*` token. */
  color?: string | undefined
  /** Name of the series in the legend, the tooltip, and the table. Defaults to its key. */
  label?: string | undefined
}

/** The series of a chart, keyed by the field of the data they read. */
export type TChartConfig = Readonly<{ [key: string]: TChartSeriesConfig }>

/** Shape a line or an area takes between two points. */
export type TChartCurve = 'linear' | 'monotone' | 'step'

/** Space around the drawing area, in pixels, for axes and labels. */
export interface TChartMargin {
  bottom: number
  left: number
  right: number
  top: number
}

/** Props for the element that holds the data and the series of a chart. */
export type TChartRootProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** The rows of data, one for each position along the x axis. */
  data: readonly TChartDatum[]
  /** Field of each row that names its position along the x axis. */
  xKey: string
  children?: ReactNode | undefined
  /** Name and color of each series, keyed by data field. The keys also decide which fields are series. Defaults to every numeric field except `xKey`. */
  config?: TChartConfig | undefined
}

/** Props for the drawing area. Give it an accessible name with `aria-label`. */
export type TChartPlotProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  children?: ReactNode | undefined
  /** Height of the drawing area in pixels. Defaults to `280`. */
  height?: number | undefined
  /** Space around the plot for axes and labels. Each side defaults to the room an axis needs. */
  margin?: Partial<TChartMargin> | undefined
  /** Fixed width in pixels. Defaults to the width of the container, which it follows. */
  width?: number | undefined
  /** Lowest and highest value of the y axis. Defaults to a range that fits every series and includes zero. */
  yDomain?: readonly [number, number] | undefined
}

/** Props for the grid lines behind the marks. */
export type TChartGridProps = Omit<ComponentPropsWithoutRef<'g'>, 'children'> & {
  /** Draws a line across the plot at each y tick. Defaults to `true`. */
  horizontal?: boolean | undefined
  /** Approximate number of y ticks. Defaults to `5`. */
  ticks?: number | undefined
  /** Draws a line down the plot at each x position. Defaults to `false`. */
  vertical?: boolean | undefined
}

/** Props for the labels along the bottom of the plot. */
export type TChartXAxisProps = Omit<ComponentPropsWithoutRef<'g'>, 'children'> & {
  /** Formats the label of each x position. */
  tickFormat?: ((label: string, index: number) => string) | undefined
}

/** Props for the labels along the left of the plot. */
export type TChartYAxisProps = Omit<ComponentPropsWithoutRef<'g'>, 'children'> & {
  /** Approximate number of ticks. Defaults to `5`. */
  ticks?: number | undefined
  /** Formats the label of each tick. Defaults to the number in the locale of the user. */
  tickFormat?: ((value: number) => string) | undefined
}

/** Props for a series drawn as bars. Bars of several series sit side by side. */
export type TChartBarProps = Omit<ComponentPropsWithoutRef<'g'>, 'children'> & {
  /** Field of the data this series reads. */
  dataKey: string
  /** Corner radius of the top of each bar, in pixels. Defaults to `4`. */
  radius?: number | undefined
}

/** Props for a series drawn as a line. */
export type TChartLineProps = Omit<ComponentPropsWithoutRef<'g'>, 'children'> & {
  /** Field of the data this series reads. */
  dataKey: string
  /** Shape of the line between points. Defaults to `monotone`. */
  curve?: TChartCurve | undefined
  /** Marks every point of the line. Defaults to `false`. */
  dots?: boolean | undefined
}

/** Props for a series drawn as an area under a line. */
export type TChartAreaProps = Omit<ComponentPropsWithoutRef<'g'>, 'children'> & {
  /** Field of the data this series reads. */
  dataKey: string
  /** Shape of the line between points. Defaults to `monotone`. */
  curve?: TChartCurve | undefined
}

/** One series in the tooltip. */
export interface TChartTooltipItem {
  /** CSS color of the series. */
  readonly color: string
  /** Field of the data the series reads. */
  readonly key: string
  /** Name of the series. */
  readonly label: string
  /** Value at the position under the cursor, or `null` when the row has none. */
  readonly value: number | null
}

/** What the tooltip knows about the position under the cursor. */
export interface TChartTooltipInfo {
  /** The row of data under the cursor. */
  readonly datum: TChartDatum
  /** Position of the row in the data. */
  readonly index: number
  /** The x label of the row. */
  readonly label: string
  /** The value of every series in the row. */
  readonly items: readonly TChartTooltipItem[]
}

/** Props for the tooltip that follows the cursor across the plot. */
export type TChartTooltipProps = Omit<TCursorCardContentProps, 'children'> & {
  /** Replaces the content of the card. It receives the row under the cursor. */
  children?: ((info: TChartTooltipInfo) => ReactNode) | undefined
  /** Formats the value of each series in the default content. Defaults to the number in the locale of the user. */
  valueFormat?: ((value: number, key: string) => string) | undefined
}

/** Props for the list that names each series. */
export type TChartLegendProps = ComponentPropsWithoutRef<'ul'>
