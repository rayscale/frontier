import type { ReactElement } from 'react'

import { metrics } from './metrics.js'

const size = 470
const baseline = 455
const width = 1600

/** The family name set large between guides for the cap height, x-height, baseline, and descender. */
export function Wordmark(): ReactElement {
  return (
    <svg
      className="wordmark"
      viewBox={`0 0 ${String(width)} ${String(baseline + 120)}`}
      role="img"
      aria-label="Geist"
    >
      {metrics.map((metric) => {
        const y = baseline - (metric.value / 1000) * size

        return (
          <g key={metric.name}>
            <line className="wordmark__guide" x1="0" x2={width} y1={y} y2={y} />
            <text className="wordmark__label" x={width - 120} y={y - 8}>
              {metric.value}
            </text>
          </g>
        )
      })}
      <text className="wordmark__text" x="40" y={baseline} fontSize={size}>
        Geist.
      </text>
    </svg>
  )
}
