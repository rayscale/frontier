import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { NumberField } from './number-field.js'

function ControlledExample() {
  const [value, setValue] = useState<number | null>(2)

  return (
    <NumberField
      description={value === null ? 'No number.' : `You chose ${String(value)}.`}
      label="Guests"
      min={0}
      value={value}
      onValueChange={setValue}
    />
  )
}

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An input of numbers with buttons that step the value. It keeps the number between `min` and `max`, writes it with the `format` and the `locale`, and steps it with the arrow keys.',
      },
    },
  },
  args: {
    label: 'Guests',
    defaultValue: 2,
    controls: 'sides',
    step: 1,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    controls: { control: 'inline-radio', options: ['sides', 'end', 'none'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    value: { control: false },
    format: { control: false },
    onValueChange: { control: false },
    onValueCommitted: { control: false },
  },
} satisfies Meta<typeof NumberField>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: { story: 'The buttons at the sides step the value. The arrow keys do too.' },
    },
  },
}

export const ButtonsAtTheEnd: TStory = {
  parameters: {
    docs: { description: { story: 'With `controls="end"`, both buttons follow the number.' } },
  },
  args: { controls: 'end' },
}

export const Currency: TStory = {
  parameters: {
    docs: { description: { story: 'The `format` and the `locale` write the number as money.' } },
  },
  args: {
    label: 'Price',
    defaultValue: 1234.5,
    step: 10,
    locale: 'en-US',
    format: { style: 'currency', currency: 'USD' },
  },
}

export const Percent: TStory = {
  parameters: {
    docs: { description: { story: 'A percent is written from a number between 0 and 1.' } },
  },
  args: {
    label: 'Discount',
    defaultValue: 0.2,
    step: 0.05,
    min: 0,
    max: 1,
    format: { style: 'percent' },
  },
}

export const Limits: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A button is disabled when the number cannot go further in its direction.',
      },
    },
  },
  args: { min: 1, max: 6, defaultValue: 6, description: 'From 1 to 6 guests.' },
}

export const WithError: TStory = {
  parameters: {
    docs: { description: { story: 'An `error` marks the field as invalid.' } },
  },
  args: { error: 'Choose at least one guest.', defaultValue: 0 },
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `value` and `onValueChange`. The value is `null` when the field is empty.',
      },
    },
  },
  render: () => <ControlledExample />,
}

export const Disabled: TStory = {
  parameters: {
    docs: { description: { story: 'A disabled field shows its number and cannot change.' } },
  },
  args: { disabled: true },
}
