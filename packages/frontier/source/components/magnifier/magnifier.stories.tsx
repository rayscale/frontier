import type { Meta, StoryObj } from '@storybook/react-vite'

import { Magnifier } from './magnifier.js'

/** Draws a picture with a grid of squares and small numbers, so the lens shows detail. */
function makePicture(from: string, to: string, width: number, height: number): string {
  const cells = Array.from({ length: 96 }, (_, index) => {
    const x = (index % 12) * (width / 12)
    const y = Math.floor(index / 12) * (height / 8)

    return `<rect x="${String(x + 6)}" y="${String(y + 6)}" width="${String(width / 12 - 12)}" height="${String(height / 8 - 12)}" rx="10" fill="white" fill-opacity="${index % 2 === 0 ? '0.2' : '0.08'}"/><text x="${String(x + width / 24)}" y="${String(y + height / 16 + 6)}" text-anchor="middle" font-family="sans-serif" font-size="${String(height / 30)}" fill="white">${String(index + 1)}</text>`
  }).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(width)}" height="${String(height)}" viewBox="0 0 ${String(width)} ${String(height)}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>${cells}</svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const picture = makePicture('#2563eb', '#9333ea', 1800, 1200)

const image = {
  display: 'block',
  width: '24rem',
  maxWidth: '100%',
  height: 'auto',
  borderRadius: 'var(--frontier-radius-md)',
} as const

const meta = {
  title: 'Components/Magnifier',
  component: Magnifier,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows a lens that follows the pointer over an image and shows the part under it larger. It needs a pointer that hovers, so it does not open on a touch screen. It is built on `CursorCard`.',
      },
    },
  },
  args: {
    children: <img alt="Blue grid of numbered squares" src={picture} style={image} />,
    zoom: 2.5,
    size: 160,
    shape: 'circle',
    disabled: false,
  },
  argTypes: {
    children: { control: false },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
    size: { control: { type: 'number', min: 80, max: 320, step: 20 } },
    zoom: { control: { type: 'number', min: 1.5, max: 6, step: 0.5 } },
    disabled: { control: 'boolean' },
    openDelay: { control: { type: 'number', min: 0, max: 1000, step: 100 } },
    src: { control: false },
  },
} satisfies Meta<typeof Magnifier>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Move the pointer over the image. The lens follows it and shows what is under it larger.',
      },
    },
  },
}

export const Square: TStory = {
  parameters: {
    docs: { description: { story: 'The lens can be a rounded square, and any size.' } },
  },
  args: { shape: 'square', size: 200, zoom: 3 },
}

export const SharperSource: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass `src` to see a sharper file through the lens, while the page loads a small one. Here the page shows a small picture, and the lens shows a large one.',
      },
    },
  },
  args: {
    children: (
      <img
        alt="Blue grid of numbered squares"
        src={makePicture('#2563eb', '#9333ea', 450, 300)}
        style={image}
      />
    ),
    src: makePicture('#2563eb', '#9333ea', 3600, 2400),
    zoom: 4,
  },
}
