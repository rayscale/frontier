import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Rating } from './rating.js'

function ControlledExample() {
  const [value, setValue] = useState(3)

  return (
    <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'start' }}>
      <Rating label="Rate this recipe" value={value} onValueChange={setValue} />
      <span>You gave it {value} of 5.</span>
    </div>
  )
}

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Lets people rate something with a number of shapes, or shows a rating that is already given. Each choice is a native radio button.',
      },
    },
  },
  args: {
    label: 'Rate this recipe',
    defaultValue: 3,
    max: 5,
    precision: 1,
    size: 'md',
    allowClear: false,
    readOnly: false,
    disabled: false,
  },
  argTypes: {
    precision: { control: 'inline-radio', options: [1, 0.5] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    max: { control: { type: 'number', min: 1, max: 10 } },
    allowClear: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: false },
    onValueChange: { control: false },
    icon: { control: false },
  },
} satisfies Meta<typeof Rating>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: { description: { story: 'Five stars. Hover to preview, click to choose.' } },
  },
}

export const HalfStars: TStory = {
  parameters: {
    docs: { description: { story: 'With `precision={0.5}`, people can give half a star.' } },
  },
  args: { precision: 0.5, defaultValue: 3.5 },
}

export const Sizes: TStory = {
  parameters: {
    docs: { description: { story: 'Three sizes: `sm`, `md`, and `lg`.' } },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Rating {...args} size="sm" />
      <Rating {...args} size="md" />
      <Rating {...args} size="lg" />
    </div>
  ),
}

export const AllowClear: TStory = {
  parameters: {
    docs: {
      description: { story: 'With `allowClear`, clicking the rating that is given takes it back.' },
    },
  },
  args: { allowClear: true },
}

export const ReadOnly: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'A read only rating shows a value, such as an average, and is read out as one image.',
      },
    },
  },
  args: { readOnly: true, precision: 0.5, defaultValue: 4.5, label: 'Average rating' },
}

export const CustomIcon: TStory = {
  parameters: {
    docs: { description: { story: 'Pass `icon` to repeat another shape instead of a star.' } },
  },
  args: { max: 4, defaultValue: 2 },
  render: (args) => (
    <Rating
      {...args}
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
        </svg>
      }
    />
  ),
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: { story: 'Pass `value` and `onValueChange` to keep the rating in the page.' },
    },
  },
  render: () => <ControlledExample />,
}

export const Disabled: TStory = {
  parameters: {
    docs: { description: { story: 'A disabled rating shows its value and cannot change.' } },
  },
  args: { disabled: true },
}
