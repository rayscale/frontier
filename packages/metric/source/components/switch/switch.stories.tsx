import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from '../../index.js'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sets one independent value on or off with a sliding track.',
      },
    },
  },
  args: {
    label: 'Dark mode',
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible text that names the value and toggles it.',
    },
    description: {
      control: 'text',
      description: 'Helper text announced as the description of the switch.',
    },
    disabled: {
      control: 'boolean',
      description: 'Keeps the switch focusable while preventing a change.',
    },
    disabledReason: {
      control: 'text',
      description: 'Explains why the switch is unavailable. Replaces the description.',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Switch>

export default meta

type TStory = StoryObj<typeof meta>

const columnStyle = {
  display: 'grid',
  justifyItems: 'start',
  gap: 'var(--metric-spacing-4)',
} as const

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Shows an off value with its label.',
      },
    },
  },
}

export const On: TStory = {
  name: 'On',
  parameters: {
    docs: {
      description: {
        story: 'Shows the track filled and the thumb at the end when the value is on.',
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
    description: 'Follows the system setting until you change it.',
  },
}

export const Disabled: TStory = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Keeps the switch focusable and explains why it cannot change.',
      },
    },
  },
  args: {
    disabled: true,
    disabledReason: 'Your plan does not include this setting.',
  },
}

export const Settings: TStory = {
  name: 'Settings',
  parameters: {
    docs: {
      description: {
        story: 'Composes independent values with mixed states.',
      },
    },
  },
  render: () => (
    <div style={columnStyle}>
      <Switch defaultChecked label="Dark mode" />
      <Switch label="Reduce motion" description="Follows the system setting." />
      <Switch label="Automatic updates" />
    </div>
  ),
}
