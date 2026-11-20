import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '../../icons/index.js'
import { Button } from '../button/index.js'

import { Tooltip } from './index.js'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Names or briefly explains its trigger on pointer rest and keyboard focus. It holds plain text that the trigger already exposes as its name or description, and it never takes focus.',
      },
    },
  },
  args: {
    children: <Button variant="secondary">Hover or focus me</Button>,
    content: 'Saves your changes',
    disabled: false,
    side: 'top',
  },
  argTypes: {
    content: {
      description: 'Short plain text. It must repeat what the trigger already exposes.',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'inline-start', 'inline-end'],
      description:
        'Preferred side of the trigger. It moves to the opposite side when there is no room.',
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Shows the tooltip above its trigger when the pointer rests on it or it receives focus.',
      },
    },
  },
}

export const Sides: TStory = {
  name: 'Sides',
  parameters: {
    docs: {
      description: {
        story:
          'Places the tooltip on each side of the trigger. Inline sides follow the writing direction.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--frontier-spacing-4)' }}>
      <Tooltip content="Above" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Below" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Before" side="inline-start">
        <Button variant="secondary">Start</Button>
      </Tooltip>
      <Tooltip content="After" side="inline-end">
        <Button variant="secondary">End</Button>
      </Tooltip>
    </div>
  ),
}

export const IconButton: TStory = {
  name: 'Icon button',
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons show their accessible name as a tooltip without extra setup.',
      },
    },
  },
  render: () => (
    <Button iconOnly aria-label="Add item">
      <Plus size="control" />
    </Button>
  ),
}
