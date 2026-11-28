import type { Meta, StoryObj } from '@storybook/react-vite'

import { ColorSwatch } from './color-swatch.js'

const meta = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows a color as a small circle. A color that is see-through shows a checkerboard behind it.',
      },
    },
  },
  args: {
    color: '#2563eb',
  },
  argTypes: {
    color: { control: 'color', description: 'The color to show, as any CSS color.' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof ColorSwatch>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: { description: { story: 'A swatch of a color. It is always a circle.' } },
  },
}

export const Sizes: TStory = {
  parameters: {
    docs: { description: { story: 'Three sizes: `sm`, `md`, and `lg`.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ColorSwatch {...args} size="sm" />
      <ColorSwatch {...args} size="md" />
      <ColorSwatch {...args} size="lg" />
    </div>
  ),
}

export const Palette: TStory = {
  parameters: {
    docs: {
      description: { story: 'Several swatches side by side, such as the colors of a tag set.' },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {['#ef4444', '#f59e0b', '#22c55e', '#2563eb', '#9333ea'].map((color) => (
        <ColorSwatch key={color} {...args} color={color} size="lg" />
      ))}
    </div>
  ),
}

export const Transparent: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'A color with alpha lets the checkerboard show through, so the transparency is visible.',
      },
    },
  },
  args: { color: 'rgb(37 99 235 / 40%)', size: 'lg' },
}
