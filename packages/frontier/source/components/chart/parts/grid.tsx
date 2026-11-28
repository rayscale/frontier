import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useChartPlot } from '../context.js'
import type { TChartGridProps } from '../types.js'

export const ChartGrid = forwardRef<SVGGElement, TChartGridProps>(function ChartGrid(
  { className, horizontal = true, ticks = 5, vertical = false, ...props },
  ref,
) {
  const { innerHeight, innerWidth, xScale, yScale } = useChartPlot()
  const centers = xScale.domain().map((index) => (xScale(index) ?? 0) + xScale.bandwidth() / 2)

  return (
    <g
      {...props}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-chart__grid', className)}
    >
      {horizontal &&
        yScale
          .ticks(ticks)
          .map((tick) => (
            <line
              key={`y-${String(tick)}`}
              x1={0}
              x2={innerWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
            />
          ))}
      {vertical &&
        centers.map((center, index) => (
          <line key={`x-${String(index)}`} x1={center} x2={center} y1={0} y2={innerHeight} />
        ))}
    </g>
  )
})
