import { max, min } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import {
  forwardRef,
  type ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { omitUndefined } from '../../../internal/helpers/omit-undefined.js'
import { chartPlotContext, useChart } from '../context.js'
import { readValue } from '../helpers/series.js'
import type { TChartMargin, TChartPlotProps } from '../types.js'

import '../../../internal/styles/visually-hidden.css'

const defaultMargin: TChartMargin = { bottom: 32, left: 48, right: 12, top: 12 }

function isNumber(value: number | null): value is number {
  return value !== null
}

export const ChartPlot = forwardRef<HTMLDivElement, TChartPlotProps>(function ChartPlot(
  {
    'aria-label': ariaLabel,
    children,
    className,
    height = 280,
    margin,
    width: fixedWidth,
    yDomain,
    ...props
  },
  ref,
) {
  const chart = useChart()
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [measuredWidth, setMeasuredWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [barKeys, setBarKeys] = useState<readonly string[]>([])

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      setElement(node)

      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  useLayoutEffect(() => {
    if (!element || fixedWidth !== undefined) {
      return undefined
    }

    setMeasuredWidth(element.getBoundingClientRect().width)
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (entry) {
        setMeasuredWidth(entry.contentRect.width)
      }
    })
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [element, fixedWidth])

  const registerBar = useCallback((key: string) => {
    setBarKeys((keys) => (keys.includes(key) ? keys : [...keys, key]))

    return () => {
      setBarKeys((keys) => keys.filter((item) => item !== key))
    }
  }, [])

  const resolvedMargin = { ...defaultMargin, ...omitUndefined(margin ?? {}) }
  const width = fixedWidth ?? measuredWidth
  const innerWidth = Math.max(0, width - resolvedMargin.left - resolvedMargin.right)
  const innerHeight = Math.max(0, height - resolvedMargin.top - resolvedMargin.bottom)

  const xScale = useMemo(
    () =>
      scaleBand<number>()
        .domain(chart.labels.map((_, index) => index))
        .range([0, innerWidth])
        .paddingInner(0.3)
        .paddingOuter(0.15),
    [chart.labels, innerWidth],
  )

  const yScale = useMemo(() => {
    const values = chart.data
      .flatMap((datum) => chart.series.map((series) => readValue(datum, series.key)))
      .filter(isNumber)
    const low = yDomain?.[0] ?? Math.min(0, min(values) ?? 0)
    const high = yDomain?.[1] ?? Math.max(0, max(values) ?? 0)
    const scale = scaleLinear()
      .domain(low === high ? [low, low + 1] : [low, high])
      .range([innerHeight, 0])

    return yDomain ? scale : scale.nice()
  }, [chart.data, chart.series, innerHeight, yDomain])

  const value = {
    activeIndex,
    barKeys,
    height,
    innerHeight,
    innerWidth,
    margin: resolvedMargin,
    registerBar,
    setActiveIndex,
    width,
    xScale,
    yScale,
  }

  return (
    <chartPlotContext.Provider value={value}>
      <div {...props} ref={setRefs} className={classNames('frontier-chart__plot', className)}>
        {width > 0 && (
          <svg
            role="img"
            aria-label={ariaLabel}
            className="frontier-chart__svg"
            width={width}
            height={height}
          >
            <g
              transform={`translate(${String(resolvedMargin.left)} ${String(resolvedMargin.top)})`}
            >
              {activeIndex !== null && (
                <rect
                  className="frontier-chart__cursor"
                  x={activeIndex * xScale.step()}
                  y={0}
                  width={xScale.step()}
                  height={innerHeight}
                />
              )}
              {children}
            </g>
          </svg>
        )}
        <ChartTable label={ariaLabel} />
      </div>
    </chartPlotContext.Provider>
  )
})

function ChartTable({ label }: { label: string | undefined }): ReactElement {
  const { data, labels, series, xKey } = useChart()

  return (
    <table className="frontier-chart__table frontier-visually-hidden">
      {label && <caption>{label}</caption>}
      <thead>
        <tr>
          <th scope="col">{xKey}</th>
          {series.map((item) => (
            <th key={item.key} scope="col">
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((datum, index) => (
          <tr key={index}>
            <th scope="row">{labels[index]}</th>
            {series.map((item) => (
              <td key={item.key}>{readValue(datum, item.key) ?? ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
