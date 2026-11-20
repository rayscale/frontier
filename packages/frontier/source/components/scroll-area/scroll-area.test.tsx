import { render, screen, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ScrollArea as PublicScrollArea, ScrollArea } from './index.js'

function mockOverflow({
  scrollHeight,
  clientHeight,
  scrollWidth,
  clientWidth,
}: {
  scrollHeight: number
  clientHeight: number
  scrollWidth: number
  clientWidth: number
}): void {
  vi.spyOn(Element.prototype, 'scrollHeight', 'get').mockReturnValue(scrollHeight)
  vi.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(clientHeight)
  vi.spyOn(Element.prototype, 'scrollWidth', 'get').mockReturnValue(scrollWidth)
  vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(clientWidth)
}

function getRoot(container: HTMLElement): HTMLElement {
  const root = container.firstElementChild

  if (!(root instanceof HTMLElement)) {
    throw new Error('Expected ScrollArea to render a root element')
  }

  return root
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ScrollArea', () => {
  describe('rendering', () => {
    it('renders children inside the viewport by default', () => {
      render(
        <ScrollArea aria-label="Messages">
          <p>First message</p>
        </ScrollArea>,
      )
      const viewport = screen.getByLabelText('Messages')
      expect(viewport).toContainElement(screen.getByText('First message'))
    })

    it('applies className and style to the root and other attributes to the viewport', () => {
      const { container } = render(
        <ScrollArea
          className="custom-root"
          style={{ height: 120 }}
          id="notes"
          aria-label="Notes"
          data-testid="notes-viewport"
        >
          Content
        </ScrollArea>,
      )
      const root = getRoot(container)
      expect(root).toHaveClass('frontier-scroll-area', 'custom-root')
      expect(root.style.height).toBe('120px')
      expect(root).not.toHaveAttribute('id')

      const viewport = screen.getByTestId('notes-viewport')
      expect(viewport).toHaveClass('frontier-scroll-area__viewport')
      expect(viewport).toHaveAttribute('id', 'notes')
      expect(viewport).toHaveAttribute('aria-label', 'Notes')
    })

    it('forwards the ref to the scrollable viewport element', () => {
      const ref = createRef<HTMLDivElement>()
      render(<ScrollArea ref={ref}>Content</ScrollArea>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
      expect(ref.current).toHaveClass('frontier-scroll-area__viewport')
    })

    it('is exported from the package entry point', () => {
      expect(PublicScrollArea).toBe(ScrollArea)
    })
  })

  describe('orientation', () => {
    it('clips horizontal overflow for a vertical scroll area', () => {
      render(<ScrollArea aria-label="Vertical">Content</ScrollArea>)
      const viewport = screen.getByLabelText('Vertical')
      expect(viewport.style.overflowX).toBe('hidden')
      expect(viewport.style.overflowY).not.toBe('hidden')
    })

    it('clips vertical overflow for a horizontal scroll area', () => {
      render(
        <ScrollArea aria-label="Horizontal" orientation="horizontal">
          Content
        </ScrollArea>,
      )
      const viewport = screen.getByLabelText('Horizontal')
      expect(viewport.style.overflowY).toBe('hidden')
      expect(viewport.style.overflowX).not.toBe('hidden')
    })

    it('constrains the content to the viewport width for a vertical scroll area', () => {
      const { container } = render(<ScrollArea aria-label="Vertical">Content</ScrollArea>)
      const content = container.querySelector('.frontier-scroll-area__content')
      expect(content).toHaveClass('frontier-scroll-area__content--vertical')
      expect(content).toHaveStyle({ minWidth: '100%' })
    })

    it('does not constrain the content width when horizontal scrolling is enabled', () => {
      const { container } = render(
        <ScrollArea aria-label="Horizontal" orientation="horizontal">
          Content
        </ScrollArea>,
      )
      const content = container.querySelector('.frontier-scroll-area__content')
      expect(content).not.toHaveClass('frontier-scroll-area__content--vertical')
      expect(content).not.toHaveStyle({ minWidth: '100%' })
    })

    it('does not clip either axis when both directions scroll', () => {
      render(
        <ScrollArea aria-label="Both" orientation="both">
          Content
        </ScrollArea>,
      )
      const viewport = screen.getByLabelText('Both')
      expect(viewport.style.overflowX).not.toBe('hidden')
      expect(viewport.style.overflowY).not.toBe('hidden')
    })
  })

  describe('scrollbars', () => {
    it('hides both scrollbar orientations by default, even when content overflows', () => {
      mockOverflow({
        scrollHeight: 500,
        clientHeight: 200,
        scrollWidth: 500,
        clientWidth: 200,
      })

      const { container } = render(<ScrollArea orientation="both">Content</ScrollArea>)

      expect(container.querySelector('.frontier-scroll-area__scrollbar')).toBeNull()
    })

    it.each([
      ['vertical', 'vertical'],
      ['horizontal', 'horizontal'],
    ] as const)(
      'renders only the %s scrollbar when that axis overflows',
      async (scrollbar, expectedOrientation) => {
        mockOverflow({
          scrollHeight: 500,
          clientHeight: 200,
          scrollWidth: 500,
          clientWidth: 200,
        })

        const { container } = render(
          <ScrollArea orientation="both" scrollbar={scrollbar}>
            Content
          </ScrollArea>,
        )

        await waitFor(() => {
          expect(
            container.querySelector(`.frontier-scroll-area__scrollbar--${expectedOrientation}`),
          ).not.toBeNull()
        })
        expect(
          container.querySelector(
            `.frontier-scroll-area__scrollbar--${expectedOrientation === 'vertical' ? 'horizontal' : 'vertical'}`,
          ),
        ).toBeNull()
      },
    )

    it('renders both scrollbars and their corner when both axes overflow', async () => {
      mockOverflow({
        scrollHeight: 500,
        clientHeight: 200,
        scrollWidth: 500,
        clientWidth: 200,
      })

      const { container } = render(
        <ScrollArea orientation="both" scrollbar="both">
          Content
        </ScrollArea>,
      )

      await waitFor(() => {
        expect(container.querySelectorAll('.frontier-scroll-area__scrollbar')).toHaveLength(2)
        expect(container.querySelector('.frontier-scroll-area__corner')).not.toBeNull()
      })
    })

    it('does not render a scrollbar when its orientation has no overflow', async () => {
      mockOverflow({
        scrollHeight: 200,
        clientHeight: 200,
        scrollWidth: 200,
        clientWidth: 200,
      })

      const { container } = render(
        <ScrollArea orientation="both" scrollbar="both">
          Content
        </ScrollArea>,
      )

      await waitFor(() => {
        expect(container.querySelector('.frontier-scroll-area__scrollbar')).toBeNull()
      })
    })

    it('does not render a scrollbar for an axis that is not scrollable', async () => {
      mockOverflow({
        scrollHeight: 500,
        clientHeight: 200,
        scrollWidth: 500,
        clientWidth: 200,
      })

      const { container } = render(
        <ScrollArea orientation="horizontal" scrollbar="vertical">
          Content
        </ScrollArea>,
      )

      await waitFor(() => {
        expect(container.querySelector('.frontier-scroll-area__scrollbar')).toBeNull()
      })
    })

    it('keeps legacy visibility values working', async () => {
      mockOverflow({
        scrollHeight: 500,
        clientHeight: 200,
        scrollWidth: 500,
        clientWidth: 200,
      })

      const { container, rerender } = render(
        <ScrollArea orientation="both" scrollbar="both">
          Content
        </ScrollArea>,
      )

      await waitFor(() => {
        expect(container.querySelectorAll('.frontier-scroll-area__scrollbar')).toHaveLength(2)
      })

      rerender(
        <ScrollArea orientation="both" scrollbar="auto">
          Content
        </ScrollArea>,
      )

      expect(getRoot(container)).toHaveClass('frontier-scroll-area--auto-scrollbar')

      rerender(
        <ScrollArea orientation="both" scrollbar="none">
          Content
        </ScrollArea>,
      )

      expect(container.querySelector('.frontier-scroll-area__scrollbar')).toBeNull()
    })

    it('keeps viewport focus and programmatic scrolling available when bars are hidden', () => {
      render(
        <ScrollArea aria-label="Scrollable content" tabIndex={0}>
          Content
        </ScrollArea>,
      )

      const viewport = screen.getByLabelText('Scrollable content')
      expect(viewport).toHaveClass('base-ui-disable-scrollbar')
      expect(viewport).toHaveAttribute('tabindex', '0')
      viewport.scrollTop = 40
      viewport.scrollLeft = 20
      expect(viewport.scrollTop).toBe(40)
      expect(viewport.scrollLeft).toBe(20)
    })
  })

  describe('fade edges', () => {
    it('does not apply the fade class by default', () => {
      const { container } = render(<ScrollArea>Content</ScrollArea>)
      expect(getRoot(container)).not.toHaveClass('frontier-scroll-area--fade')
    })

    it('applies the fade class when the fade edge effect is enabled', () => {
      const { container } = render(<ScrollArea edgeEffect="fade">Content</ScrollArea>)
      expect(getRoot(container)).toHaveClass('frontier-scroll-area--fade')
    })

    it('sets the edge size as a custom property on the root', () => {
      const { container } = render(
        <ScrollArea edgeEffect="fade" edgeEffectSize="2rem">
          Content
        </ScrollArea>,
      )
      expect(getRoot(container).style.getPropertyValue('--_scroll-area-edge-size')).toBe('2rem')
    })

    it('keeps a custom style alongside the edge size variable', () => {
      const { container } = render(
        <ScrollArea edgeEffect="fade" edgeEffectSize="16px" style={{ maxHeight: 200 }}>
          Content
        </ScrollArea>,
      )
      const root = getRoot(container)
      expect(root.style.maxHeight).toBe('200px')
      expect(root.style.getPropertyValue('--_scroll-area-edge-size')).toBe('16px')
    })
  })

  describe('edge effects', () => {
    function getEdgeOverlays(container: HTMLElement): string[] {
      return Array.from(
        container.querySelectorAll('.frontier-scroll-area__edge'),
        (overlay) =>
          Array.from(overlay.classList).find((className) =>
            className.startsWith('frontier-scroll-area__edge--'),
          ) ?? '',
      )
    }

    it('applies no edge effect by default', () => {
      const { container } = render(<ScrollArea>Content</ScrollArea>)
      const root = getRoot(container)
      expect(root).not.toHaveClass('frontier-scroll-area--fade')
      expect(root).not.toHaveClass('frontier-scroll-area--blur')
      expect(getEdgeOverlays(container)).toEqual([])
    })

    it('applies the fade class without overlays for edgeEffect="fade"', () => {
      const { container } = render(<ScrollArea edgeEffect="fade">Content</ScrollArea>)
      expect(getRoot(container)).toHaveClass('frontier-scroll-area--fade')
      expect(getEdgeOverlays(container)).toEqual([])
    })

    it('renders vertical overlays only for a vertical orientation', () => {
      const { container } = render(
        <ScrollArea edgeEffect="blur" orientation="vertical">
          Content
        </ScrollArea>,
      )
      expect(getRoot(container)).toHaveClass('frontier-scroll-area--blur')
      expect(getEdgeOverlays(container)).toEqual([
        'frontier-scroll-area__edge--top',
        'frontier-scroll-area__edge--bottom',
      ])
    })

    it('renders horizontal overlays only for a horizontal orientation', () => {
      const { container } = render(
        <ScrollArea edgeEffect="blur" orientation="horizontal">
          Content
        </ScrollArea>,
      )
      expect(getEdgeOverlays(container)).toEqual([
        'frontier-scroll-area__edge--start',
        'frontier-scroll-area__edge--end',
      ])
    })

    it('renders overlays on all four edges for a bidirectional orientation', () => {
      const { container } = render(
        <ScrollArea edgeEffect="blur" orientation="both">
          Content
        </ScrollArea>,
      )
      expect(getEdgeOverlays(container)).toEqual([
        'frontier-scroll-area__edge--top',
        'frontier-scroll-area__edge--bottom',
        'frontier-scroll-area__edge--start',
        'frontier-scroll-area__edge--end',
      ])
    })

    it('renders empty overlays that are not focusable', () => {
      const { container } = render(
        <ScrollArea edgeEffect="blur" orientation="both">
          Content
        </ScrollArea>,
      )
      const overlays = container.querySelectorAll('.frontier-scroll-area__edge')
      overlays.forEach((overlay) => {
        expect(overlay).not.toHaveAttribute('tabindex')
        expect(overlay).toBeEmptyDOMElement()
      })
    })

    it('sets the edge size from edgeEffectSize', () => {
      const { container } = render(
        <ScrollArea edgeEffect="blur" edgeEffectSize="2rem">
          Content
        </ScrollArea>,
      )
      expect(getRoot(container).style.getPropertyValue('--_scroll-area-edge-size')).toBe('2rem')
    })

    it('keeps a custom style alongside the edge size variable', () => {
      const { container } = render(
        <ScrollArea edgeEffect="blur" edgeEffectSize="16px" style={{ maxHeight: 200 }}>
          Content
        </ScrollArea>,
      )
      const root = getRoot(container)
      expect(root.style.maxHeight).toBe('200px')
      expect(root.style.getPropertyValue('--_scroll-area-edge-size')).toBe('16px')
    })

    it('marks the overflowing edge for blur so overlays track overflow', async () => {
      mockOverflow({
        scrollHeight: 500,
        clientHeight: 200,
        scrollWidth: 100,
        clientWidth: 100,
      })
      const { container } = render(<ScrollArea edgeEffect="blur">Content</ScrollArea>)
      const root = getRoot(container)
      await waitFor(() => expect(root).toHaveAttribute('data-overflow-y-end'))
      expect(root).not.toHaveAttribute('data-overflow-y-start')
    })

    it('does not mark an edge when content fits the viewport', () => {
      mockOverflow({
        scrollHeight: 100,
        clientHeight: 100,
        scrollWidth: 100,
        clientWidth: 100,
      })
      const { container } = render(<ScrollArea edgeEffect="blur">Content</ScrollArea>)
      const root = getRoot(container)
      expect(root).not.toHaveAttribute('data-overflow-y-end')
      expect(root).not.toHaveAttribute('data-overflow-y-start')
    })
  })

  describe('overflow state', () => {
    it('reports no overflow when content fits the viewport', () => {
      mockOverflow({
        scrollHeight: 100,
        clientHeight: 100,
        scrollWidth: 100,
        clientWidth: 100,
      })
      const { container } = render(<ScrollArea edgeEffect="fade">Content</ScrollArea>)
      const root = getRoot(container)
      expect(root).not.toHaveAttribute('data-has-overflow-y')
      expect(root).not.toHaveAttribute('data-overflow-y-end')
    })

    it('reports vertical overflow at the end when content extends below the viewport', async () => {
      mockOverflow({
        scrollHeight: 500,
        clientHeight: 200,
        scrollWidth: 100,
        clientWidth: 100,
      })
      const { container } = render(<ScrollArea edgeEffect="fade">Content</ScrollArea>)
      const root = getRoot(container)
      await waitFor(() => expect(root).toHaveAttribute('data-has-overflow-y'))
      expect(root).toHaveAttribute('data-overflow-y-end')
      expect(root).not.toHaveAttribute('data-overflow-y-start')
    })

    it('keeps overflow detection when no scrollbar orientation is requested', async () => {
      mockOverflow({
        scrollHeight: 500,
        clientHeight: 200,
        scrollWidth: 500,
        clientWidth: 200,
      })
      const { container } = render(<ScrollArea orientation="both">Content</ScrollArea>)

      const root = getRoot(container)
      await waitFor(() => {
        expect(root).toHaveAttribute('data-has-overflow-y')
        expect(root).toHaveAttribute('data-has-overflow-x')
      })
      expect(
        container.querySelector(
          '.frontier-scroll-area__scrollbar, .frontier-scroll-area__thumb, .frontier-scroll-area__corner',
        ),
      ).toBeNull()
    })
  })

  describe('native attributes', () => {
    it('forwards event handlers to the viewport', () => {
      const onScroll = vi.fn()
      render(
        <ScrollArea aria-label="Feed" onScroll={onScroll}>
          Content
        </ScrollArea>,
      )
      screen.getByLabelText('Feed').dispatchEvent(new Event('scroll', { bubbles: false }))
      expect(onScroll).toHaveBeenCalledTimes(1)
    })

    it('lets a consumer make the viewport focusable with tabIndex', () => {
      render(
        <ScrollArea aria-label="Focusable" tabIndex={0}>
          Content
        </ScrollArea>,
      )
      expect(screen.getByLabelText('Focusable')).toHaveAttribute('tabindex', '0')
    })
  })
})
