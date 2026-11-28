import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { CursorCard } from './index.js'

function renderCard(props: Parameters<typeof CursorCard>[0] = {}) {
  return render(
    <CursorCard {...props}>
      <CursorCard.Zone>
        <div data-testid="zone">Zone</div>
      </CursorCard.Zone>
      <CursorCard.Content>Details</CursorCard.Content>
    </CursorCard>,
  )
}

describe('CursorCard', () => {
  it('keeps the card closed until the cursor enters the zone', () => {
    renderCard()

    expect(screen.getByTestId('zone')).toBeInTheDocument()
    expect(screen.queryByText('Details')).not.toBeInTheDocument()
  })

  it('opens when the cursor enters the zone and closes when it leaves', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.hover(screen.getByTestId('zone'))

    expect(await screen.findByText('Details')).toBeInTheDocument()

    await user.unhover(screen.getByTestId('zone'))

    await waitFor(() => {
      expect(screen.queryByText('Details')).not.toBeInTheDocument()
    })
  })

  it('does not open before the open delay has passed', async () => {
    const user = userEvent.setup()
    renderCard({ openDelay: 300 })

    await user.hover(screen.getByTestId('zone'))

    expect(screen.queryByText('Details')).not.toBeInTheDocument()
    expect(await screen.findByText('Details')).toBeInTheDocument()
  })

  it('passes the cursor position inside the zone to a function child', async () => {
    const user = userEvent.setup()
    render(
      <CursorCard>
        <CursorCard.Zone>
          <div data-testid="zone">Zone</div>
        </CursorCard.Zone>
        <CursorCard.Content>
          {({ x, y }) => `Cursor at ${String(x)}, ${String(y)}`}
        </CursorCard.Content>
      </CursorCard>,
    )

    const zone = screen.getByTestId('zone')
    await user.pointer({ target: zone, coords: { clientX: 30, clientY: 10 } })
    expect(await screen.findByText('Cursor at 30, 10')).toBeInTheDocument()

    await user.pointer({ coords: { clientX: 52, clientY: 18 } })
    expect(await screen.findByText('Cursor at 52, 18')).toBeInTheDocument()
  })

  it('opens from the keyboard when the zone can take focus', async () => {
    const user = userEvent.setup()
    render(
      <CursorCard>
        <CursorCard.Zone>
          <button type="button">Zone</button>
        </CursorCard.Zone>
        <CursorCard.Content>Details</CursorCard.Content>
      </CursorCard>,
    )

    await user.tab()

    expect(screen.getByRole('button', { name: 'Zone' })).toHaveFocus()
    expect(await screen.findByText('Details')).toBeInTheDocument()
  })

  it('reports open changes and supports a controlled open state', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = renderCard({ open: false, onOpenChange })

    await user.hover(screen.getByTestId('zone'))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
    expect(screen.queryByText('Details')).not.toBeInTheDocument()

    rerender(
      <CursorCard open onOpenChange={onOpenChange}>
        <CursorCard.Zone>
          <div data-testid="zone">Zone</div>
        </CursorCard.Zone>
        <CursorCard.Content>Details</CursorCard.Content>
      </CursorCard>,
    )

    expect(await screen.findByText('Details')).toBeInTheDocument()
  })

  it('places the card on the requested side and keeps consumer attributes and refs', async () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <CursorCard defaultOpen>
        <CursorCard.Zone>
          <div>Zone</div>
        </CursorCard.Zone>
        <CursorCard.Content ref={ref} side="top" className="custom" aria-label="Value">
          Content
        </CursorCard.Content>
      </CursorCard>,
    )

    const card = await screen.findByText('Content')

    expect(card).toHaveAttribute('data-side', 'top')
    expect(card).toHaveClass('frontier-cursor-card', 'frontier-floating-surface', 'custom')
    expect(card).toHaveAttribute('aria-label', 'Value')
    expect(ref.current).toBe(card)
  })
})
