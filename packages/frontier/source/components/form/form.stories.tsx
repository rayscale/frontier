import type { Meta, StoryObj } from '@storybook/react-vite'
import { type ReactElement, type ReactNode, type SyntheticEvent, useState } from 'react'

import { Button } from '../button/button.js'
import { CheckboxGroup } from '../checkbox-group/checkbox-group.js'
import { Checkbox } from '../checkbox/checkbox.js'
import { Fieldset } from '../fieldset/fieldset.js'
import { Input } from '../input/input.js'
import { RadioGroup, RadioGroupItem } from '../radio-group/radio-group.js'

import { Form } from './form.js'

function SubmitDemo(props: { children: ReactNode }): ReactElement {
  const [submitted, setSubmitted] = useState('')

  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-3)' }}>
      <Form
        onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault()
          setSubmitted(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))))
        }}
      >
        {props.children}
      </Form>
      {submitted ? <output>{submitted}</output> : null}
    </div>
  )
}

const meta = {
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  render: (args) => (
    <Form {...args}>
      <Input label="Email" type="email" required />
      <Button type="submit">Subscribe</Button>
    </Form>
  ),
} satisfies Meta<typeof Form>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default form layout wrapping form controls and submission buttons.',
      },
    },
  },
}

export const Submit: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Forms support handling submission events and collecting form data.',
      },
    },
  },
  render: () => (
    <SubmitDemo>
      <Input label="Name" name="name" required />
      <Input label="Email" name="email" type="email" required />
      <Button type="submit">Save</Button>
    </SubmitDemo>
  ),
}

export const Groups: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Forms can organize fields using fieldsets and input groups.',
      },
    },
  },
  render: () => (
    <SubmitDemo>
      <Input label="Name" name="name" />
      <Fieldset.Root>
        <Fieldset.Legend>Preferences</Fieldset.Legend>
        <CheckboxGroup label="Topics" defaultValue={['news']}>
          <CheckboxGroup.Item name="topics" value="news" label="News" />
          <CheckboxGroup.Item name="topics" value="tips" label="Tips" />
        </CheckboxGroup>
        <RadioGroup label="Frequency" name="frequency" defaultValue="daily">
          <RadioGroupItem value="daily" label="Daily" />
          <RadioGroupItem value="weekly" label="Weekly" />
        </RadioGroup>
      </Fieldset.Root>
      <Button type="submit">Save</Button>
    </SubmitDemo>
  ),
}

export const Reset: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Forms support native reset controls to restore initial values.',
      },
    },
  },
  render: () => (
    <Form>
      <Input label="Email" name="email" defaultValue="ana@example.com" />
      <Checkbox name="consent" label="I agree" />
      <div style={{ display: 'flex', gap: 'var(--frontier-spacing-2)' }}>
        <Button type="submit">Save</Button>
        <Button type="reset">Reset</Button>
      </div>
    </Form>
  ),
}
