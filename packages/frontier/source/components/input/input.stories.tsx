import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Input, Search, X } from '../../index.js'

function ClearableSearchExample() {
  const [value, setValue] = useState('Frontier')

  return (
    <Input
      label="Search"
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
      leadingIcon={<Search size="control" />}
      trailingIcon={
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue('')
          }}
          style={{
            padding: 0,
            border: 0,
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          <X size="control" />
        </button>
      }
      trailingIconInteractive
    />
  )
}

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Collects a single line of text with an optional label, description, error, and leading or trailing content.',
      },
    },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number', 'tel', 'url'],
    },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    leadingIconInteractive: { control: false },
    trailingIconInteractive: { control: false },
  },
} satisfies Meta<typeof Input>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Shows a labeled text input.',
      },
    },
  },
}

export const Description: TStory = {
  name: 'Description',
  parameters: {
    docs: {
      description: {
        story: 'Adds helper text under the box.',
      },
    },
  },
  args: {
    description: 'We only use this to contact you.',
  },
}

export const Error: TStory = {
  name: 'Error',
  parameters: {
    docs: {
      description: {
        story: 'An error message marks the input invalid and is announced.',
      },
    },
  },
  args: {
    defaultValue: 'not-an-email',
    error: 'Enter a valid email.',
  },
}

export const Disabled: TStory = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Keeps the input focusable and read-only, and shows why it is unavailable.',
      },
    },
  },
  args: {
    defaultValue: 'alex@example.com',
    disabled: true,
    disabledReason: 'Your plan does not include email.',
  },
}

export const ReadOnly: TStory = {
  name: 'Read only',
  parameters: {
    docs: {
      description: {
        story: 'Keeps the value focusable and selectable without editing.',
      },
    },
  },
  args: {
    defaultValue: 'alex@example.com',
    readOnly: true,
  },
}

export const Icons: TStory = {
  name: 'Icons',
  parameters: {
    docs: {
      description: {
        story: 'Shows decorative leading and trailing content.',
      },
    },
  },
  args: {
    label: 'Search',
    placeholder: 'Search your projects',
    leadingIcon: <Search size="control" />,
    trailingIcon: <X size="control" />,
  },
}

export const Clearable: TStory = {
  name: 'Clearable',
  parameters: {
    docs: {
      description: {
        story: 'Shows an interactive trailing control that clears the value.',
      },
    },
  },
  render: () => <ClearableSearchExample />,
}
