import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Check, FileText, Settings, UserRound } from '../../icons/index.js'
import { Button } from '../button/button.js'

import { Stepper } from './stepper.js'

const panelStyle = {
  padding: 'var(--frontier-spacing-4)',
  border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
  borderRadius: 'var(--frontier-radius-lg)',
} as const

function WizardExample() {
  const [step, setStep] = useState(1)

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <Stepper.Root value={step} onValueChange={setStep}>
        <Stepper.List aria-label="Account setup">
          <Stepper.Item value={1}>
            <Stepper.Indicator />
            <Stepper.Title>Account</Stepper.Title>
          </Stepper.Item>
          <Stepper.Item value={2}>
            <Stepper.Indicator />
            <Stepper.Title>Profile</Stepper.Title>
          </Stepper.Item>
          <Stepper.Item value={3} disabled={step < 2}>
            <Stepper.Indicator />
            <Stepper.Title>Review</Stepper.Title>
          </Stepper.Item>
        </Stepper.List>
        <Stepper.Panel value={1} style={panelStyle}>
          Create your account and verify your email.
        </Stepper.Panel>
        <Stepper.Panel value={2} style={panelStyle}>
          Tell us a little about yourself.
        </Stepper.Panel>
        <Stepper.Panel value={3} style={panelStyle}>
          Check your details before you finish.
        </Stepper.Panel>
      </Stepper.Root>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
        <Button
          variant="outline"
          disabled={step === 1}
          onClick={() => {
            setStep(step - 1)
          }}
        >
          Back
        </Button>
        <Button
          disabled={step === 3}
          onClick={() => {
            setStep(step + 1)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows the steps of a process and where someone is in it, in a row or a column. Steps before the current one are completed, and passing `onValueChange` lets people select a step.',
      },
    },
  },
  args: {
    defaultValue: 2,
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction in which the steps are laid out.',
    },
    value: {
      control: { type: 'number', min: 1, max: 5 },
      description:
        'Step that is current, in controlled mode. A value past the last step completes all.',
    },
    defaultValue: { control: { type: 'number', min: 1, max: 5 } },
    completedLabel: { control: 'text' },
    onValueChange: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '32rem', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Numbered steps in a row, with the content of the current step below.',
      },
    },
  },
  render: (args) => (
    <Stepper.Root {...args}>
      <Stepper.List aria-label="Account setup">
        {[1, 2, 3, 4].map((value) => (
          <Stepper.Item key={value} value={value}>
            <Stepper.Indicator />
          </Stepper.Item>
        ))}
      </Stepper.List>
      <Stepper.Panel value={1} style={panelStyle}>
        <strong>Account</strong>
        <div>Create your account and verify your email.</div>
      </Stepper.Panel>
      <Stepper.Panel value={2} style={panelStyle}>
        <strong>Profile</strong>
        <div>Tell us a little about yourself.</div>
      </Stepper.Panel>
      <Stepper.Panel value={3} style={panelStyle}>
        <strong>Plan</strong>
        <div>Choose the plan that fits your team.</div>
      </Stepper.Panel>
      <Stepper.Panel value={4} style={panelStyle}>
        <strong>Review</strong>
        <div>Check your details before you finish.</div>
      </Stepper.Panel>
    </Stepper.Root>
  ),
}

export const Labeled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A title next to each indicator names the step.',
      },
    },
  },
  render: (args) => (
    <Stepper.Root {...args}>
      <Stepper.List aria-label="Checkout">
        {['Cart', 'Shipping', 'Payment', 'Review'].map((title, index) => (
          <Stepper.Item key={title} value={index + 1}>
            <Stepper.Indicator />
            <Stepper.Title>{title}</Stepper.Title>
          </Stepper.Item>
        ))}
      </Stepper.List>
    </Stepper.Root>
  ),
}

export const Icons: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Children of `Stepper.Indicator` replace the number and the check mark, so each step can carry its own icon.',
      },
    },
  },
  args: {
    defaultValue: 2,
  },
  render: (args) => (
    <Stepper.Root {...args}>
      <Stepper.List aria-label="Account setup">
        <Stepper.Item value={1}>
          <Stepper.Indicator>
            <UserRound />
          </Stepper.Indicator>
          <Stepper.Title>Account</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Stepper.Indicator>
            <FileText />
          </Stepper.Indicator>
          <Stepper.Title>Details</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Stepper.Indicator>
            <Settings />
          </Stepper.Indicator>
          <Stepper.Title>Settings</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={4}>
          <Stepper.Indicator>
            <Check />
          </Stepper.Indicator>
          <Stepper.Title>Done</Stepper.Title>
        </Stepper.Item>
      </Stepper.List>
    </Stepper.Root>
  ),
}

export const Vertical: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Stacks the steps in a column with `orientation="vertical"`, with a description under each title and the current content beside the list.',
      },
    },
  },
  args: {
    orientation: 'vertical',
    defaultValue: 3,
  },
  render: (args) => (
    <Stepper.Root {...args}>
      <Stepper.List aria-label="Order status">
        <Stepper.Item value={1}>
          <Stepper.Indicator />
          <Stepper.Title>Order placed</Stepper.Title>
          <Stepper.Description>Your order has been placed</Stepper.Description>
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Stepper.Indicator />
          <Stepper.Title>Processing</Stepper.Title>
          <Stepper.Description>We are preparing your items</Stepper.Description>
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Stepper.Indicator />
          <Stepper.Title>Shipped</Stepper.Title>
          <Stepper.Description>Your order is on its way</Stepper.Description>
        </Stepper.Item>
        <Stepper.Item value={4}>
          <Stepper.Indicator />
          <Stepper.Title>Delivered</Stepper.Title>
          <Stepper.Description>Delivered to your address</Stepper.Description>
        </Stepper.Item>
      </Stepper.List>
      <Stepper.Panel value={3} style={panelStyle}>
        <strong>Shipped</strong>
        <div>Your order is on its way to you.</div>
      </Stepper.Panel>
    </Stepper.Root>
  ),
}

export const Interactive: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Controlled by the page. Passing `onValueChange` makes the steps selectable, and a disabled step cannot be chosen until the one before it is done.',
      },
    },
  },
  render: () => <WizardExample />,
}
