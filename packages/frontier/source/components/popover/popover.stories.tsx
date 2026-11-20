import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Info } from '../../icons/index.js'
import { Button } from '../button/button.js'
import { Input } from '../input/input.js'
import { ScrollArea } from '../scroll-area/scroll-area.js'

import {
  Popover,
  type TPopoverAlign,
  type TPopoverContentProps,
  type TPopoverSide,
} from './popover.js'

const meta = {
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta

type TStory = StoryObj<typeof meta>

const sides: TPopoverSide[] = ['top', 'right', 'bottom', 'left']
const alignments: TPopoverAlign[] = ['start', 'center', 'end']

function ControlledPopover() {
  const [open, setOpen] = useState(false)
  const [lastAction, setLastAction] = useState('Popover has not been opened yet.')

  return (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
      <p style={{ margin: 0 }}>{lastAction}</p>
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          setLastAction(
            nextOpen ? 'Popover opened by the parent.' : 'Popover closed by the parent.',
          )
        }}
      >
        <Popover.Trigger>
          <Button>Toggle controlled popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Controlled popover</Popover.Title>
            <Popover.Description>
              The parent owns the open state and reacts to every change.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover>
    </div>
  )
}

export const Default: StoryObj<TPopoverContentProps> = {
  parameters: {
    docs: {
      description: {
        story: 'The default popover anchored to a trigger button.',
      },
    },
  },
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 8,
    alignOffset: 0,
  },
  argTypes: {
    side: {
      control: 'select',
      options: sides,
    },
    align: {
      control: 'select',
      options: alignments,
    },
    sideOffset: {
      control: { type: 'number', min: 0, step: 4 },
    },
    alignOffset: {
      control: { type: 'number', min: -64, max: 64, step: 4 },
    },
  },
  render: (args) => (
    <Popover>
      <Popover.Trigger>
        <Button>Open popover</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Popover.Header>
          <Popover.Title>Filters</Popover.Title>
          <Popover.Description>Choose which projects appear in this list.</Popover.Description>
        </Popover.Header>
      </Popover.Content>
    </Popover>
  ),
}

export const Sides: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Popovers can be placed on top, right, bottom, or left of the trigger.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        gap: '3rem 4rem',
        padding: '4rem',
      }}
    >
      {sides.map((side) => (
        <Popover key={side}>
          <Popover.Trigger>
            <Button variant="outline">Open {side}</Button>
          </Popover.Trigger>
          <Popover.Content side={side}>
            <Popover.Title>Placed {side}</Popover.Title>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
}

export const Alignments: TStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', padding: '4rem 1rem' }}>
      {alignments.map((align) => (
        <Popover key={align}>
          <Popover.Trigger>
            <Button variant="outline">Align {align}</Button>
          </Popover.Trigger>
          <Popover.Content align={align}>
            <Popover.Title>Aligned {align}</Popover.Title>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
}

export const Offsets: TStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', padding: '4rem' }}>
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Distance 16px</Button>
        </Popover.Trigger>
        <Popover.Content sideOffset={16}>
          <Popover.Title>Moved away from trigger</Popover.Title>
        </Popover.Content>
      </Popover>
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Shifted 24px</Button>
        </Popover.Trigger>
        <Popover.Content align="start" alignOffset={24}>
          <Popover.Title>Shifted along the edge</Popover.Title>
        </Popover.Content>
      </Popover>
    </div>
  ),
}

export const Uncontrolled: TStory = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Open uncontrolled popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Managed by Base UI</Popover.Title>
        <Popover.Description>The popover tracks its own open state.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
}

export const DefaultOpen: TStory = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Toggle popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Opened on mount</Popover.Title>
        <Popover.Description>
          Set with defaultOpen. Press Escape or the trigger to close it.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
}

export const Controlled: TStory = {
  render: () => <ControlledPopover />,
}

export const WithCloseButton: TStory = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Rename project</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Rename project</Popover.Title>
          <Popover.Description>
            Renaming updates the link shared with your team.
          </Popover.Description>
        </Popover.Header>
        <Popover.Close>Done</Popover.Close>
      </Popover.Content>
    </Popover>
  ),
}

export const WithoutDescription: TStory = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button variant="outline">Show status</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>All systems operational</Popover.Title>
      </Popover.Content>
    </Popover>
  ),
}

export const FormContent: TStory = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button variant="outline">Invite member</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Invite member</Popover.Title>
          <Popover.Description>They receive an email with a link to join.</Popover.Description>
        </Popover.Header>
        <Input aria-label="Email address" placeholder="name@example.com" />
        <Popover.Close variant="primary">Send invite</Popover.Close>
      </Popover.Content>
    </Popover>
  ),
}

export const LongContent: TStory = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button variant="outline">Recent activity</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Recent activity</Popover.Title>
        </Popover.Header>
        <ScrollArea style={{ maxHeight: '12rem' }}>
          {Array.from({ length: 20 }, (_, index) => (
            <p key={index} style={{ margin: '0 0 0.5rem' }}>
              Activity {index + 1}: A teammate updated a shared document.
            </p>
          ))}
        </ScrollArea>
      </Popover.Content>
    </Popover>
  ),
}

export const DisabledTrigger: TStory = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button disabled>Unavailable</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Not reachable</Popover.Title>
      </Popover.Content>
    </Popover>
  ),
}

export const IconTrigger: TStory = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button variant="ghost" size="icon" aria-label="About this page">
          <Info aria-hidden="true" />
        </Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <Popover.Description>Changes you make are saved automatically.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
}

export const NonModalInteraction: TStory = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: '20rem' }}>
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Page stays interactive</Popover.Title>
          <Popover.Description>
            Unlike a dialog, the page behind this popover remains usable.
          </Popover.Description>
        </Popover.Content>
      </Popover>
      <Input aria-label="Search projects" placeholder="Search projects" />
    </div>
  ),
}
