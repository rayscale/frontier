import type { Meta, StoryObj } from '@storybook/react-vite'

import { CreditCard } from './index.js'

const meta = {
  title: 'Components/Credit Card',
  component: CreditCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows the face of a payment card with its issuer, network logo, number, holder, and expiry. It only displays a card: it never stores or sends the number, and it masks every digit but the last four unless told otherwise.',
      },
    },
  },
  args: {
    issuer: 'Frontier.',
    number: '4242 4242 4242 1234',
    holder: 'Olivia Rhye',
    expiry: '06/28',
  },
  argTypes: {
    brand: {
      control: 'select',
      options: [
        'auto',
        'visa',
        'mastercard',
        'amex',
        'discover',
        'jcb',
        'unionpay',
        'diners',
        'maestro',
        'generic',
      ],
      description: 'Card network. `auto` reads it from the number.',
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'inverse', 'subtle'],
      description: 'Surface treatment of the card.',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Width of the card. The type scales with it.',
    },
    accent: { control: 'color', description: 'Any CSS color that tints the primary variant.' },
    masked: { control: 'boolean', description: 'Hides every digit but the last four.' },
    monochrome: { control: 'boolean', description: 'Draws the logo in the text color.' },
    contactless: { control: 'boolean', description: 'Shows the contactless symbol.' },
  },
} satisfies Meta<typeof CreditCard>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: { story: 'Shows a masked Visa card, with the network read from the number.' },
    },
  },
}

export const Mastercard: TStory = {
  args: { number: '5555 5555 5555 4444' },
  parameters: {
    docs: { description: { story: 'Shows the Mastercard logo, read from the number.' } },
  },
}

export const Accent: TStory = {
  args: { accent: '#5b3fc4', number: '5555 5555 5555 4444' },
  parameters: {
    docs: { description: { story: 'Tints the card with any color through `accent`.' } },
  },
}

export const Inverse: TStory = {
  args: { variant: 'inverse' },
  parameters: {
    docs: { description: { story: 'Flips the card against the theme, dark in light mode.' } },
  },
}

export const Subtle: TStory = {
  args: { variant: 'subtle' },
  parameters: {
    docs: { description: { story: 'Uses the surface color with a border for a quiet card.' } },
  },
}

export const Monochrome: TStory = {
  args: { monochrome: true },
  parameters: {
    docs: { description: { story: 'Draws the network logo in the text color.' } },
  },
}

export const Unmasked: TStory = {
  args: { masked: false },
  parameters: {
    docs: {
      description: { story: 'Prints the full number, for a screen that reveals it on purpose.' },
    },
  },
}

export const Networks: TStory = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, max-content)' }}>
      <CreditCard {...args} size="small" brand="visa" />
      <CreditCard {...args} size="small" brand="mastercard" />
      <CreditCard {...args} size="small" brand="amex" number="3782 822463 10005" />
      <CreditCard {...args} size="small" brand="discover" />
      <CreditCard {...args} size="small" brand="jcb" />
      <CreditCard {...args} size="small" brand="unionpay" />
      <CreditCard {...args} size="small" brand="diners" />
      <CreditCard {...args} size="small" brand="maestro" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Compares the logo of every supported network.' } },
  },
}

export const Sizes: TStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <CreditCard {...args} size="small" />
      <CreditCard {...args} size="medium" />
      <CreditCard {...args} size="large" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Compares the three widths, with the type scaling in step.' } },
  },
}

export const CustomLogo: TStory = {
  args: {
    logo: <strong>Local Pay</strong>,
  },
  parameters: {
    docs: { description: { story: 'Replaces the network logo with any content through `logo`.' } },
  },
}
