import { type CSSProperties, type PointerEvent, type ReactElement, useState } from 'react'

import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { CursorCard } from '../../cursor-card/cursor-card.js'
import { useChart, useChartPlot } from '../context.js'
import { readValue } from '../helpers/series.js'
import type { TChartTooltipInfo, TChartTooltipProps } from '../types.js'

function formatValue(
  value: number | null,
  key: string,
  valueFormat: TChartTooltipProps['valueFormat'],
): string {
  if (value === null) {
    return '—'
  }

  return valueFormat ? valueFormat(value, key) : value.toLocaleString()
}

function DefaultContent({
  info,
  valueFormat,
}: {
  info: TChartTooltipInfo
  valueFormat: TChartTooltipProps['valueFormat']
}): ReactElement {
  return (
    <div className="frontier-chart__tooltip">
      <div className="frontier-chart__tooltip-label">{info.label}</div>
      <ul className="frontier-chart__tooltip-list">
        {info.items.map((item) => {
          const style: CSSProperties & TCssCustomProperties = { '--_series-color': item.color }

          return (
            <li key={item.key} className="frontier-chart__tooltip-item" style={style}>
              <span className="frontier-chart__swatch" aria-hidden="true" />
              <span className="frontier-chart__tooltip-name">{item.label}</span>
              <span className="frontier-chart__tooltip-value">
                {formatValue(item.value, item.key, valueFormat)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ChartTooltip({
  children,
  side = 'top',
  valueFormat,
  ...props
}: TChartTooltipProps): ReactElement {
  const chart = useChart()
  const { innerHeight, innerWidth, setActiveIndex, xScale } = useChartPlot()
  const [shownIndex, setShownIndex] = useState(0)
  const datum = chart.data[shownIndex]

  function track(event: PointerEvent<SVGRectElement>) {
    const step = xScale.step()

    if (!(step > 0) || chart.data.length === 0) {
      return
    }

    const x = event.clientX - event.currentTarget.getBoundingClientRect().left
    const index = Math.min(chart.data.length - 1, Math.max(0, Math.floor(x / step)))

    setShownIndex(index)
    setActiveIndex(index)
  }

  const info: TChartTooltipInfo | null = datum
    ? {
        datum,
        index: shownIndex,
        items: chart.series.map((series) => ({
          color: series.color,
          key: series.key,
          label: series.label,
          value: readValue(datum, series.key),
        })),
        label: chart.labels[shownIndex] ?? '',
      }
    : null

  return (
    <CursorCard followAxis="x">
      <CursorCard.Zone>
        <rect
          className="frontier-chart__zone"
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          onPointerMove={track}
          onPointerLeave={() => {
            setActiveIndex(null)
          }}
        />
      </CursorCard.Zone>
      <CursorCard.Content side={side} {...props}>
        {info &&
          (children ? children(info) : <DefaultContent info={info} valueFormat={valueFormat} />)}
      </CursorCard.Content>
    </CursorCard>
  )
}
