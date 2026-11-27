import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Carousel } from './index.js'

const slideSize = 300

function measure(element: HTMLElement): { height: number; left: number; width: number } {
  if (element.classList.contains('frontier-carousel__viewport')) {
    return { height: slideSize, left: 0, width: slideSize }
  }

  if (element.classList.contains('frontier-carousel__content')) {
    return { height: slideSize, left: 0, width: slideSize }
  }

  const index = element.parentElement
    ? Array.from(element.parentElement.children).indexOf(element)
    : 0

  return { height: slideSize, left: index * slideSize, width: slideSize }
}

function installBrowserApis(): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      addEventListener: () => undefined,
      addListener: () => undefined,
      dispatchEvent: () => false,
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: () => undefined,
      removeListener: () => undefined,
    }),
  })

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      public disconnect(): void {
        return undefined
      }

      public observe(): void {
        return undefined
      }

      public takeRecords(): never[] {
        return []
      }

      public unobserve(): void {
        return undefined
      }
    },
  )
}

beforeEach(() => {
  installBrowserApis()
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return measure(this).width
  })
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return measure(this).height
  })
  vi.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return measure(this).left
  })
  vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return measure(this).left
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

function renderCarousel(
  props: Partial<Parameters<typeof Carousel.Root>[0]> = {},
  extra: ReactNode = null,
) {
  return render(
    <Carousel.Root aria-label="Photos" {...props}>
      <Carousel.Content>
        {['One', 'Two', 'Three', 'Four'].map((name, index) => (
          <Carousel.Item key={name} aria-label={`${String(index + 1)} of 4`}>
            {name}
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Dots />
      {extra}
    </Carousel.Root>,
  )
}

function getDots(): HTMLElement[] {
  return screen.getAllByRole('button', { name: /Go to slide/ })
}

describe('Carousel', () => {
  it('renders a named carousel region with a group for each slide', () => {
    renderCarousel()

    const region = screen.getByRole('region', { name: 'Photos' })

    expect(region).toHaveAttribute('aria-roledescription', 'carousel')
    expect(screen.getAllByRole('group', { name: /of 4/ })).toHaveLength(4)
    expect(screen.getByRole('group', { name: '1 of 4' })).toHaveAttribute(
      'aria-roledescription',
      'slide',
    )
  })

  it('shows one dot for each slide and marks the current one', async () => {
    renderCarousel()

    await waitFor(() => {
      expect(getDots()).toHaveLength(4)
    })

    expect(getDots()[0]).toHaveAttribute('aria-current', 'true')
    expect(getDots()[1]).not.toHaveAttribute('aria-current')
  })

  it('moves with the next and previous buttons and reports the slide', async () => {
    const user = userEvent.setup()
    const onIndexChange = vi.fn()
    renderCarousel({ onIndexChange })

    const previous = screen.getByRole('button', { name: 'Previous slide' })
    const next = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => {
      expect(next).toBeEnabled()
    })
    expect(previous).toBeDisabled()

    await user.click(next)

    await waitFor(() => {
      expect(onIndexChange).toHaveBeenLastCalledWith(1)
    })
    expect(getDots()[1]).toHaveAttribute('aria-current', 'true')
    expect(previous).toBeEnabled()

    await user.click(previous)

    await waitFor(() => {
      expect(onIndexChange).toHaveBeenLastCalledWith(0)
    })
  })

  it('disables the next button on the last slide unless it loops', async () => {
    const user = userEvent.setup()
    const { unmount } = renderCarousel({ defaultIndex: 3 })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled()
    })
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled()

    unmount()
    renderCarousel({ defaultIndex: 3, loop: true })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled()
    })

    await user.click(screen.getByRole('button', { name: 'Next slide' }))

    await waitFor(() => {
      expect(getDots()[0]).toHaveAttribute('aria-current', 'true')
    })
  })

  it('starts on the slide it is given', async () => {
    renderCarousel({ defaultIndex: 2 })

    await waitFor(() => {
      expect(getDots()[2]).toHaveAttribute('aria-current', 'true')
    })
  })

  it('jumps to a slide from its dot and lets the dot labels be changed', async () => {
    const user = userEvent.setup()
    render(
      <Carousel.Root aria-label="Photos">
        <Carousel.Content>
          <Carousel.Item>One</Carousel.Item>
          <Carousel.Item>Two</Carousel.Item>
          <Carousel.Item>Three</Carousel.Item>
        </Carousel.Content>
        <Carousel.Dots
          getLabel={(index, count) => `Photo ${String(index + 1)} of ${String(count)}`}
        />
      </Carousel.Root>,
    )

    const third = await screen.findByRole('button', { name: 'Photo 3 of 3' })
    await user.click(third)

    await waitFor(() => {
      expect(third).toHaveAttribute('aria-current', 'true')
    })
  })

  it('moves with the arrow keys and ignores them inside a field', async () => {
    const user = userEvent.setup()
    const onIndexChange = vi.fn()
    renderCarousel({ onIndexChange }, <input aria-label="Caption" />)

    await waitFor(() => {
      expect(getDots()).toHaveLength(4)
    })

    await user.click(screen.getByRole('button', { name: 'Next slide' }))
    await waitFor(() => {
      expect(onIndexChange).toHaveBeenLastCalledWith(1)
    })

    screen.getByRole('button', { name: 'Next slide' }).focus()
    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(onIndexChange).toHaveBeenLastCalledWith(2)
    })

    await user.keyboard('{ArrowLeft}')
    await waitFor(() => {
      expect(onIndexChange).toHaveBeenLastCalledWith(1)
    })

    const calls = onIndexChange.mock.calls.length
    await user.click(screen.getByRole('textbox', { name: 'Caption' }))
    await user.keyboard('{ArrowRight}')

    expect(onIndexChange).toHaveBeenCalledTimes(calls)
  })

  it('swaps the arrow keys for right-to-left text and uses up and down when vertical', async () => {
    const user = userEvent.setup()
    const onIndexChange = vi.fn()
    const { unmount } = renderCarousel({ dir: 'rtl', onIndexChange, defaultIndex: 1 })

    await waitFor(() => {
      expect(getDots()).toHaveLength(4)
    })

    screen.getByRole('button', { name: 'Next slide' }).focus()
    await user.keyboard('{ArrowLeft}')
    await waitFor(() => {
      expect(onIndexChange).toHaveBeenLastCalledWith(2)
    })

    unmount()
    const vertical = vi.fn()
    renderCarousel({ orientation: 'vertical', onIndexChange: vertical })

    await waitFor(() => {
      expect(getDots()).toHaveLength(4)
    })

    screen.getByRole('button', { name: 'Next slide' }).focus()
    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(vertical).toHaveBeenLastCalledWith(1)
    })
  })

  it('follows a controlled index', async () => {
    const { rerender } = render(
      <Carousel.Root aria-label="Photos" index={0}>
        <Carousel.Content>
          <Carousel.Item>One</Carousel.Item>
          <Carousel.Item>Two</Carousel.Item>
          <Carousel.Item>Three</Carousel.Item>
        </Carousel.Content>
        <Carousel.Dots />
      </Carousel.Root>,
    )

    await waitFor(() => {
      expect(getDots()).toHaveLength(3)
    })

    rerender(
      <Carousel.Root aria-label="Photos" index={2}>
        <Carousel.Content>
          <Carousel.Item>One</Carousel.Item>
          <Carousel.Item>Two</Carousel.Item>
          <Carousel.Item>Three</Carousel.Item>
        </Carousel.Content>
        <Carousel.Dots />
      </Carousel.Root>,
    )

    await waitFor(() => {
      expect(getDots()[2]).toHaveAttribute('aria-current', 'true')
    })
  })

  it('does not move when a button handler prevents the default action', async () => {
    const user = userEvent.setup()
    const onIndexChange = vi.fn()
    render(
      <Carousel.Root aria-label="Photos" onIndexChange={onIndexChange}>
        <Carousel.Content>
          <Carousel.Item>One</Carousel.Item>
          <Carousel.Item>Two</Carousel.Item>
        </Carousel.Content>
        <Carousel.Next
          onClick={(event) => {
            event.preventDefault()
          }}
        />
      </Carousel.Root>,
    )

    const next = screen.getByRole('button', { name: 'Next slide' })
    await waitFor(() => {
      expect(next).toBeEnabled()
    })
    await user.click(next)

    expect(onIndexChange).not.toHaveBeenCalled()
  })

  it('lets the button names and appearance be changed', () => {
    render(
      <Carousel.Root aria-label="Photos">
        <Carousel.Content>
          <Carousel.Item>One</Carousel.Item>
        </Carousel.Content>
        <Carousel.Previous aria-label="Foto anterior" variant="ghost" />
        <Carousel.Next aria-label="Foto siguiente" variant="secondary" />
      </Carousel.Root>,
    )

    expect(screen.getByRole('button', { name: 'Foto anterior' })).toHaveClass(
      'frontier-button--ghost',
    )
    expect(screen.getByRole('button', { name: 'Foto siguiente' })).toHaveClass(
      'frontier-button--secondary',
    )
  })

  it('sizes the slides from slidesPerView', () => {
    renderCarousel({ slidesPerView: 2.5 })

    expect(
      screen.getByRole('region', { name: 'Photos' }).style.getPropertyValue('--_slides-per-view'),
    ).toBe('2.5')
  })

  it('forwards refs and native attributes to the parts', () => {
    const rootRef = createRef<HTMLDivElement>()
    const contentRef = createRef<HTMLDivElement>()
    const itemRef = createRef<HTMLDivElement>()
    render(
      <Carousel.Root ref={rootRef} aria-label="Photos" className="custom" data-testid="root">
        <Carousel.Content ref={contentRef} data-testid="content">
          <Carousel.Item ref={itemRef} data-testid="item">
            One
          </Carousel.Item>
        </Carousel.Content>
      </Carousel.Root>,
    )

    expect(rootRef.current).toBe(screen.getByTestId('root'))
    expect(rootRef.current).toHaveClass('frontier-carousel', 'custom')
    expect(rootRef.current).toHaveAttribute('data-orientation', 'horizontal')
    expect(contentRef.current).toBe(screen.getByTestId('content'))
    expect(itemRef.current).toBe(screen.getByTestId('item'))
  })

  it('requires its parts to be inside a carousel', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<Carousel.Content />)).toThrow('inside Carousel.Root')
  })
})
