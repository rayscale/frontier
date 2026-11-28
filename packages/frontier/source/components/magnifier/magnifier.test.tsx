import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Magnifier } from './index.js'

const picture = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
const sharper = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

afterEach(() => {
  cleanup()
})

function renderMagnifier(props: Partial<React.ComponentProps<typeof Magnifier>> = {}) {
  return render(
    <Magnifier {...props}>
      <img alt="Blue mountains" className="photo" src={picture} />
    </Magnifier>,
  )
}

function getImage(): HTMLImageElement {
  return screen.getByAltText<HTMLImageElement>('Blue mountains')
}

function getLens(): HTMLElement {
  const lens = document.querySelector<HTMLElement>('[aria-hidden="true"][style*="width"]')

  if (!lens) {
    throw new Error('The lens is missing.')
  }

  return lens
}

async function hover(image: HTMLElement): Promise<void> {
  image.getBoundingClientRect = () => new DOMRect(0, 0, 200, 100)
  await userEvent.setup().pointer({ target: image, coords: { clientX: 50, clientY: 25 } })
}

describe('Magnifier', () => {
  it('shows the image as it is, with a cursor for looking closely', () => {
    renderMagnifier()

    expect(getImage().getAttribute('src')).toBe(picture)
    expect(getImage().classList.contains('frontier-magnifier')).toBe(true)
    expect(getImage().classList.contains('photo')).toBe(true)
  })

  it('needs an img as its child', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() =>
      render(
        <Magnifier>
          <span>Not an image</span>
        </Magnifier>,
      ),
    ).toThrow('needs one img element')

    error.mockRestore()
  })

  it('opens a lens over the part of the image under the pointer', async () => {
    renderMagnifier({ size: 100, zoom: 3 })
    await hover(getImage())

    await waitFor(() => {
      expect(getLens()).toBeTruthy()
    })

    const view = getLens().firstElementChild as HTMLElement
    expect(view.style.backgroundImage).toContain(picture)
    // The image is 200 by 100 and seen three times larger, so the lens is 600 by 300 behind it.
    expect(view.style.backgroundSize).toBe('600px 300px')
    // The pointer is at 50 by 25, so that spot is moved to the middle of a lens of 100.
    expect(view.style.backgroundPosition).toBe('-100px -25px')
  })

  it('sizes the lens, and makes it a circle or a square', async () => {
    const { unmount } = renderMagnifier({ size: 120 })
    await hover(getImage())
    await waitFor(() => {
      expect(getLens()).toBeTruthy()
    })
    expect(getLens().style.width).toBe('120px')
    expect(getLens().style.height).toBe('120px')
    expect(getLens().style.borderRadius).toBe('var(--frontier-radius-full)')
    unmount()

    renderMagnifier({ shape: 'square' })
    await hover(getImage())
    await waitFor(() => {
      expect(getLens()).toBeTruthy()
    })
    expect(getLens().style.borderRadius).toBe('var(--frontier-radius-md)')
  })

  it('sees a sharper source through the lens', async () => {
    renderMagnifier({ src: sharper })
    await hover(getImage())

    await waitFor(() => {
      expect(getLens()).toBeTruthy()
    })

    expect((getLens().firstElementChild as HTMLElement).style.backgroundImage).toContain(sharper)
  })

  it('does not open when it is disabled', async () => {
    renderMagnifier({ disabled: true })
    await hover(getImage())

    expect(document.querySelector('[aria-hidden="true"][style*="width"]')).toBeNull()
  })

  it('hides the lens from assistive technology', async () => {
    renderMagnifier()
    await hover(getImage())

    await waitFor(() => {
      expect(getLens()).toBeTruthy()
    })

    expect(getLens().getAttribute('aria-hidden')).toBe('true')
  })
})
