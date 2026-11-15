import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field } from './field.js'

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composes a label, a bordered box, a control, a description, and an error.',
      },
    },
  },
  args: {
    children: null,
    disabled: false,
    invalid: false,
    required: false,
  },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Email</Field.Label>
      <Field.Box>
        <Field.Control placeholder="you@example.com" />
      </Field.Box>
      <Field.Description>We only use this to contact you.</Field.Description>
    </Field.Root>
  ),
} satisfies Meta<typeof Field.Root>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Shows the label, box, control, and description together.',
      },
    },
  },
}

export const Description: TStory = {
  name: 'Description',
  parameters: {
    docs: {
      description: {
        story: 'Adds helper text under the box.',
      },
    },
  },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Email</Field.Label>
      <Field.Box>
        <Field.Control placeholder="you@example.com" />
      </Field.Box>
      <Field.Description>We only use this to contact you and never share it.</Field.Description>
    </Field.Root>
  ),
}

export const Error: TStory = {
  name: 'Error',
  parameters: {
    docs: {
      description: {
        story: 'An error message marks the field invalid and is announced.',
      },
    },
  },
  args: {
    children: null,
    invalid: true,
  },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Email</Field.Label>
      <Field.Box>
        <Field.Control defaultValue="not-an-email" />
      </Field.Box>
      <Field.Error>Enter a valid email.</Field.Error>
    </Field.Root>
  ),
}

export const Required: TStory = {
  name: 'Required',
  parameters: {
    docs: {
      description: {
        story: 'Shows the visible required marker and marks the control required.',
      },
    },
  },
  args: {
    children: null,
    required: true,
  },
}

export const Disabled: TStory = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Keeps the control focusable and read-only.',
      },
    },
  },
  args: {
    children: null,
    disabled: true,
  },
}
