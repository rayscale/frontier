import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function HierarchyDepth({ side }: TExampleProps): ReactElement {
  const items =
    side === 'do'
      ? ['Overview', 'Button', 'Input', 'Select', 'Tabs'].map((label) => ({ label, level: 0 }))
      : [
          { label: 'Components', level: 0 },
          { label: 'Actions', level: 1 },
          { label: 'Buttons', level: 2 },
          { label: 'Button', level: 3 },
          { label: 'Variants', level: 4 },
        ]

  return (
    <div style={{ display: 'grid', gap: 2, width: '100%' }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            fontSize: '0.875rem',
            padding: '4px 12px',
            paddingInlineStart: 12 + item.level * 20,
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
