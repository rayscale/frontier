import type { Meta, StoryObj } from '@storybook/react-vite'

import { Chart } from './chart.js'

const visits = [
  { day: 'Mon', visits: 120, signups: 24, goal: 100 },
  { day: 'Tue', visits: 180, signups: 38, goal: 140 },
  { day: 'Wed', visits: 150, signups: 30, goal: 160 },
  { day: 'Thu', visits: 240, signups: 52, goal: 180 },
  { day: 'Fri', visits: 210, signups: 47, goal: 200 },
  { day: 'Sat', visits: 90, signups: 14, goal: 120 },
  { day: 'Sun', visits: 60, signups: 9, goal: 100 },
]

const months = [
  { month: 'Jan', revenue: 4200, costs: 3100 },
  { month: 'Feb', revenue: 3800, costs: 3300 },
  { month: 'Mar', revenue: 5100, costs: 3600 },
  { month: 'Apr', revenue: 4700, costs: 3900 },
  { month: 'May', revenue: 5900, costs: 4100 },
  { month: 'Jun', revenue: 6400, costs: 4300 },
  { month: 'Jul', revenue: 6100, costs: 4600 },
  { month: 'Aug', revenue: 7200, costs: 4800 },
  { month: 'Sep', revenue: 6800, costs: 5000 },
  { month: 'Oct', revenue: 7600, costs: 5200 },
  { month: 'Nov', revenue: 8100, costs: 5400 },
  { month: 'Dec', revenue: 9300, costs: 5900 },
]

const balance = [
  { quarter: 'Q1', profit: 1200 },
  { quarter: 'Q2', profit: -400 },
  { quarter: 'Q3', profit: 900 },
  { quarter: 'Q4', profit: -1100 },
]

const config = {
  visits: { label: 'Visits' },
  signups: { label: 'Sign-ups' },
  goal: { label: 'Goal' },
} as const

const money = (value: number): string => `$${value.toLocaleString()}`
const thousands = (value: number): string => `$${String(value / 1000)}k`

const meta = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Charts a series of values for each position along an axis, as bars, lines, areas, or a mix of them. Compose it with `Chart.Root` and `Chart.Plot`, then add the axes, grid, marks, tooltip, and legend you need. The tooltip is a cursor card that follows the cursor across the plot, and every chart also offers its data as a table for assistive technology.',
      },
    },
  },
  args: {
    data: visits,
    xKey: 'day',
  },
  argTypes: {
    data: { control: false },
    config: { control: false },
    xKey: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '40rem', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chart>

export default meta

type TStory = StoryObj<typeof meta>

export const Bars: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Bars with a grid, both axes, a tooltip that follows the cursor, and a legend.',
      },
    },
  },
  render: () => (
    <Chart.Root data={visits} xKey="day" config={{ visits: config.visits }}>
      <Chart.Legend />
      <Chart.Plot aria-label="Visits by day of the week">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="visits" />
        <Chart.Tooltip />
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const GroupedBars: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Several bar series sit side by side at each position, and the tooltip lists them all.',
      },
    },
  },
  render: () => (
    <Chart.Root
      data={visits}
      xKey="day"
      config={{ visits: config.visits, signups: config.signups }}
    >
      <Chart.Legend />
      <Chart.Plot aria-label="Visits and sign-ups by day of the week">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="visits" />
        <Chart.Bar dataKey="signups" />
        <Chart.Tooltip />
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const Lines: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Lines with the points marked. The tooltip shows the values at the position under the cursor and rings those points.',
      },
    },
  },
  render: () => (
    <Chart.Root
      data={months}
      xKey="month"
      config={{ revenue: { label: 'Revenue' }, costs: { label: 'Costs' } }}
    >
      <Chart.Legend />
      <Chart.Plot aria-label="Revenue and costs by month">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis tickFormat={thousands} />
        <Chart.Line dataKey="revenue" dots />
        <Chart.Line dataKey="costs" dots />
        <Chart.Tooltip valueFormat={money} />
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const Areas: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'An area fills the space under its line and keeps the line on top.',
      },
    },
  },
  render: () => (
    <Chart.Root data={months} xKey="month" config={{ revenue: { label: 'Revenue' } }}>
      <Chart.Plot aria-label="Revenue by month">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis tickFormat={thousands} />
        <Chart.Area dataKey="revenue" />
        <Chart.Tooltip valueFormat={money} />
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const Mixed: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Marks share the same axes, so a line can mark a goal over bars.',
      },
    },
  },
  render: () => (
    <Chart.Root data={visits} xKey="day" config={{ visits: config.visits, goal: config.goal }}>
      <Chart.Legend />
      <Chart.Plot aria-label="Visits against the goal by day of the week">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="visits" />
        <Chart.Line dataKey="goal" curve="step" />
        <Chart.Tooltip />
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const Negative: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The value scale includes zero, so negative values grow down from the baseline.',
      },
    },
  },
  render: () => (
    <Chart.Root data={balance} xKey="quarter" config={{ profit: { label: 'Profit' } }}>
      <Chart.Plot aria-label="Profit by quarter">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="profit" />
        <Chart.Tooltip />
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const Curves: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'A line can be `linear`, `monotone`, which is smooth without overshooting, or `step`.',
      },
    },
  },
  render: () => (
    <Chart.Root data={visits} xKey="day" config={config}>
      <Chart.Legend />
      <Chart.Plot aria-label="The same data with three curves">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Line dataKey="visits" curve="linear" />
        <Chart.Line dataKey="goal" curve="monotone" />
        <Chart.Line dataKey="signups" curve="step" />
        <Chart.Tooltip />
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const CustomTooltip: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'The tooltip content is a function of the row under the cursor, so it can show anything the data holds.',
      },
    },
  },
  render: () => (
    <Chart.Root data={visits} xKey="day" config={{ visits: config.visits }}>
      <Chart.Plot aria-label="Visits by day of the week">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="visits" />
        <Chart.Tooltip>
          {({ datum, label }) => (
            <div style={{ display: 'grid', gap: '2px' }}>
              <strong>{label}</strong>
              <span>
                {String(datum.visits)} visits, {String(datum.signups)} sign-ups
              </span>
            </div>
          )}
        </Chart.Tooltip>
      </Chart.Plot>
    </Chart.Root>
  ),
}

export const Sparkline: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Without axes or a grid, and with the margins reduced, the plot becomes a small trend line.',
      },
    },
  },
  render: () => (
    <div style={{ width: '12rem' }}>
      <Chart.Root data={months} xKey="month" config={{ revenue: { label: 'Revenue' } }}>
        <Chart.Plot
          aria-label="Revenue trend for the year"
          height={48}
          margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <Chart.Line dataKey="revenue" />
          <Chart.Tooltip />
        </Chart.Plot>
      </Chart.Root>
    </div>
  ),
}
