import { type ReactElement, useState } from 'react'

import { glyphs, metrics } from './metrics.js'

const size = 360
const baseline = 400

/** One large glyph drawn between its metric guides, beside a grid to pick another. */
export function GlyphExplorer(): ReactElement {
  const [selected, setSelected] = useState('A')

  return (
    <div className="glyph-explorer">
      <svg
        className="glyph-explorer__stage"
        viewBox={`0 0 600 ${String(baseline + 120)}`}
        role="img"
        aria-label={`The character ${selected}, drawn between the metric guides`}
      >
        {metrics.map((metric) => {
          const y = baseline - (metric.value / 1000) * size

          return (
            <g key={metric.name}>
              <line className="glyph-explorer__guide" x1="0" x2="600" y1={y} y2={y} />
              <text className="glyph-explorer__label" x="8" y={y - 8}>
                {metric.name.toUpperCase()}
              </text>
              <text className="glyph-explorer__label" textAnchor="end" x="592" y={y - 8}>
                {metric.value}
              </text>
            </g>
          )
        })}
        <text
          className="glyph-explorer__glyph"
          x="300"
          y={baseline}
          fontSize={size}
          textAnchor="middle"
        >
          {selected}
        </text>
      </svg>
      <ul className="glyph-explorer__grid">
        {glyphs.map((glyph) => (
          <li key={glyph}>
            <button
              type="button"
              className="glyph-explorer__cell"
              aria-pressed={glyph === selected}
              aria-label={glyph}
              onClick={() => {
                setSelected(glyph)
              }}
            >
              {glyph}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
