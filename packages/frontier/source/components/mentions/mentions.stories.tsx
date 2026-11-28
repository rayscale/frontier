import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useState } from 'react'

import { ArrowUp, Plus } from '../../icons/index.js'
import { Avatar } from '../avatar/avatar.js'
import { Button } from '../button/button.js'
import { InputGroup } from '../input-group/input-group.js'
import { Input } from '../input/input.js'
import { Textarea } from '../textarea/textarea.js'

import { Mentions } from './mentions.js'
import type { TMentionItem, TMentionTrigger } from './types.js'

const people: readonly TMentionItem[] = [
  { id: 'ana', label: 'Ana García', description: 'ana@example.com', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', description: 'ben@example.com', insert: '@ben' },
  { id: 'carla', label: 'Carla Núñez', description: 'carla@example.com', insert: '@carla' },
  { id: 'dev', label: 'Dev Patel', description: 'dev@example.com', insert: '@dev' },
  {
    id: 'eli',
    label: 'Eli Brooks',
    description: 'eli@example.com',
    insert: '@eli',
    disabled: true,
  },
]

const commands: readonly TMentionItem[] = [
  {
    id: 'summarize',
    label: 'summarize',
    description: 'Sum up the conversation',
    insert: '/summarize',
  },
  {
    id: 'translate',
    label: 'translate',
    description: 'Translate the message',
    insert: '/translate',
  },
  { id: 'clear', label: 'clear', description: 'Start a new conversation', insert: '/clear' },
]

const triggers: readonly TMentionTrigger[] = [
  { char: '@', items: people, label: 'People' },
  { char: '/', items: commands, atStart: true, label: 'Commands' },
]

function withAvatars(items: readonly TMentionItem[]): readonly TMentionItem[] {
  return items.map((item) => ({
    ...item,
    icon: (
      <Avatar size="small">
        <Avatar.Fallback>{item.label.slice(0, 1)}</Avatar.Fallback>
      </Avatar>
    ),
  }))
}

function ChatExample() {
  const [value, setValue] = useState('')
  const withIcons = useMemo<readonly TMentionTrigger[]>(
    () => [
      { char: '@', items: withAvatars(people), label: 'People' },
      { char: '/', items: commands, atStart: true, label: 'Commands' },
    ],
    [],
  )

  return (
    <Mentions triggers={withIcons}>
      <InputGroup label="Message" description="Type @ to mention someone, or / for a command.">
        <InputGroup.Textarea
          placeholder="Write a message…"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
        />
        <InputGroup.Addon align="bottom">
          <Button variant="outline" size="icon-small" aria-label="Attach a file">
            <Plus aria-hidden="true" />
          </Button>
          <Button
            size="icon-small"
            aria-label="Send"
            disabled={value.length === 0}
            style={{ marginInlineStart: 'auto' }}
          >
            <ArrowUp aria-hidden="true" />
          </Button>
        </InputGroup.Addon>
      </InputGroup>
    </Mentions>
  )
}

function RemoteExample() {
  const [query, setQuery] = useState('')
  const results = useMemo(
    () => people.filter((person) => person.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <Mentions
      triggers={[{ char: '@', items: results, filter: false, label: 'People' }]}
      onQueryChange={setQuery}
    >
      <Textarea label="Comment" description="The list comes from a search of your own." />
    </Mentions>
  )
}

const meta = {
  title: 'Components/Mentions',
  component: Mentions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Opens a list of choices when people type a trigger such as `@` or `/` in a text field, and puts the one they choose into the text. Wrap any text field with it.',
      },
    },
  },
  args: {
    triggers,
    children: <Textarea label="Message" />,
  },
  argTypes: {
    triggers: { control: false },
    children: { control: false },
    onSelect: { control: false },
    onQueryChange: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '24rem', maxWidth: '100%', minHeight: '20rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Mentions>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Type `@` to mention someone. Type `/` at the start for a command. The arrow keys move, Enter or Tab choose, and Escape closes.',
      },
    },
  },
  render: (args) => (
    <Mentions {...args}>
      <Textarea label="Message" placeholder="Try @ or /" />
    </Mentions>
  ),
}

export const InAChatBox: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrap an `InputGroup` to add mentions to a message box with controls. The list opens at the cursor.',
      },
    },
  },
  render: () => <ChatExample />,
}

export const SingleLine: TStory = {
  parameters: {
    docs: { description: { story: 'It works with a single line `Input` too.' } },
  },
  render: (args) => (
    <Mentions {...args}>
      <Input label="Assign to" placeholder="Type @" />
    </Mentions>
  ),
}

export const OwnSearch: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Set `filter` to `false` and use `onQueryChange` to show results from your own search, such as a server.',
      },
    },
  },
  render: () => <RemoteExample />,
}
