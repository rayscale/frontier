import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { CheckCircle, CircleX, Info, TriangleAlert } from '../../icons/index.js'
import { Button } from '../button/button.js'

import { Callout } from './callout.js'

const meta = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning', 'danger'],
    },
    role: {
      control: 'inline-radio',
      options: ['note', 'status', 'alert'],
    },
  },
  args: {
    tone: 'info',
    role: 'note',
  },
  decorators: [
    (TStory) => (
      <div style={{ width: 520 }}>
        <TStory />
      </div>
    ),
  ],
  render: (args) => (
    <Callout {...args}>
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>Workspace settings changed</Callout.Title>
        <p>Changes apply to every project in this workspace.</p>
      </Callout.Content>
    </Callout>
  ),
} satisfies Meta<typeof Callout>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: { docs: { description: { story: 'Shows the default example of the callout.' } } },
}

const tones = [
  { tone: 'info', icon: <Info aria-hidden="true" />, title: 'Information' },
  {
    tone: 'success',
    icon: <CheckCircle aria-hidden="true" />,
    title: 'Changes saved',
  },
  {
    tone: 'warning',
    icon: <TriangleAlert aria-hidden="true" />,
    title: 'Review required',
  },
  {
    tone: 'danger',
    icon: <CircleX aria-hidden="true" />,
    title: 'Something went wrong',
  },
] as const

export const Tones: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Each tone maps to the matching semantic color tokens.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {tones.map(({ tone, icon, title }) => (
        <Callout key={tone} tone={tone}>
          <Callout.Icon>{icon}</Callout.Icon>
          <Callout.Content>
            <Callout.Title>{title}</Callout.Title>
            <p>This message uses the {tone} tone.</p>
          </Callout.Content>
        </Callout>
      ))}
    </div>
  ),
}

export const WithActions: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Actions sit beside the message and wrap on narrow screens.',
      },
    },
  },
  render: () => (
    <Callout tone="warning">
      <Callout.Icon>
        <TriangleAlert aria-hidden="true" />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>Unsaved changes</Callout.Title>
        <p>Save your changes before leaving this page.</p>
      </Callout.Content>
      <Callout.Actions>
        <Button size="small" variant="secondary">
          Discard
        </Button>
        <Button size="small">Save</Button>
      </Callout.Actions>
    </Callout>
  ),
}

export const Alert: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Use role alert only for urgent messages that should interrupt assistive technology.',
      },
    },
  },
  render: () => (
    <Callout role="alert" tone="danger">
      <Callout.Icon>
        <CircleX aria-hidden="true" />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>Connection lost</Callout.Title>
        <p>Reconnect before continuing.</p>
      </Callout.Content>
    </Callout>
  ),
}

function DismissibleExample() {
  const [visible, setVisible] = useState(true)

  return visible ? (
    <Callout
      tone="success"
      role="status"
      onDismiss={() => {
        setVisible(false)
      }}
    >
      <Callout.Icon>
        <CheckCircle />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>Changes saved</Callout.Title>
        <p>Your settings are up to date.</p>
      </Callout.Content>
    </Callout>
  ) : (
    <Button
      variant="outline"
      onClick={() => {
        setVisible(true)
      }}
    >
      Show the message again
    </Button>
  )
}

export const Dismissible: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass `onDismiss` to show a button in the corner. The callout does not hide itself: remove it in the handler.',
      },
    },
  },
  render: () => <DismissibleExample />,
}
