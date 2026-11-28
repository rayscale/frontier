import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type KeyboardEvent, useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Lightbox, type TLightboxItem, type TLightboxProps } from './index.js'

const gif = (colors: string): string => `data:image/gif;base64,${colors}`
const items: readonly TLightboxItem[] = [
  {
    id: 'one',
    src: gif('R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='),
    alt: 'First picture',
    caption: 'The first one.',
  },
  {
    id: 'two',
    src: gif('R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='),
    alt: 'Second picture',
  },
  {
    id: 'three',
    src: gif('R0lGODlhAQABAIAAAP8AAAAAACwAAAAAAQABAAACAkQBADs='),
    alt: 'Third picture',
    caption: 'The third one.',
  },
]

function installBrowserApis(): void {
  // jsdom has no animations, no pointer capture, no scrolling into view, and no layout.
  for (const [name, value] of [
    ['animate', () => ({ cancel: vi.fn(), finished: Promise.resolve() })],
    ['setPointerCapture', vi.fn()],
    ['hasPointerCapture', () => false],
    ['releasePointerCapture', vi.fn()],
  ] as const) {
    Object.defineProperty(HTMLElement.prototype, name, {
      configurable: true,
      writable: true,
      value,
    })
  }

  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return this instanceof HTMLImageElement ? 400 : 0
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return this instanceof HTMLImageElement ? 300 : 0
    },
  })
  Object.defineProperty(HTMLImageElement.prototype, 'decode', {
    configurable: true,
    writable: true,
    value: () => Promise.resolve(),
  })
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      addEventListener: () => undefined,
      matches: false,
      media: query,
      removeEventListener: () => undefined,
    }),
  })
}

function renderLightbox(props: Partial<TLightboxProps> = {}, content = <Lightbox.Content />) {
  return render(
    <Lightbox items={items} {...props}>
      {items.map((item) => (
        <Lightbox.Trigger key={item.id} value={item.id}>
          <img alt={item.alt} src={item.src} />
        </Lightbox.Trigger>
      ))}
      {content}
    </Lightbox>,
  )
}

async function openPicture(name: string): Promise<HTMLElement> {
  await userEvent.setup().click(screen.getByRole('button', { name }))

  return screen.findByRole('dialog')
}

function getShownImage(): HTMLImageElement {
  const image = document.querySelector<HTMLImageElement>('.frontier-image-zoom__image')

  if (!image) {
    throw new Error('The enlarged picture is missing.')
  }

  return image
}

beforeEach(() => {
  installBrowserApis()
})

afterEach(() => {
  cleanup()
})

describe('Lightbox', () => {
  it('opens the picture of the image that was pressed', async () => {
    renderLightbox()

    const dialog = await openPicture('Second picture')

    expect(dialog.getAttribute('aria-label')).toBe('Second picture')
    expect(getShownImage().getAttribute('src')).toBe(items[1]?.src)
    expect(getShownImage().getAttribute('alt')).toBe('Second picture')
    expect(screen.getByText('2 of 3')).toBeTruthy()
  })

  it('shows the caption of the picture, and nothing when it has none', async () => {
    renderLightbox()
    await openPicture('First picture')
    expect(screen.getByText('The first one.')).toBeTruthy()

    await userEvent.setup().click(screen.getByRole('button', { name: 'Next image' }))
    expect(screen.queryByText('The first one.')).toBeNull()
    expect(document.querySelector('.frontier-lightbox__caption')).toBeNull()
  })

  it('goes to the next and the previous picture with the buttons', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderLightbox({ onValueChange })
    await openPicture('First picture')

    await user.click(screen.getByRole('button', { name: 'Next image' }))
    expect(getShownImage().getAttribute('alt')).toBe('Second picture')
    expect(onValueChange).toHaveBeenLastCalledWith('two')
    // The picture changes once the next one has loaded.
    await waitFor(() => {
      expect(getShownImage().getAttribute('src')).toBe(items[1]?.src)
    })

    await user.click(screen.getByRole('button', { name: 'Previous image' }))
    expect(getShownImage().getAttribute('alt')).toBe('First picture')
  })

  it('stops at the ends unless it loops', async () => {
    const user = userEvent.setup()
    renderLightbox()
    await openPicture('First picture')

    expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Previous image' }).disabled).toBe(
      true,
    )

    await user.click(screen.getByRole('button', { name: 'Next image' }))
    await user.click(screen.getByRole('button', { name: 'Next image' }))

    expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Next image' }).disabled).toBe(
      true,
    )
  })

  it('goes round when it loops', async () => {
    const user = userEvent.setup()
    renderLightbox({ loop: true })
    await openPicture('Third picture')

    await user.click(screen.getByRole('button', { name: 'Next image' }))
    expect(getShownImage().getAttribute('alt')).toBe('First picture')

    await user.click(screen.getByRole('button', { name: 'Previous image' }))
    expect(getShownImage().getAttribute('alt')).toBe('Third picture')
  })

  it('goes through the pictures with the arrow keys, Home, and End', async () => {
    const user = userEvent.setup()
    renderLightbox()
    const dialog = await openPicture('Second picture')
    dialog.focus()

    await user.keyboard('{ArrowRight}')
    expect(getShownImage().getAttribute('alt')).toBe('Third picture')

    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(getShownImage().getAttribute('alt')).toBe('First picture')

    await user.keyboard('{End}')
    expect(getShownImage().getAttribute('alt')).toBe('Third picture')

    await user.keyboard('{Home}')
    expect(getShownImage().getAttribute('alt')).toBe('First picture')
  })

  it('leaves the arrow keys to the picture while it is zoomed', async () => {
    const user = userEvent.setup()
    renderLightbox()
    const dialog = await openPicture('Second picture')
    dialog.focus()

    await user.keyboard('+')
    await user.keyboard('{ArrowRight}')

    expect(getShownImage().getAttribute('alt')).toBe('Second picture')
  })

  it('shows every picture in a strip that jumps to one', async () => {
    const user = userEvent.setup()
    renderLightbox()
    await openPicture('First picture')

    const strip = screen.getByRole('group', { name: 'Thumbnails' })
    const buttons = Array.from(strip.querySelectorAll('button'))
    expect(buttons).toHaveLength(3)
    expect(buttons[0]?.getAttribute('aria-current')).toBe('true')

    const third = buttons[2]
    if (!third) {
      throw new Error('The third thumbnail is missing.')
    }

    await user.click(third)

    expect(getShownImage().getAttribute('alt')).toBe('Third picture')
    expect(buttons[2]?.getAttribute('aria-current')).toBe('true')
  })

  it('leaves the strip out when thumbnails is false', async () => {
    renderLightbox({}, <Lightbox.Content thumbnails={false} />)
    await openPicture('First picture')

    expect(screen.queryByRole('group', { name: 'Thumbnails' })).toBeNull()
  })

  it('has no navigation or strip with a single picture', async () => {
    render(
      <Lightbox items={items.slice(0, 1)}>
        <Lightbox.Trigger value="one">
          <img alt="First picture" src={items[0]?.src} />
        </Lightbox.Trigger>
        <Lightbox.Content />
      </Lightbox>,
    )
    await openPicture('First picture')

    expect(screen.queryByRole('button', { name: 'Next image' })).toBeNull()
    expect(screen.queryByRole('group', { name: 'Thumbnails' })).toBeNull()
    expect(screen.queryByText('1 of 1')).toBeNull()
  })

  it('works controlled', async () => {
    const user = userEvent.setup()

    function Controlled() {
      const [value, setValue] = useState('three')

      return (
        <>
          <span data-testid="value">{value}</span>
          <Lightbox items={items} value={value} onValueChange={setValue}>
            <Lightbox.Trigger value="one">
              <img alt="First picture" src={items[0]?.src} />
            </Lightbox.Trigger>
            <Lightbox.Content />
          </Lightbox>
        </>
      )
    }

    render(<Controlled />)
    await user.click(screen.getByRole('button', { name: 'First picture' }))
    await screen.findByRole('dialog')
    expect(screen.getByTestId('value').textContent).toBe('one')

    await user.click(screen.getByRole('button', { name: 'Next image' }))
    expect(screen.getByTestId('value').textContent).toBe('two')
  })

  it('opens at the picture that defaultValue names', async () => {
    render(
      <Lightbox defaultOpen defaultValue="three" items={items}>
        <Lightbox.Content />
      </Lightbox>,
    )

    await screen.findByRole('dialog')

    expect(getShownImage().getAttribute('alt')).toBe('Third picture')
  })

  it('replaces the default controls with the parts you give it', async () => {
    renderLightbox(
      {},
      <Lightbox.Content>
        <Lightbox.Toolbar>
          <Lightbox.Counter />
          <Lightbox.Close />
        </Lightbox.Toolbar>
        <Lightbox.Next />
      </Lightbox.Content>,
    )
    await openPicture('First picture')

    expect(screen.getByText('1 of 3')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Next image' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Previous image' })).toBeNull()
    expect(screen.queryByRole('group', { name: 'Thumbnails' })).toBeNull()
  })

  it('calls onKeyDown of the content after it has used the keys', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn<(event: KeyboardEvent<HTMLDivElement>) => void>()
    renderLightbox({}, <Lightbox.Content onKeyDown={onKeyDown} />)
    const dialog = await openPicture('First picture')
    dialog.focus()

    await user.keyboard('{ArrowRight}')

    expect(onKeyDown).toHaveBeenCalled()
    expect(onKeyDown.mock.calls[0]?.[0].defaultPrevented).toBe(true)
  })

  it('closes with Escape and the close button', async () => {
    const user = userEvent.setup()
    renderLightbox()
    await openPicture('First picture')

    await user.click(screen.getByRole('button', { name: 'Close' }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })

    await openPicture('First picture')
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('needs to be used inside a lightbox', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<Lightbox.Counter />)).toThrow('must be used within Lightbox')

    error.mockRestore()
  })
})
