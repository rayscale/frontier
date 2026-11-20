import type { CSSProperties, ReactElement } from 'react'

import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'

export function NumberFlowDigit({
  digit,
  glyphs,
}: {
  digit: number
  glyphs: readonly string[]
}): ReactElement {
  const style: CSSProperties & TCssCustomProperties = {
    '--_number-flow-digit': String(digit),
  }

  return (
    <span className="frontier-number-flow__digit" data-digit={digit}>
      <span className="frontier-number-flow__strip" style={style}>
        {glyphs.map((glyph, index) => (
          <span key={index} className="frontier-number-flow__glyph">
            {glyph}
          </span>
        ))}
      </span>
    </span>
  )
}
