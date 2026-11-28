import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { ArrowUp, Copy, Info, Plus, Search as SearchIcon } from '../../icons/index.js'
import { Button } from '../button/button.js'

import { InputGroup } from './input-group.js'

function MessageExample() {
  const [value, setValue] = useState('')
  const limit = 280

  return (
    <InputGroup label="Message" description="Press the arrow to send.">
      <InputGroup.Textarea
        placeholder="Ask, search or chat…"
        maxLength={limit}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
      <InputGroup.Addon align="bottom">
        <Button variant="outline" size="icon-small" aria-label="Attach a file">
          <Plus aria-hidden="true" />
        </Button>
        <InputGroup.Text>Auto</InputGroup.Text>
        <InputGroup.Text style={{ marginInlineStart: 'auto' }}>
          {String(value.length)} / {String(limit)}
        </InputGroup.Text>
        <Button size="icon-small" aria-label="Send" disabled={value.length === 0}>
          <ArrowUp aria-hidden="true" />
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  )
}

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'One bordered box that holds a field and the controls around it. Place an `InputGroup.Addon` at the `start`, `end`, `top`, or `bottom` of the field, and put text, icons, or buttons inside it.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '28rem', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A message box with its actions in a row below the text.',
      },
    },
  },
  render: () => <MessageExample />,
}

export const Prefix: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Static text at the start of a single-line field and icons at the end.',
      },
    },
  },
  render: () => (
    <InputGroup label="Repository">
      <InputGroup.Addon>
        <InputGroup.Text>https://</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="github.com/frontier" />
      <InputGroup.Addon align="end">
        <Button variant="ghost" size="icon-small" aria-label="More information">
          <Info aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon-small" aria-label="Copy link">
          <Copy aria-hidden="true" />
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const Search: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'An icon at the start and a button at the end of a search field.',
      },
    },
  },
  render: () => (
    <InputGroup label="Search">
      <InputGroup.Addon>
        <SearchIcon aria-hidden="true" />
      </InputGroup.Addon>
      <InputGroup.Input type="search" placeholder="Search the documentation" />
      <InputGroup.Addon align="end">
        <Button variant="secondary" size="small">
          Search
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const TopAndBottom: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Addons above and below the field take a full row each.',
      },
    },
  },
  render: () => (
    <InputGroup label="Note">
      <InputGroup.Addon align="top">
        <InputGroup.Text>Draft</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Textarea placeholder="Write a note" />
      <InputGroup.Addon align="bottom">
        <InputGroup.Text>Markdown is supported</InputGroup.Text>
      </InputGroup.Addon>
    </InputGroup>
  ),
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
      <InputGroup label="Default">
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" />
      </InputGroup>
      <InputGroup label="Disabled" disabled>
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" />
      </InputGroup>
      <InputGroup label="Read only" readOnly>
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input defaultValue="example.com" />
      </InputGroup>
      <InputGroup label="Invalid" error="Enter a valid address.">
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input defaultValue="example" />
      </InputGroup>
    </div>
  ),
}
