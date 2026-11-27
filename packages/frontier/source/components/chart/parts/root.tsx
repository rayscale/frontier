import { forwardRef, useMemo } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { chartContext } from '../context.js'
import { readLabel, resolveSeries } from '../helpers/series.js'
import type { TChartRootProps } from '../types.js'

export const ChartRoot = forwardRef<HTMLDivElement, TChartRootProps>(function ChartRoot(
  { className, config, data, xKey, ...props },
  ref,
) {
  const value = useMemo(
    () => ({
      data,
      labels: data.map((datum) => readLabel(datum, xKey)),
      series: resolveSeries(data, xKey, config),
      xKey,
    }),
    [config, data, xKey],
  )

  return (
    <chartContext.Provider value={value}>
      <div {...props} ref={ref} className={classNames('frontier-chart', className)} />
    </chartContext.Provider>
  )
})
