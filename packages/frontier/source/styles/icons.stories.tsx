import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

import { Check, Plus, Search, X } from '../index.js'

const meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Draws the frontier icon set on a 24-unit grid with round caps and joins.',
      },
    },
  },
} satisfies Meta

export default meta

type TStory = StoryObj<typeof meta>

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--frontier-spacing-6)',
  color: 'var(--frontier-color-text)',
}

const labelStyle: CSSProperties = {
  color: 'var(--frontier-color-text-muted)',
  fontFamily: 'var(--frontier-font-family-mono)',
  fontSize: 'var(--frontier-font-size-xs)',
}

const nameStyle: CSSProperties = {
  ...labelStyle,
  minWidth: '5rem',
}

const cellStyle: CSSProperties = {
  display: 'grid',
  justifyItems: 'center',
  gap: 'var(--frontier-spacing-2)',
  minWidth: '5rem',
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--frontier-spacing-6)',
}

const sizes = ['inline', 'control', 'standalone'] as const

const iconSet = [
  { Icon: Check, name: 'check' },
  { Icon: Plus, name: 'plus' },
  { Icon: Search, name: 'search' },
  { Icon: X, name: 'x' },
]

export const icons: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Shows the set at the inline, control, and standalone sizes.',
      },
    },
  },
  render: () => (
    <div style={gridStyle}>
      <div style={rowStyle}>
        <span style={nameStyle} />
        {sizes.map((size) => (
          <div key={size} style={cellStyle}>
            <code style={labelStyle}>{size}</code>
          </div>
        ))}
      </div>
      {iconSet.map(({ Icon, name }) => (
        <div key={name} style={rowStyle}>
          <code style={nameStyle}>{name}</code>
          {sizes.map((size) => (
            <div key={size} style={cellStyle}>
              <Icon size={size} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
