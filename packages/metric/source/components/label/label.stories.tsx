import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../../index.js'

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Names a control and makes its text part of the control.',
      },
    },
  },
  args: {
    children: 'Your email address',
  },
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'The id of the control the label names.',
    },
  },
} satisfies Meta<typeof Label>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Shows a label on its own.',
      },
    },
  },
}

export const AssociatedControl: TStory = {
  name: 'Associated control',
  parameters: {
    docs: {
      description: {
        story: 'Names a native field, so clicking the text moves focus into it.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--metric-spacing-2)' }}>
      <Label htmlFor="label-story-email">Your email address</Label>
      <input
        id="label-story-email"
        style={{
          boxSizing: 'border-box',
          height: 'var(--metric-control-height)',
          paddingInline: 'var(--metric-spacing-3)',
          border: 'var(--metric-border-width) solid var(--metric-color-border)',
          background: 'var(--metric-color-page)',
          color: 'var(--metric-color-text)',
          fontFamily: 'var(--metric-font-family-sans)',
          fontSize: 'var(--metric-font-size-sm)',
        }}
        type="email"
      />
    </div>
  ),
}
