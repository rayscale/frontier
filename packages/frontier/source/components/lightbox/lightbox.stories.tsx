import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Download } from '../../icons/index.js'
import { Button } from '../button/button.js'

import { Lightbox } from './lightbox.js'
import type { TLightboxItem } from './types.js'

/** Draws a picture with a gradient and a grid of squares, so zooming in shows detail. */
function makePicture(
  from: string,
  to: string,
  width: number,
  height: number,
  label: string,
): string {
  const squares = Array.from({ length: 60 }, (_, index) => {
    const x = (index % 10) * (width / 10)
    const y = Math.floor(index / 10) * (height / 6)

    return `<rect x="${String(x + 8)}" y="${String(y + 8)}" width="${String(width / 10 - 16)}" height="${String(height / 6 - 16)}" rx="12" fill="white" fill-opacity="${index % 2 === 0 ? '0.18' : '0.08'}"/>`
  }).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(width)}" height="${String(height)}" viewBox="0 0 ${String(width)} ${String(height)}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>${squares}<text x="50%" y="52%" text-anchor="middle" font-family="sans-serif" font-size="${String(height / 5)}" font-weight="700" fill="white">${label}</text></svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const palette: readonly (readonly [string, string, string])[] = [
  ['#2563eb', '#9333ea', 'Mountains'],
  ['#f97316', '#db2777', 'Sunset'],
  ['#15803d', '#0f766e', 'Forest'],
  ['#0ea5e9', '#2563eb', 'Ocean'],
  ['#eab308', '#f97316', 'Desert'],
  ['#9333ea', '#db2777', 'Dusk'],
]

const photos: readonly TLightboxItem[] = palette.map(([from, to, name], index) => ({
  id: name.toLowerCase(),
  src: makePicture(from, to, index % 3 === 2 ? 1000 : 1600, index % 3 === 2 ? 1400 : 1000, name),
  thumbnail: makePicture(from, to, 320, 200, name),
  alt: name,
  caption: `${name}, picture ${String(index + 1)} of ${String(palette.length)}.`,
}))

const thumbnail = {
  display: 'block',
  width: '9rem',
  height: '6rem',
  objectFit: 'cover',
  borderRadius: 'var(--frontier-radius-md)',
} as const

function Grid() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', maxWidth: '30rem' }}>
      {photos.map((photo) => (
        <Lightbox.Trigger key={photo.id} value={photo.id}>
          <img alt={photo.alt} src={photo.thumbnail} style={thumbnail} />
        </Lightbox.Trigger>
      ))}
    </div>
  )
}

function ControlledExample() {
  const [value, setValue] = useState('forest')

  return (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
      <span>Shown picture: {value}</span>
      <Lightbox items={photos} value={value} onValueChange={setValue}>
        <Grid />
        <Lightbox.Content />
      </Lightbox>
    </div>
  )
}

const meta = {
  title: 'Components/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows a gallery one picture at a time over a blurred page. The picture flies from the small image that was pressed, people zoom it and go through the others, and it flies back to the one that is shown when it closes. It is built on `ImageZoom`.',
      },
    },
  },
  args: {
    items: photos,
  },
  argTypes: {
    items: { control: false },
    loop: { control: 'boolean' },
    maxZoom: { control: { type: 'number', min: 1, max: 8 } },
    open: { control: false },
    value: { control: false },
  },
} satisfies Meta<typeof Lightbox>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Press a picture. The arrow keys, the buttons, and the strip go to the others, Home and End jump to the first and the last, and the same zoom as `ImageZoom` works on each one.',
      },
    },
  },
  render: (args) => (
    <Lightbox {...args}>
      <Grid />
      <Lightbox.Content />
    </Lightbox>
  ),
}

export const Loop: TStory = {
  parameters: {
    docs: {
      description: { story: 'With `loop`, the last picture goes on to the first.' },
    },
  },
  args: { loop: true },
  render: (args) => (
    <Lightbox {...args}>
      <Grid />
      <Lightbox.Content />
    </Lightbox>
  ),
}

export const CustomControls: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose the content to choose the controls: here the toolbar has a download, and the strip is left out.',
      },
    },
  },
  render: (args) => (
    <Lightbox {...args}>
      <Grid />
      <Lightbox.Content>
        <Lightbox.Toolbar placement="bottom">
          <Lightbox.Counter />
          <Lightbox.ZoomOut />
          <Lightbox.ZoomIn />
          <Button size="icon" variant="ghost" aria-label="Download">
            <Download aria-hidden="true" />
          </Button>
          <Lightbox.Close />
        </Lightbox.Toolbar>
        <Lightbox.Previous />
        <Lightbox.Next />
      </Lightbox.Content>
    </Lightbox>
  ),
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `value` and `onValueChange` to keep the shown picture in the page.',
      },
    },
  },
  render: () => <ControlledExample />,
}
