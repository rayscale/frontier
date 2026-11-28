import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useChart, useChartPlot } from '../context.js'
import type { TChartXAxisProps, TChartYAxisProps } from '../types.js'

/** Narrowest room, in pixels, that one x label may take before some are skipped. */
const minLabelSpace = 40

export const ChartXAxis = forwardRef<SVGGElement, TChartXAxisProps>(function ChartXAxis(
  { className, tickFormat, ...props },
  ref,
) {
  const { labels } = useChart()
  const { innerHeight, innerWidth, xScale } = useChartPlot()
  const interval = Math.max(1, Math.ceil((labels.length * minLabelSpace) / Math.max(innerWidth, 1)))

  return (
    <g
      {...props}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-chart__axis', 'frontier-chart__axis--x', className)}
      transform={`translate(0 ${String(innerHeight)})`}
    >
      <line className="frontier-chart__axis-line" x1={0} x2={innerWidth} y1={0} y2={0} />
      {labels.map((label, index) =>
        index % interval === 0 ? (
          <text
            key={index}
            className="frontier-chart__tick"
            x={(xScale(index) ?? 0) + xScale.bandwidth() / 2}
            y={20}
            textAnchor="middle"
          >
            {tickFormat ? tickFormat(label, index) : label}
          </text>
        ) : null,
      )}
    </g>
  )
})

export const ChartYAxis = forwardRef<SVGGElement, TChartYAxisProps>(function ChartYAxis(
  { className, tickFormat, ticks = 5, ...props },
  ref,
) {
  const { yScale } = useChartPlot()

  return (
    <g
      {...props}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-chart__axis', 'frontier-chart__axis--y', className)}
    >
      {yScale.ticks(ticks).map((tick) => (
        <text
          key={tick}
          className="frontier-chart__tick"
          x={-10}
          y={yScale(tick)}
          textAnchor="end"
          dominantBaseline="middle"
        >
          {tickFormat ? tickFormat(tick) : tick.toLocaleString()}
        </text>
      ))}
    </g>
  )
})
