import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { ArrowUp, Plus } from '../../icons/index.js'
import { Avatar } from '../avatar/avatar.js'
import { Button } from '../button/button.js'

import { Mentions } from './mentions.js'
import type { TMentionItem, TMentionTrigger, TMentionValue } from './types.js'

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
  { id: 'summarize', label: 'summarize', description: 'Sum up the conversation' },
  { id: 'translate', label: 'translate', description: 'Translate the message' },
  { id: 'clear', label: 'clear', description: 'Start a new conversation' },
]

const triggers: readonly TMentionTrigger[] = [
  { char: '@', items: people, label: 'People' },
  { char: '/', items: commands, atStart: true, label: 'Commands' },
]

const peopleWithAvatars: readonly TMentionItem[] = people.map((person) => ({
  ...person,
  icon: (
    <Avatar size="small">
      <Avatar.Fallback>{person.label.slice(0, 1)}</Avatar.Fallback>
    </Avatar>
  ),
}))

function ChatExample() {
  const [value, setValue] = useState('')
  const [mentions, setMentions] = useState<readonly TMentionValue[]>([])
  const [sent, setSent] = useState('Nothing sent yet.')

  function send(): void {
    if (value.trim() === '') {
      return
    }

    setSent(`Sent “${value.trim()}” mentioning ${String(mentions.length)}.`)
    setValue('')
    setMentions([])
  }

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Mentions
        description="Enter sends. Shift and Enter starts a new line."
        footer={
          <>
            <Button variant="outline" size="icon-small" aria-label="Attach a file">
              <Plus aria-hidden="true" />
            </Button>
            <Button
              size="icon-small"
              aria-label="Send"
              disabled={value.trim() === ''}
              style={{ marginInlineStart: 'auto' }}
              onClick={send}
            >
              <ArrowUp aria-hidden="true" />
            </Button>
          </>
        }
        label="Message"
        placeholder="Write a message…"
        rows={2}
        triggers={[
          { char: '@', items: peopleWithAvatars, label: 'People' },
          { char: '/', items: commands, atStart: true, label: 'Commands' },
        ]}
        value={value}
        onSubmit={send}
        onValueChange={(next, details) => {
          setValue(next)
          setMentions(details.mentions)
        }}
      />
      <span role="status">{sent}</span>
    </div>
  )
}

function RemoteExample() {
  const [query, setQuery] = useState('')
  // Stands for a search on a server.
  const results = people.filter((person) =>
    person.label.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Mentions
      description="The list comes from a search of your own."
      label="Comment"
      placeholder="Type @"
      triggers={[{ char: '@', items: results, filter: false, label: 'People' }]}
      onQueryChange={setQuery}
    />
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
          'A text field where typing a trigger such as `@` or `/` opens a list, and the chosen item becomes a chip. A chip is deleted whole, as a character is, and the value stays plain text.',
      },
    },
  },
  args: {
    label: 'Message',
    placeholder: 'Try @ or /',
    triggers,
    rows: 3,
    singleLine: false,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    triggers: { control: false },
    footer: { control: false },
    value: { control: false },
    onSelect: { control: false },
    onSubmit: { control: false },
    onValueChange: { control: false },
    onQueryChange: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '24rem', maxWidth: '100%', minHeight: '22rem' }}>
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
          'Type `@` to mention someone, or `/` at the start for a command. The arrow keys move, Enter or Tab choose, Escape closes, and Backspace takes a whole chip away.',
      },
    },
  },
}

export const WithChips: TStory = {
  parameters: {
    docs: {
      description: { story: 'The text of an item in `defaultValue` starts out as a chip.' },
    },
  },
  args: { defaultValue: '/summarize the notes of @ana and @ben, please.' },
}

export const ChatBox: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A `footer` holds controls inside the field, and `onSubmit` sends with Enter.',
      },
    },
  },
  render: () => <ChatExample />,
}

export const SingleLine: TStory = {
  parameters: {
    docs: { description: { story: 'With `singleLine`, the field keeps one line.' } },
  },
  args: { label: 'Assign to', placeholder: 'Type @', singleLine: true },
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

export const Disabled: TStory = {
  parameters: {
    docs: { description: { story: 'A disabled field shows its chips and cannot change.' } },
  },
  args: { disabled: true, defaultValue: 'Ask @carla.' },
}
