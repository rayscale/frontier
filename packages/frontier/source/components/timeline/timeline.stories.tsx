import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckCircle, CircleX, Info, TriangleAlert } from '../../icons/index.js'

import { Timeline } from './timeline.js'

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows a list of events in the order they happened, joined by a line. Each event has an indicator, a title, a time, and details.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '24rem', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Timeline>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'An event is an indicator and its text. Without content, the indicator is a dot.',
      },
    },
  },
  render: () => (
    <Timeline aria-label="Order history">
      <Timeline.Item tone="success">
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Delivered</Timeline.Title>
          <Timeline.Time dateTime="2025-03-04">March 4, 10:12</Timeline.Time>
          <Timeline.Description>Left at the front door.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Out for delivery</Timeline.Title>
          <Timeline.Time dateTime="2025-03-04">March 4, 08:30</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Shipped</Timeline.Title>
          <Timeline.Time dateTime="2025-03-02">March 2, 17:45</Timeline.Time>
          <Timeline.Description>Handed to the carrier.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Order placed</Timeline.Title>
          <Timeline.Time dateTime="2025-03-01">March 1, 09:02</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
}

export const WithIcons: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Put an icon in the indicator to draw a circle around it. The tone sets the color. The tone is also written in the title, because color alone does not say it.',
      },
    },
  },
  render: () => (
    <Timeline aria-label="Deployment">
      <Timeline.Item tone="success">
        <Timeline.Indicator>
          <CheckCircle />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Deployed to production</Timeline.Title>
          <Timeline.Time dateTime="2025-03-04T10:12">10:12</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="warning">
        <Timeline.Indicator>
          <TriangleAlert />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Slow tests</Timeline.Title>
          <Timeline.Description>The tests took twice as long as usual.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="danger">
        <Timeline.Indicator>
          <CircleX />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>First attempt failed</Timeline.Title>
          <Timeline.Description>A check on the build did not pass.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="info">
        <Timeline.Indicator>
          <Info />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Build started</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
}

export const Tones: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The five tones: `neutral`, `info`, `success`, `warning`, and `danger`.',
      },
    },
  },
  render: () => (
    <Timeline aria-label="Tones">
      {(['neutral', 'info', 'success', 'warning', 'danger'] as const).map((tone) => (
        <Timeline.Item key={tone} tone={tone}>
          <Timeline.Indicator />
          <Timeline.Content>
            <Timeline.Title>{tone}</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  ),
}
