import { CircleX, FileText } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

const danger = 'var(--frontier-color-danger)'
const row = { alignItems: 'center', display: 'flex', gap: 8 } as const

export default function ColorsStatusAlone({ side }: TExampleProps): ReactElement {
  return side === 'do' ? (
    <div style={row}>
      <FileText aria-hidden="true" size={18} />
      <span>report.pdf</span>
      <CircleX aria-hidden="true" size={18} style={{ color: danger }} />
      <span style={{ color: danger }}>Upload failed</span>
    </div>
  ) : (
    <div style={row}>
      <span style={{ color: danger }}>report.pdf</span>
    </div>
  )
}
