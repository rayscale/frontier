import { Folder, Inbox } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function HierarchyAlignment({ side }: TExampleProps): ReactElement {
  const rows = [
    { Symbol: Folder, label: 'Documents' },
    { Symbol: undefined, label: 'Notes' },
    { Symbol: Inbox, label: 'Inbox' },
  ]

  return (
    <div style={{ display: 'grid', gap: 4, width: '100%' }}>
      {rows.map(({ Symbol, label }) => (
        <div
          key={label}
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: '0.875rem',
            gap: 8,
            padding: '6px 12px',
          }}
        >
          {Symbol ? <Symbol aria-hidden="true" size={16} /> : null}
          {!Symbol && side === 'do' ? <span style={{ height: 16, width: 16 }} /> : null}
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
