import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button.js'

import { ImageZoom } from './index.js'

const picture = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
const sharper = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

function installBrowserApis(): void {
  // jsdom has no animations, no pointer capture, and no layout, so these stand in for them.
  Object.defineProperty(HTMLElement.prototype, 'animate', {
    configurable: true,
    writable: true,
    value: () => ({ cancel: vi.fn(), finished: Promise.resolve() }),
  })
  Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  })
  Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
    configurable: true,
    writable: true,
    value: () => false,
  })
  Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
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

function renderImage(
  props: Partial<React.ComponentProps<typeof ImageZoom>> = {},
  content = <ImageZoom.Content />,
) {
  return render(
    <ImageZoom {...props}>
      <ImageZoom.Trigger>
        <img alt="Blue mountains" src={picture} />
      </ImageZoom.Trigger>
      {content}
    </ImageZoom>,
  )
}

async function openImage(): Promise<HTMLElement> {
  await userEvent.setup().click(screen.getByRole('button', { name: 'Blue mountains' }))

  return screen.findByRole('dialog')
}

function getImage(): HTMLImageElement {
  const image = document.querySelector<HTMLImageElement>('.frontier-image-zoom__image')

  if (!image) {
    throw new Error('The enlarged image is missing.')
  }

  return image
}

function press(element: HTMLElement): void {
  fireEvent.pointerDown(element, { button: 0, clientX: 100, clientY: 100, pointerId: 1 })
  fireEvent.pointerUp(element, { button: 0, clientX: 100, clientY: 100, pointerId: 1 })
}

beforeEach(() => {
  installBrowserApis()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('ImageZoom', () => {
  it('shows the image in a button that opens it', () => {
    renderImage()

    const trigger = screen.getByRole('button', { name: 'Blue mountains' })
    expect(trigger.querySelector('img')?.getAttribute('src')).toBe(picture)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('settles when the images are already loaded, instead of rendering forever', async () => {
    // jsdom never loads an image, so these stand for loaded ones. After many reads the width
    // reports 0, which breaks a loop: a regression then fails the test instead of hanging it.
    const readLimit = 50
    let reads = 0
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true)
    vi.spyOn(HTMLImageElement.prototype, 'naturalHeight', 'get').mockReturnValue(300)
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockImplementation(() => {
      reads += 1

      return reads < readLimit ? 400 : 0
    })

    render(
      <ImageZoom>
        <ImageZoom.Trigger value="one">
          <img alt="One" src={picture} />
        </ImageZoom.Trigger>
        <ImageZoom.Trigger value="two">
          <img alt="Two" src={sharper} />
        </ImageZoom.Trigger>
      </ImageZoom>,
    )
    await act(async () => {
      await Promise.resolve()
    })

    expect(reads).toBeLessThan(readLimit)
  })

  it('needs an img as the child of the trigger', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() =>
      render(
        <ImageZoom>
          <ImageZoom.Trigger>
            <span>Not an image</span>
          </ImageZoom.Trigger>
        </ImageZoom>,
      ),
    ).toThrow('needs one img element')

    error.mockRestore()
  })

  it('opens a dialog named after the image and shows the same image larger', async () => {
    renderImage()

    const dialog = await openImage()

    expect(dialog.getAttribute('aria-label')).toBe('Blue mountains')
    expect(getImage().getAttribute('src')).toBe(picture)
    expect(getImage().getAttribute('alt')).toBe('Blue mountains')
  })

  it('leaves the image in the page empty while the one over the screen is there', async () => {
    renderImage()
    const trigger = screen.getByRole('button', { name: 'Blue mountains' })
    expect(trigger.hasAttribute('data-active')).toBe(false)

    await openImage()
    expect(trigger.hasAttribute('data-active')).toBe(true)

    await userEvent.setup().keyboard('{Escape}')
    await waitFor(() => {
      expect(trigger.hasAttribute('data-active')).toBe(false)
    })
  })

  it('takes a sharper source, a name, and a text for the enlarged image', async () => {
    renderImage({}, <ImageZoom.Content alt="Mountains, large" label="Photo viewer" src={sharper} />)

    const dialog = await openImage()

    expect(dialog.getAttribute('aria-label')).toBe('Photo viewer')
    expect(getImage().getAttribute('src')).toBe(sharper)
    expect(getImage().getAttribute('alt')).toBe('Mountains, large')
  })

  it('has zoom buttons and a close button by default', async () => {
    renderImage()
    await openImage()

    expect(screen.getByRole('group', { name: 'Image controls' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy()
  })

  describe('closing', () => {
    it('closes with the close button', async () => {
      renderImage()
      await openImage()

      await userEvent.setup().click(screen.getByRole('button', { name: 'Close' }))

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull()
      })
    })

    it('closes with Escape', async () => {
      renderImage()
      await openImage()

      await userEvent.setup().keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull()
      })
    })

    it('closes when the background is pressed, and not when the image is', async () => {
      const onOpenChange = vi.fn()
      renderImage({ onOpenChange })
      const dialog = await openImage()
      onOpenChange.mockClear()

      fireEvent.click(getImage())
      expect(onOpenChange).not.toHaveBeenCalled()

      fireEvent.click(dialog)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('reports each change of the open state', async () => {
      const onOpenChange = vi.fn()
      renderImage({ onOpenChange })

      await openImage()
      expect(onOpenChange).toHaveBeenLastCalledWith(true)

      await userEvent.setup().click(screen.getByRole('button', { name: 'Close' }))
      expect(onOpenChange).toHaveBeenLastCalledWith(false)
    })
  })

  describe('zooming', () => {
    it('zooms in where the image is pressed, and out with another press', async () => {
      renderImage()
      await openImage()

      press(getImage())
      expect(getImage().style.transform).toContain('scale(2)')
      expect(document.querySelector('.frontier-image-zoom')?.hasAttribute('data-zoomed')).toBe(true)

      press(getImage())
      expect(getImage().style.transform).toContain('scale(1)')
    })

    it('does not zoom when the pointer was dragged', async () => {
      renderImage()
      await openImage()

      fireEvent.pointerDown(getImage(), { button: 0, clientX: 100, clientY: 100, pointerId: 1 })
      fireEvent.pointerMove(getImage(), { clientX: 140, clientY: 100, pointerId: 1 })
      fireEvent.pointerUp(getImage(), { button: 0, clientX: 140, clientY: 100, pointerId: 1 })

      expect(getImage().style.transform).toContain('scale(1)')
    })

    it('zooms with the buttons and stops at the limits', async () => {
      const user = userEvent.setup()
      renderImage({ maxZoom: 2 })
      await openImage()

      const zoomIn = screen.getByRole<HTMLButtonElement>('button', { name: 'Zoom in' })
      const zoomOut = screen.getByRole<HTMLButtonElement>('button', { name: 'Zoom out' })
      expect(zoomOut.disabled).toBe(true)

      await user.click(zoomIn)
      expect(getImage().style.transform).toContain('scale(1.5)')

      await user.click(zoomIn)
      expect(getImage().style.transform).toContain('scale(2)')
      expect(zoomIn.disabled).toBe(true)

      await user.click(zoomOut)
      expect(getImage().style.transform).toContain('scale(1.33')
    })

    it('zooms with the keys, and moves a zoomed image with the arrows', async () => {
      const user = userEvent.setup()
      renderImage()
      const dialog = await openImage()
      dialog.focus()

      await user.keyboard('+')
      expect(getImage().style.transform).toContain('scale(1.5)')

      await user.keyboard('{ArrowLeft}')
      expect(getImage().style.transform).toContain('translate(48px')

      await user.keyboard('0')
      expect(getImage().style.transform).toMatch(/^translate\(0px(, 0px)?\) scale\(1\)$/)

      await user.keyboard('-')
      expect(getImage().style.transform).toMatch(/scale\(1\)$/)
    })

    it('zooms with the wheel', async () => {
      renderImage()
      const dialog = await openImage()

      fireEvent.wheel(dialog, { deltaY: -300 })

      expect(getImage().style.transform).toMatch(/scale\(1\.5/)
    })

    it('starts at its resting size every time it opens', async () => {
      const user = userEvent.setup()
      renderImage()
      const dialog = await openImage()
      dialog.focus()
      await user.keyboard('+')
      await user.click(screen.getByRole('button', { name: 'Close' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull()
      })

      await openImage()

      expect(getImage().style.transform).toMatch(/scale\(1\)$/)
    })
  })

  describe('customizing', () => {
    it('replaces the default controls with the parts you give it', async () => {
      const onDownload = vi.fn()
      renderImage(
        {},
        <ImageZoom.Content>
          <ImageZoom.Toolbar placement="bottom">
            <ImageZoom.ZoomIn />
            <Button size="icon" variant="ghost" aria-label="Download" onClick={onDownload} />
            <ImageZoom.Close />
          </ImageZoom.Toolbar>
          <ImageZoom.Caption>Taken from the pier.</ImageZoom.Caption>
        </ImageZoom.Content>,
      )
      await openImage()

      expect(screen.queryByRole('button', { name: 'Zoom out' })).toBeNull()
      expect(
        screen.getByRole('group', { name: 'Image controls' }).getAttribute('data-placement'),
      ).toBe('bottom')
      expect(screen.getByText('Taken from the pier.')).toBeTruthy()

      await userEvent.setup().click(screen.getByRole('button', { name: 'Download' }))
      expect(onDownload).toHaveBeenCalledTimes(1)
    })

    it('lets onClick of a button stop what it does', async () => {
      renderImage(
        {},
        <ImageZoom.Content>
          <ImageZoom.Toolbar>
            <ImageZoom.Close
              onClick={(event) => {
                event.preventDefault()
              }}
            />
          </ImageZoom.Toolbar>
        </ImageZoom.Content>,
      )
      await openImage()

      await userEvent.setup().click(screen.getByRole('button', { name: 'Close' }))

      expect(screen.getByRole('dialog')).toBeTruthy()
    })

    it('works controlled', async () => {
      function Controlled() {
        const [open, setOpen] = useState(true)

        return (
          <>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
              }}
            >
              Hide
            </button>
            <ImageZoom open={open} onOpenChange={setOpen}>
              <ImageZoom.Trigger>
                <img alt="Blue mountains" src={picture} />
              </ImageZoom.Trigger>
              <ImageZoom.Content />
            </ImageZoom>
          </>
        )
      }

      render(<Controlled />)
      expect(await screen.findByRole('dialog')).toBeTruthy()

      act(() => {
        screen.getByText('Hide').click()
      })

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull()
      })
    })

    it('forwards the class name of the content', async () => {
      renderImage({}, <ImageZoom.Content className="extra" />)

      const dialog = await openImage()

      expect(dialog.classList.contains('extra')).toBe(true)
    })
  })
})
