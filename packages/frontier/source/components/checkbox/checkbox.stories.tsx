import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '../../index.js'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sets one independent value on or off with a mark.',
      },
    },
  },
  args: {
    label: 'Send me product updates',
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible text that names the value and toggles it.',
    },
    description: {
      control: 'text',
      description: 'Helper text announced as the description of the checkbox.',
    },
    disabled: {
      control: 'boolean',
      description: 'Keeps the checkbox focusable while preventing a change.',
    },
    disabledReason: {
      control: 'text',
      description: 'Explains why the checkbox is unavailable. Replaces the description.',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type TStory = StoryObj<typeof meta>

const columnStyle = {
  display: 'grid',
  justifyItems: 'start',
  gap: 'var(--frontier-spacing-4)',
} as const

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Shows an unchecked value with its label.',
      },
    },
  },
}

export const Checked: TStory = {
  name: 'Checked',
  parameters: {
    docs: {
      description: {
        story: 'Shows the mark filled when the value is on.',
      },
    },
  },
  args: {
    defaultChecked: true,
  },
}

export const Description: TStory = {
  name: 'Description',
  parameters: {
    docs: {
      description: {
        story: 'Adds helper text under the label without changing the accessible name.',
      },
    },
  },
  args: {
    description: 'No more than one message a week.',
  },
}

export const Disabled: TStory = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Keeps the checkbox focusable and explains why it cannot change.',
      },
    },
  },
  args: {
    disabled: true,
    disabledReason: 'You need permission to change notifications.',
  },
}

export const Group: TStory = {
  name: 'Group',
  parameters: {
    docs: {
      description: {
        story: 'Composes independent values, each with its own state.',
      },
    },
  },
  render: () => (
    <div style={columnStyle}>
      <Checkbox defaultChecked label="Product updates" />
      <Checkbox label="Release notes" />
      <Checkbox label="Security alerts" />
    </div>
  ),
}
