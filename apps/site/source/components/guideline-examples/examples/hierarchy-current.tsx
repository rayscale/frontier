import { Tree } from '@rayscale/frontier'
import { type ReactElement, useState } from 'react'

import type { TExampleProps } from '../types.js'

const items = [
  { id: 'overview', label: 'Overview', href: '#' },
  { id: 'button', label: 'Button', href: '#' },
  { id: 'input', label: 'Input', href: '#' },
  { id: 'select', label: 'Select', href: '#' },
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
          {items.map((item) => (
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
