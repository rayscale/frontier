import { ChevronDown } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

const rowStyle = {
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.875rem',
  gap: 8,
  padding: '6px 12px',
} as const

export default function HierarchyDisclosure({ side }: TExampleProps): ReactElement {
  return (
    <div style={{ display: 'grid', gap: 4, width: '100%' }}>
      <div style={rowStyle}>
        <ChevronDown aria-hidden="true" size={16} />
        <span>Components</span>
        {side === 'dont' ? (
          <span style={{ color: 'var(--frontier-color-text-muted)', marginInlineStart: 'auto' }}>
            opens and goes to the page
          </span>
        ) : null}
      </div>
      {side === 'do' ? (
        <>
          <div style={{ ...rowStyle, paddingInlineStart: 36 }}>Overview</div>
          <div style={{ ...rowStyle, paddingInlineStart: 36 }}>Button</div>
        </>
      ) : null}
    </div>
  )
}
