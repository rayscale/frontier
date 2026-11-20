import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { RadioGroup } from '../../index.js'

const plans = (
  <>
    <RadioGroup.Item value="free" label="Free" />
    <RadioGroup.Item value="pro" label="Pro" description="For growing teams." />
  </>
)

function ControlledExample() {
  const [value, setValue] = useState('pro')

  return (
    <RadioGroup
      label="Plan"
      description={`Selected: ${value}`}
      value={value}
      onValueChange={setValue}
    >
      {plans}
    </RadioGroup>
  )
}

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Selects one value out of several with native radio options.',
      },
    },
  },
  args: {
    children: null,
    label: 'Plan',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible group name, rendered as the legend.',
    },
    description: {
      control: 'text',
      description: 'Helper text announced as the description of the group.',
    },
    error: {
      control: 'text',
      description: 'Message that marks the group invalid and is announced.',
    },
    invalid: {
      control: 'boolean',
      description: 'Marks the group invalid without showing a message.',
    },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction of the options.',
    },
    required: {
      control: 'boolean',
      description: 'Requires one option to be selected.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables every option and requires a reason.',
    },
    disabledReason: {
      control: 'text',
      description: 'Explains why the group is unavailable. Replaces the description.',
    },
    onValueChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Shows a labeled group with one selected option.',
      },
    },
  },
  args: {
    children: plans,
    defaultValue: 'pro',
  },
}

export const Horizontal: TStory = {
  name: 'Horizontal',
  parameters: {
    docs: {
      description: {
        story: 'Lays the options out along one row.',
      },
    },
  },
  args: {
    children: plans,
    orientation: 'horizontal',
  },
}

export const Description: TStory = {
  name: 'Description',
  parameters: {
    docs: {
      description: {
        story: 'Adds helper text for the group and for an option.',
      },
    },
  },
  args: {
    children: plans,
  },
}

export const Error: TStory = {
  name: 'Error',
  parameters: {
    docs: {
      description: {
        story: 'An error message marks the group invalid and is announced.',
      },
    },
  },
  args: {
    children: plans,
    error: 'Choose a plan.',
  },
}

export const DisabledGroup: TStory = {
  name: 'Disabled group',
  parameters: {
    docs: {
      description: {
        story: 'Disables every option and explains why in place of the description.',
      },
    },
  },
  args: {
    children: plans,
    defaultValue: 'pro',
    disabled: true,
    disabledReason: 'Your plan is managed by your admin.',
    description: 'Cancel whenever you want.',
  },
}

export const DisabledOption: TStory = {
  name: 'Disabled option',
  parameters: {
    docs: {
      description: {
        story: 'Keeps one option visible and unselectable while the rest stay active.',
      },
    },
  },
  args: {
    children: (
      <>
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item
          value="pro"
          label="Pro"
          disabled
          disabledReason="Ask your admin to enable it."
        />
      </>
    ),
  },
}

export const Required: TStory = {
  name: 'Required',
  parameters: {
    docs: {
      description: {
        story: 'Marks every option required and shows the required marker.',
      },
    },
  },
  args: {
    children: plans,
    required: true,
  },
}

export const Controlled: TStory = {
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'Shows a group whose selection is owned by the surface.',
      },
    },
  },
  render: () => <ControlledExample />,
}
