import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

import { Check } from '../index.js'

const meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Draws the metric icon set on a 24-unit grid with square caps and joins.',
      },
    },
  },
} satisfies Meta

export default meta

type TStory = StoryObj<typeof meta>

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--metric-spacing-6)',
  color: 'var(--metric-color-text)',
}

const labelStyle: CSSProperties = {
  color: 'var(--metric-color-text-muted)',
  fontFamily: 'var(--metric-font-family-mono)',
  fontSize: 'var(--metric-font-size-xs)',
}

export const icons: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Shows the set at the inline, control, and standalone sizes.',
      },
    },
  },
  render: () => (
    <div style={rowStyle}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--metric-spacing-2)' }}>
        <Check size="inline" />
        <code style={labelStyle}>inline</code>
      </div>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--metric-spacing-2)' }}>
        <Check size="control" />
        <code style={labelStyle}>control</code>
      </div>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--metric-spacing-2)' }}>
        <Check size="standalone" />
        <code style={labelStyle}>standalone</code>
      </div>
    </div>
  ),
}
