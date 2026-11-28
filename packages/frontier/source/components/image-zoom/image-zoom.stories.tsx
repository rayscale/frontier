import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Download } from '../../icons/index.js'
import { Button } from '../button/button.js'

import { ImageZoom } from './image-zoom.js'

/** Draws a picture with a gradient and a grid of squares, so zooming in shows detail. */
function makePicture(from: string, to: string, width: number, height: number): string {
  const squares = Array.from({ length: 60 }, (_, index) => {
    const x = (index % 10) * (width / 10)
    const y = Math.floor(index / 10) * (height / 6)

    return `<rect x="${String(x + 8)}" y="${String(y + 8)}" width="${String(width / 10 - 16)}" height="${String(height / 6 - 16)}" rx="12" fill="white" fill-opacity="${index % 2 === 0 ? '0.18' : '0.08'}"/>`
  }).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(width)}" height="${String(height)}" viewBox="0 0 ${String(width)} ${String(height)}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>${squares}<text x="50%" y="52%" text-anchor="middle" font-family="sans-serif" font-size="${String(height / 8)}" font-weight="700" fill="white">${String(width)} × ${String(height)}</text></svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const mountains = makePicture('#2563eb', '#9333ea', 1600, 1000)
const sunset = makePicture('#f97316', '#db2777', 1600, 1000)
const forest = makePicture('#15803d', '#0f766e', 1000, 1400)

const thumbnail = {
  display: 'block',
  width: '16rem',
  height: 'auto',
  borderRadius: 'var(--frontier-radius-md)',
} as const

function ControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true)
        }}
      >
        Open the image from a button
      </Button>
      <ImageZoom open={open} onOpenChange={setOpen}>
        <ImageZoom.Trigger>
          <img src={mountains} alt="Blue mountains" style={thumbnail} />
        </ImageZoom.Trigger>
        <ImageZoom.Content />
      </ImageZoom>
      <span>{open ? 'The image is open.' : 'The image is closed.'}</span>
    </div>
  )
}

const meta = {
  title: 'Components/ImageZoom',
  component: ImageZoom,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows an image larger over a blurred page. The image leaves its place and goes to the middle of the screen. One more press zooms in, dragging moves it, and the keyboard and the wheel zoom too.',
      },
    },
  },
} satisfies Meta<typeof ImageZoom>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Press the image to enlarge it. Press it again to zoom in where you pressed, and drag to move. Escape, the close button, or a press on the background send it back.',
      },
    },
  },
  render: () => (
    <ImageZoom>
      <ImageZoom.Trigger>
        <img src={mountains} alt="Blue mountains at dusk" style={thumbnail} />
      </ImageZoom.Trigger>
      <ImageZoom.Content />
    </ImageZoom>
  ),
}

export const WithActions: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose the toolbar to add your own actions next to the zoom and close buttons, and add a caption.',
      },
    },
  },
  render: () => (
    <ImageZoom>
      <ImageZoom.Trigger>
        <img src={sunset} alt="Sunset over the sea" style={thumbnail} />
      </ImageZoom.Trigger>
      <ImageZoom.Content>
        <ImageZoom.Toolbar>
          <ImageZoom.ZoomOut />
          <ImageZoom.ZoomIn />
          <Button
            size="icon"
            variant="ghost"
            aria-label="Download"
            onClick={() => {
              const link = document.createElement('a')
              link.href = sunset
              link.download = 'sunset.svg'
              link.click()
            }}
          >
            <Download aria-hidden="true" />
          </Button>
          <ImageZoom.Close />
        </ImageZoom.Toolbar>
        <ImageZoom.Caption>Sunset over the sea, taken from the pier.</ImageZoom.Caption>
      </ImageZoom.Content>
    </ImageZoom>
  ),
}

export const Gallery: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Each image has its own `ImageZoom`, so a grid of pictures opens one at a time.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      {[
        { src: mountains, alt: 'Blue mountains' },
        { src: sunset, alt: 'Sunset' },
        { src: forest, alt: 'Green forest' },
      ].map((picture) => (
        <ImageZoom key={picture.alt}>
          <ImageZoom.Trigger>
            <img src={picture.src} alt={picture.alt} style={{ ...thumbnail, width: '9rem' }} />
          </ImageZoom.Trigger>
          <ImageZoom.Content />
        </ImageZoom>
      ))}
    </div>
  ),
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `open` and `onOpenChange` to open the image from somewhere else.',
      },
    },
  },
  render: () => <ControlledExample />,
}
