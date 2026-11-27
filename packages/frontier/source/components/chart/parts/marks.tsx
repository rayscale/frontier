import { type CSSProperties, forwardRef, type ReactElement, useLayoutEffect } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useChart, useChartPlot, useChartSeries } from '../context.js'
import { buildAreaPath, buildBarPath, buildLinePath, type TChartPoint } from '../helpers/paths.js'
import { readValue } from '../helpers/series.js'
import type { TChartAreaProps, TChartBarProps, TChartLineProps } from '../types.js'

function seriesStyle(
  style: CSSProperties | undefined,
  color: string,
): CSSProperties & TCssCustomProperties {
  return { ...style, '--_series-color': color }
}

/** The point of a series at each position, at the center of the position. */
function usePoints(dataKey: string): readonly TChartPoint[] {
  const { data } = useChart()
  const { xScale } = useChartPlot()

  return data.map((datum, index) => ({
    value: readValue(datum, dataKey),
    x: (xScale(index) ?? 0) + xScale.bandwidth() / 2,
  }))
}

/** The ring that marks the point under the cursor. */
function ActivePoint({ points }: { points: readonly TChartPoint[] }): ReactElement | null {
  const { activeIndex, yScale } = useChartPlot()
  const point = activeIndex === null ? undefined : points[activeIndex]

  if (point?.value === null || point?.value === undefined) {
    return null
  }

  return (
    <circle className="frontier-chart__active-dot" cx={point.x} cy={yScale(point.value)} r={5} />
  )
}

export const ChartBar = forwardRef<SVGGElement, TChartBarProps>(function ChartBar(
  { className, dataKey, radius = 4, style, ...props },
  ref,
) {
  const { data } = useChart()
  const { barKeys, innerHeight, registerBar, xScale, yScale } = useChartPlot()
  const series = useChartSeries(dataKey)

  useLayoutEffect(() => registerBar(dataKey), [dataKey, registerBar])

  const position = barKeys.indexOf(dataKey)

  if (position < 0) {
    return null
  }

  const slot = xScale.bandwidth() / barKeys.length
  const gap = barKeys.length > 1 ? Math.min(2, slot * 0.1) : 0
  const baseline = Math.min(Math.max(yScale(0), 0), innerHeight)

  return (
    <g
      {...props}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-chart__bars', className)}
      style={seriesStyle(style, series.color)}
    >
      {data.map((datum, index) => {
        const value = readValue(datum, dataKey)

        if (value === null) {
          return null
        }

        const top = yScale(value)
        const grows = top <= baseline ? 'up' : 'down'

        return (
          <path
            key={index}
            className="frontier-chart__bar"
            d={buildBarPath(
              (xScale(index) ?? 0) + position * slot + gap / 2,
              Math.min(top, baseline),
              Math.max(0, slot - gap),
              Math.abs(top - baseline),
              radius,
              grows,
            )}
          />
        )
      })}
    </g>
  )
})

export const ChartLine = forwardRef<SVGGElement, TChartLineProps>(function ChartLine(
  { className, curve = 'monotone', dataKey, dots = false, style, ...props },
  ref,
) {
  const { yScale } = useChartPlot()
  const series = useChartSeries(dataKey)
  const points = usePoints(dataKey)

  return (
    <g
      {...props}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-chart__lines', className)}
      style={seriesStyle(style, series.color)}
    >
      <path className="frontier-chart__line" d={buildLinePath(points, yScale, curve)} />
      {dots &&
        points.map((point, index) =>
          point.value === null ? null : (
            <circle
              key={index}
              className="frontier-chart__dot"
              cx={point.x}
              cy={yScale(point.value)}
              r={3}
            />
          ),
        )}
      <ActivePoint points={points} />
    </g>
  )
})

export const ChartArea = forwardRef<SVGGElement, TChartAreaProps>(function ChartArea(
  { className, curve = 'monotone', dataKey, style, ...props },
  ref,
) {
  const { innerHeight, yScale } = useChartPlot()
  const series = useChartSeries(dataKey)
  const points = usePoints(dataKey)
  const baseline = Math.min(Math.max(yScale(0), 0), innerHeight)

  return (
    <g
      {...props}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-chart__areas', className)}
      style={seriesStyle(style, series.color)}
    >
      <path className="frontier-chart__area" d={buildAreaPath(points, yScale, baseline, curve)} />
      <path className="frontier-chart__line" d={buildLinePath(points, yScale, curve)} />
      <ActivePoint points={points} />
    </g>
  )
})
