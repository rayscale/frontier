import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button/button.js'

import { InputOTP } from './input-otp.js'

function VerifyExample() {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | undefined>()

  return (
    <form
      style={{ display: 'grid', gap: '16px' }}
      onSubmit={(event) => {
        event.preventDefault()
        setError(value === '123456' ? undefined : 'That code is not right. Try again.')
      }}
    >
      <InputOTP
        label="Verification code"
        description="Enter the 6-digit code we sent to your email."
        autoComplete="one-time-code"
        value={value}
        onValueChange={(next) => {
          setValue(next)
          setError(undefined)
        }}
        {...(error ? { error } : {})}
      />
      <Button type="submit" disabled={value.length < 6}>
        Verify
      </Button>
    </form>
  )
}

const meta = {
  title: 'Components/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Takes a short one-time code, one character per slot, over a single native input so typing, pasting, and autofill keep working.',
      },
    },
  },
  args: {
    label: 'Verification code',
    description: 'Enter the 6-digit code we sent to your email.',
  },
  argTypes: {
    length: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of characters in the code.',
    },
    groups: {
      control: 'object',
      description: 'Characters in each group; the sizes must add up to `length`.',
    },
    pattern: {
      control: 'text',
      description: 'Regular expression source each accepted character sequence must match.',
    },
    onValueChange: { control: false },
    onComplete: { control: false },
  },
} satisfies Meta<typeof InputOTP>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A six-digit code with a label and description.',
      },
    },
  },
}

export const Groups: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Splits the slots into groups with a divider to make a long code easier to read.',
      },
    },
  },
  args: {
    groups: [3, 3],
  },
}

export const Alphanumeric: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Accepts letters and digits by changing the pattern and the keyboard hint.',
      },
    },
  },
  args: {
    label: 'Recovery code',
    description: 'Letters and numbers only.',
    length: 8,
    groups: [4, 4],
    pattern: '^[a-zA-Z0-9]+$',
    inputMode: 'text',
  },
}

export const States: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A comparison of default, filled, read-only, disabled, and invalid states.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <InputOTP label="Default" />
      <InputOTP label="Filled" defaultValue="123456" />
      <InputOTP label="Read only" defaultValue="123456" readOnly />
      <InputOTP label="Disabled" defaultValue="123" disabled />
      <InputOTP label="Invalid" defaultValue="123456" error="That code is not right." />
    </div>
  ),
}

export const Verify: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Controlled in a form: the action stays disabled until the code is complete, and a wrong code shows an error.',
      },
    },
  },
  render: () => <VerifyExample />,
}
