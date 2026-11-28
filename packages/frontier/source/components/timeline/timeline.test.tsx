import { render, screen, within } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Timeline } from './index.js'

function renderTimeline() {
  return render(
    <Timeline aria-label="Order history">
      <Timeline.Item tone="success">
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Delivered</Timeline.Title>
          <Timeline.Time dateTime="2025-03-04">March 4</Timeline.Time>
          <Timeline.Description>Left at the front door.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator>
          <svg data-testid="icon" />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title as="h3">Shipped</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>,
  )
}

describe('Timeline', () => {
  it('is an ordered list with one item for each event', () => {
    renderTimeline()

    const list = screen.getByRole('list', { name: 'Order history' })
    expect(list.tagName).toBe('OL')
    expect(within(list).getAllByRole('listitem')).toHaveLength(2)
  })

  it('is neutral unless the tone says otherwise', () => {
    renderTimeline()

    const [first, second] = screen.getAllByRole('listitem')
    expect(first?.getAttribute('data-tone')).toBe('success')
    expect(second?.getAttribute('data-tone')).toBe('neutral')
  })

  it('hides the indicator from assistive technology', () => {
    const { container } = renderTimeline()

    for (const indicator of container.querySelectorAll('.frontier-timeline__indicator')) {
      expect(indicator.getAttribute('aria-hidden')).toBe('true')
    }
  })

  it('renders the time as a time element with its date', () => {
    renderTimeline()

    const time = screen.getByText('March 4')
    expect(time.tagName).toBe('TIME')
    expect(time.getAttribute('datetime')).toBe('2025-03-04')
  })

  it('renders the title as a paragraph unless as says otherwise', () => {
    renderTimeline()

    expect(screen.getByText('Delivered').tagName).toBe('P')
    expect(screen.getByRole('heading', { level: 3, name: 'Shipped' })).toBeTruthy()
  })

  it('gives each part its class', () => {
    renderTimeline()

    expect(screen.getByText('Delivered').classList.contains('frontier-timeline__title')).toBe(true)
    expect(
      screen
        .getByText('Left at the front door.')
        .classList.contains('frontier-timeline__description'),
    ).toBe(true)
    expect(
      screen.getByText('Delivered').parentElement?.classList.contains('frontier-timeline__content'),
    ).toBe(true)
  })

  it('forwards the refs and the class names', () => {
    const listRef = createRef<HTMLOListElement>()
    const itemRef = createRef<HTMLLIElement>()
    render(
      <Timeline ref={listRef} className="list">
        <Timeline.Item ref={itemRef} className="item">
          <Timeline.Indicator />
        </Timeline.Item>
      </Timeline>,
    )

    expect(listRef.current?.classList.contains('list')).toBe(true)
    expect(itemRef.current?.classList.contains('item')).toBe(true)
    expect(itemRef.current?.classList.contains('frontier-timeline__item')).toBe(true)
  })

  it('exposes its parts on the root', () => {
    expect(Timeline.Root).toBe(Timeline)
  })
})
