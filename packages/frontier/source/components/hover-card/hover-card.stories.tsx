import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Avatar } from '../avatar/avatar.js'
import { Button } from '../button/button.js'
import { Link } from '../link/link.js'

import { HoverCard } from './hover-card.js'

function ProfileCard() {
  return (
    <HoverCard.Content>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Avatar>
          <Avatar.Fallback>AM</Avatar.Fallback>
        </Avatar>
        <div style={{ display: 'grid', gap: '4px' }}>
          <strong>Ana Morales</strong>
          <span style={{ color: 'var(--frontier-color-text-muted)', fontSize: '0.875rem' }}>
            Designs the system and keeps its tokens honest.
          </span>
          <span style={{ color: 'var(--frontier-color-text-subtle)', fontSize: '0.75rem' }}>
            Joined March 2024
          </span>
        </div>
      </div>
    </HoverCard.Content>
  )
}

function ControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'grid', gap: '16px', justifyItems: 'center' }}>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCard.Trigger>
          <Link href="#ana">@ana</Link>
        </HoverCard.Trigger>
        <ProfileCard />
      </HoverCard>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? 'Close the card' : 'Open the card'}
      </Button>
    </div>
  )
}

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows extra information about an element in a card that opens when the pointer enters it or it gets keyboard focus. The card stays open while the pointer is over it. Use it for supplementary detail only, because touch screens have no hover.',
      },
    },
  },
  args: {
    openDelay: 400,
    closeDelay: 200,
  },
  argTypes: {
    openDelay: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Time to wait before the card opens, in milliseconds.',
    },
    closeDelay: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Time to wait before the card closes, in milliseconds.',
    },
    open: { control: false },
    defaultOpen: { control: 'boolean' },
    onOpenChange: { control: false },
  },
} satisfies Meta<typeof HoverCard>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A profile card that opens when the pointer enters the link or the link gets focus.',
      },
    },
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCard.Trigger>
        <Link href="#ana">@ana</Link>
      </HoverCard.Trigger>
      <ProfileCard />
    </HoverCard>
  ),
}

export const Placement: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Chooses the side with `side` and the alignment with `align`. The card flips to the other side when there is no room.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '24px', padding: '120px 160px' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <HoverCard key={side} {...args}>
          <HoverCard.Trigger>
            <Button variant="outline">{side}</Button>
          </HoverCard.Trigger>
          <HoverCard.Content side={side}>
            This card opens on the {side} side of its trigger.
          </HoverCard.Content>
        </HoverCard>
      ))}
    </div>
  ),
}

export const Delays: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Opens at once and stays for a second after the pointer leaves, which gives people time to move into the card.',
      },
    },
  },
  args: {
    openDelay: 0,
    closeDelay: 1000,
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCard.Trigger>
        <Button variant="outline">Hover me</Button>
      </HoverCard.Trigger>
      <HoverCard.Content>The card waits a second before it closes.</HoverCard.Content>
    </HoverCard>
  ),
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Controls the card from the page with `open` and `onOpenChange`, so it can also open from another control.',
      },
    },
  },
  render: () => <ControlledExample />,
}
