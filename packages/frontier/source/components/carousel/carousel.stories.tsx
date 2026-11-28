import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button/button.js'

import { Carousel } from './carousel.js'

const slides = ['One', 'Two', 'Three', 'Four', 'Five']

function Slide({ children }: { children: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10rem',
        border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
        borderRadius: 'var(--frontier-radius-lg)',
        background: 'var(--frontier-color-surface)',
        fontSize: 'var(--frontier-font-size-3xl)',
        fontWeight: 'var(--frontier-font-weight-semibold)',
      }}
    >
      {children}
    </div>
  )
}

function ControlledExample() {
  const [index, setIndex] = useState(0)

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <Carousel.Root aria-label="Photos" index={index} onIndexChange={setIndex}>
        <Carousel.Content>
          {slides.map((name, position) => (
            <Carousel.Item
              key={name}
              aria-label={`${String(position + 1)} of ${String(slides.length)}`}
            >
              <Slide>{name}</Slide>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Dots />
      </Carousel.Root>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>
          Slide {index + 1} of {slides.length}
        </span>
        <Button
          variant="outline"
          onClick={() => {
            setIndex(0)
          }}
        >
          Back to the first
        </Button>
      </div>
    </div>
  )
}

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows a row or a column of slides that people drag, step through with the buttons or the arrow keys, or jump through with dots. Built on Embla Carousel.',
      },
    },
  },
  args: {
    'aria-label': 'Photos',
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction in which the slides sit side by side.',
    },
    loop: { control: 'boolean', description: 'Continues from the last slide to the first.' },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    slidesPerView: { control: { type: 'number', min: 1, max: 5, step: 0.5 } },
    slidesToScroll: { control: { type: 'number', min: 1, max: 5 } },
    dragFree: { control: 'boolean' },
    index: { control: false },
    onIndexChange: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '28rem', maxWidth: '100%', padding: '0 3rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'One slide at a time, with previous and next buttons. Dragging and the arrow keys work too.',
      },
    },
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Content>
        {slides.map((name, position) => (
          <Carousel.Item
            key={name}
            aria-label={`${String(position + 1)} of ${String(slides.length)}`}
          >
            <Slide>{name}</Slide>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
  ),
}

export const Dots: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A row of dots shows where the carousel is and jumps straight to a slide.',
      },
    },
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Content>
        {slides.map((name, position) => (
          <Carousel.Item
            key={name}
            aria-label={`${String(position + 1)} of ${String(slides.length)}`}
          >
            <Slide>{name}</Slide>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Dots />
    </Carousel.Root>
  ),
}

export const SeveralSlides: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows more than one slide at once with `slidesPerView`. A fractional value hints that there is more to see.',
      },
    },
  },
  args: {
    slidesPerView: 2.5,
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Content>
        {slides.map((name, position) => (
          <Carousel.Item
            key={name}
            aria-label={`${String(position + 1)} of ${String(slides.length)}`}
          >
            <Slide>{name}</Slide>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
  ),
}

export const Loop: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'With `loop` the buttons never run out: the last slide continues into the first.',
      },
    },
  },
  args: {
    loop: true,
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Content>
        {slides.map((name, position) => (
          <Carousel.Item
            key={name}
            aria-label={`${String(position + 1)} of ${String(slides.length)}`}
          >
            <Slide>{name}</Slide>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Dots />
    </Carousel.Root>
  ),
}

export const Vertical: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Stacks the slides in a column with `orientation="vertical"`. The carousel needs a height, and the arrow keys are up and down.',
      },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <Carousel.Root {...args} style={{ height: '11rem' }}>
      <Carousel.Content>
        {slides.map((name, position) => (
          <Carousel.Item
            key={name}
            aria-label={`${String(position + 1)} of ${String(slides.length)}`}
          >
            <Slide>{name}</Slide>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
  ),
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Keeps the current slide in the page with `index` and `onIndexChange`, so other controls can move the carousel.',
      },
    },
  },
  render: () => <ControlledExample />,
}
