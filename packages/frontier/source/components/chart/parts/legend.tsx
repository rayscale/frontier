import { type CSSProperties, forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useChart } from '../context.js'
import type { TChartLegendProps } from '../types.js'

export const ChartLegend = forwardRef<HTMLUListElement, TChartLegendProps>(function ChartLegend(
  { className, ...props },
  ref,
) {
  const { series } = useChart()

  return (
    <ul {...props} ref={ref} className={classNames('frontier-chart__legend', className)}>
      {series.map((item) => {
        const style: CSSProperties & TCssCustomProperties = { '--_series-color': item.color }

        return (
          <li key={item.key} className="frontier-chart__legend-item" style={style}>
            <span className="frontier-chart__swatch" aria-hidden="true" />
            {item.label}
          </li>
        )
      })}
    </ul>
  )
})
