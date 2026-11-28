import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button/button.js'
import { Popover } from '../popover/popover.js'

import { ColorPicker } from './color-picker.js'

const palette = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#22c55e',
  '#14b8a6',
  '#2563eb',
  '#9333ea',
  '#db2777',
  '#0f172a',
  '#ffffff',
]

const stack = { display: 'grid', gap: '1rem' } as const

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Lets people pick a color. Compose `ColorPicker.Root` with an area, sliders, a wheel, fields, swatches, and an eyedropper. Colors are read and written with culori, as hex, rgb, hsl, or oklch.',
      },
    },
  },
  args: {
    defaultValue: '#2563eb',
    format: 'hex',
    alpha: false,
    disabled: false,
  },
  argTypes: {
    format: { control: 'inline-radio', options: ['hex', 'rgb', 'hsl', 'oklch'] },
    alpha: { control: 'boolean', description: 'Whether the color can be see-through.' },
    disabled: { control: 'boolean' },
    value: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof ColorPicker>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'An area for how vivid and bright the color is, a slider for the hue, and a field.',
      },
    },
  },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <div style={stack}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  ),
}

export const WithAlpha: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Turn on `alpha` to let the color be see-through and add a slider for it.',
      },
    },
  },
  args: { alpha: true, defaultValue: '#2563ebcc' },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <div style={stack}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
        <ColorPicker.Slider channel="alpha" />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  ),
}

export const Wheel: TStory = {
  parameters: {
    docs: { description: { story: 'A wheel for the hue, with a slider for the brightness.' } },
  },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <div style={{ ...stack, justifyItems: 'center' }}>
        <ColorPicker.Wheel />
        <ColorPicker.Slider channel="brightness" />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  ),
}

export const Swatches: TStory = {
  parameters: {
    docs: { description: { story: 'A group of ready-made colors to choose from.' } },
  },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <div style={stack}>
        <ColorPicker.Swatches colors={palette} />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  ),
}

export const Channels: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Each channel can be a slider, or a number field, so people can type the exact value.',
      },
    },
  },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <div style={{ ...stack, width: '16rem' }}>
        {(['red', 'green', 'blue'] as const).map((channel) => (
          <div
            key={channel}
            style={{ display: 'grid', gridTemplateColumns: '1fr 5rem', gap: '1rem' }}
          >
            <ColorPicker.Slider channel={channel} />
            <ColorPicker.Input channel={channel} />
          </div>
        ))}
      </div>
    </ColorPicker.Root>
  ),
}

export const Vertical: TStory = {
  parameters: {
    docs: { description: { story: 'A slider can be vertical, next to the area.' } },
  },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" orientation="vertical" style={{ blockSize: '10rem' }} />
      </div>
    </ColorPicker.Root>
  ),
}

export const Formats: TStory = {
  parameters: {
    docs: { description: { story: 'The same color written as hex, rgb, hsl, and oklch.' } },
  },
  render: (args) => (
    <div style={{ ...stack, width: '18rem' }}>
      {(['hex', 'rgb', 'hsl', 'oklch'] as const).map((format) => (
        <ColorPicker.Input
          key={format}
          defaultValue={args.defaultValue}
          format={format}
          label={format}
        />
      ))}
    </div>
  ),
}

export const InAPopover: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'The root renders no element, so it wraps both the trigger and the popover. The preview in the trigger always shows the current color.',
      },
    },
  },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">
            <ColorPicker.Preview size="sm" />
            Pick a color
          </Button>
        </Popover.Trigger>
        <Popover.Content align="start">
          <div style={stack}>
            <ColorPicker.Area />
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <ColorPicker.EyeDropper />
              <ColorPicker.Slider channel="hue" />
            </div>
            <ColorPicker.Input label="Color" />
            <ColorPicker.Swatches colors={palette} />
          </div>
        </Popover.Content>
      </Popover>
    </ColorPicker.Root>
  ),
}

function ControlledExample() {
  const [color, setColor] = useState('#2563eb')

  return (
    <ColorPicker.Root value={color} onValueChange={setColor}>
      <div style={stack}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Color: {color}</span>
          <Button
            variant="outline"
            onClick={() => {
              setColor('#ef4444')
            }}
          >
            Reset to red
          </Button>
        </div>
      </div>
    </ColorPicker.Root>
  )
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `value` and `onValueChange` to keep the color in the page.',
      },
    },
  },
  render: () => <ControlledExample />,
}

export const Disabled: TStory = {
  parameters: {
    docs: { description: { story: 'A disabled picker shows the color but cannot change it.' } },
  },
  args: { disabled: true },
  render: (args) => (
    <ColorPicker.Root {...args}>
      <div style={stack}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  ),
}
