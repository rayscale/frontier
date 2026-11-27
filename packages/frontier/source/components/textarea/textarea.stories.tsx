import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Textarea } from './textarea.js'

function CounterExample() {
  const [value, setValue] = useState('')
  const limit = 140

  return (
    <Textarea
      label="Bio"
      value={value}
      maxLength={limit}
      description={`${String(value.length)} of ${String(limit)} characters used.`}
      onChange={(event) => {
        setValue(event.target.value)
      }}
    />
  )
}

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A multi-line text field with a label, a description, and an error that stay with the control. It renders a native `<textarea>`.',
      },
    },
  },
  args: {
    label: 'Message',
    placeholder: 'Write your message',
    description: 'We reply within one business day.',
  },
  argTypes: {
    resize: {
      control: 'inline-radio',
      options: ['vertical', 'none'],
      description: 'Whether people can drag the corner to change the height.',
    },
    autoSize: {
      control: 'boolean',
      description: 'Grows and shrinks the field with its content. Needs `field-sizing` support.',
    },
    rows: { control: { type: 'number', min: 1, max: 20 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '24rem', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A textarea with a label and a description.',
      },
    },
  },
}

export const FixedHeight: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Turns off the resize corner so the height stays at the number of `rows`.',
      },
    },
  },
  args: {
    resize: 'none',
    rows: 4,
  },
}

export const AutoSize: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Grows with the content as people type. Browsers without `field-sizing` keep `rows`.',
      },
    },
  },
  args: {
    autoSize: true,
    description: 'The field grows as you write.',
  },
}

export const Counter: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Uses the description to show how much of a character limit is left.',
      },
    },
  },
  render: () => <CounterExample />,
}

export const States: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A comparison of default, disabled, read-only, and invalid states.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <Textarea label="Default" placeholder="Write something" />
      <Textarea label="Disabled" placeholder="Unavailable" disabled />
      <Textarea label="Read only" value="Locked value" readOnly />
      <Textarea label="Invalid" defaultValue="Hi" error="Write at least 10 characters." />
    </div>
  ),
}
