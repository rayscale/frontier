import { Tree } from '@rayscale/frontier'
import { type ReactElement, useState } from 'react'

import type { TExampleProps } from '../types.js'

const items = [
  { id: 'overview', label: 'Overview', href: '#' },
  {
    id: 'components',
    label: 'Components',
    children: [
      { id: 'button', label: 'Button', href: '#' },
      { id: 'input', label: 'Input', href: '#' },
    ],
  },
  { id: 'tokens', label: 'Tokens', href: '#' },
]

const flat = [
  { id: 'overview', label: 'Overview', level: 0 },
  { id: 'button', label: 'Button', level: 1 },
  { id: 'input', label: 'Input', level: 1 },
  { id: 'tokens', label: 'Tokens', level: 0 },
]

export default function HierarchyCurrent({ side }: TExampleProps): ReactElement {
  const [activeId, setActiveId] = useState('button')

  return (
    <div style={{ minWidth: 200 }}>
      {side === 'do' ? (
        <Tree
          aria-label="Choose a page"
          items={items}
          activeId={activeId}
          defaultExpandedIds={['components']}
          onClickCapture={(event) => {
            if (event.target instanceof Element && event.target.closest('a')) {
              event.preventDefault()
            }
          }}
          onNavigate={(node) => {
            setActiveId(node.id)
          }}
        />
      ) : (
        <ul style={{ display: 'grid', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
          {flat.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                style={{
                  background:
                    item.id === activeId
                      ? 'var(--frontier-color-surface-highlight)'
                      : 'transparent',
                  border: 'none',
                  borderInlineStart:
                    item.id === activeId
                      ? '2px solid var(--frontier-color-primary)'
                      : '2px solid transparent',
                  borderRadius: 'var(--frontier-radius-sm)',
                  color: 'var(--frontier-color-text)',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: '0.875rem',
                  padding: '8px 12px',
                  paddingInlineStart: 12 + item.level * 20,
                  textAlign: 'start',
                  width: '100%',
                }}
                onClick={() => {
                  setActiveId(item.id)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
