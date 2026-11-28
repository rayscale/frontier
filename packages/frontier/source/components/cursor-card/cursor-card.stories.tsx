import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

import { CursorCard } from './cursor-card.js'

const zoneStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24rem',
  height: '12rem',
  border: 'var(--frontier-border-width) dashed var(--frontier-color-border-strong)',
  borderRadius: 'var(--frontier-radius-lg)',
  color: 'var(--frontier-color-text-muted)',
  fontFamily: 'var(--frontier-font-family)',
}

const week = [
  { day: 'Mon', visits: 120 },
  { day: 'Tue', visits: 180 },
  { day: 'Wed', visits: 150 },
  { day: 'Thu', visits: 240 },
  { day: 'Fri', visits: 210 },
  { day: 'Sat', visits: 90 },
  { day: 'Sun', visits: 60 },
]

const meta = {
  title: 'Components/CursorCard',
  component: CursorCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card that opens when the cursor enters a zone and moves with the cursor while it stays inside. The card can read the cursor position, so it can show the value under the cursor. It needs a cursor, so it does not open on touch screens.',
      },
    },
  },
  args: {
    openDelay: 0,
    closeDelay: 0,
    followAxis: 'both',
  },
  argTypes: {
    followAxis: {
      control: 'inline-radio',
      options: ['both', 'x', 'y'],
      description: 'Axis along which the card follows the cursor.',
    },
    openDelay: { control: { type: 'number', min: 0, step: 100 } },
    closeDelay: { control: { type: 'number', min: 0, step: 100 } },
    disabled: { control: 'boolean' },
    open: { control: false },
    onOpenChange: { control: false },
  },
} satisfies Meta<typeof CursorCard>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The card follows the cursor on both axes and shows where the cursor is.',
      },
    },
  },
  render: (args) => (
    <CursorCard {...args}>
      <CursorCard.Zone>
        <div style={zoneStyle}>Move the cursor here</div>
      </CursorCard.Zone>
      <CursorCard.Content>
        {({ x, y }) => `x ${String(Math.round(x))}, y ${String(Math.round(y))}`}
      </CursorCard.Content>
    </CursorCard>
  ),
}

export const FollowAxis: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'With `followAxis="x"` the card slides along the zone and stays level with it, which suits a value that depends on the horizontal position, as in a chart.',
      },
    },
  },
  args: {
    followAxis: 'x',
  },
  render: (args) => (
    <CursorCard {...args}>
      <CursorCard.Zone>
        <div style={zoneStyle}>Move the cursor along this zone</div>
      </CursorCard.Zone>
      <CursorCard.Content side="top">
        {({ x, width }) => `${String(Math.round((x / width) * 100))}% across`}
      </CursorCard.Content>
    </CursorCard>
  ),
}

export const Values: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Reads the cursor position to pick the value under the cursor. Here each seventh of the zone is one day of the week.',
      },
    },
  },
  args: {
    followAxis: 'x',
  },
  render: (args) => (
    <CursorCard {...args}>
      <CursorCard.Zone>
        <div style={{ ...zoneStyle, justifyContent: 'space-around', alignItems: 'flex-end' }}>
          {week.map(({ day, visits }) => (
            <div
              key={day}
              aria-hidden="true"
              style={{
                width: '1.5rem',
                height: `${String(visits / 2.5)}%`,
                borderRadius: 'var(--frontier-radius-md)',
                background: 'var(--frontier-color-primary)',
              }}
            />
          ))}
        </div>
      </CursorCard.Zone>
      <CursorCard.Content side="top">
        {({ x, width }) => {
          const index = Math.min(week.length - 1, Math.floor((x / width) * week.length))
          const entry = week[index]

          return entry ? `${entry.day}: ${String(entry.visits)} visits` : null
        }}
      </CursorCard.Content>
    </CursorCard>
  ),
}

export const Delay: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Waits before opening, so a cursor that only crosses the zone does not open the card.',
      },
    },
  },
  args: {
    openDelay: 500,
    closeDelay: 200,
  },
  render: (args) => (
    <CursorCard {...args}>
      <CursorCard.Zone>
        <div style={zoneStyle}>Stay here for half a second</div>
      </CursorCard.Zone>
      <CursorCard.Content>The card opened after a delay.</CursorCard.Content>
    </CursorCard>
  ),
}
