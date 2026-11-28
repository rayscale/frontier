import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { HoverCard } from './index.js'

function renderCard(props: Parameters<typeof HoverCard>[0] = {}) {
  return render(
    <HoverCard openDelay={0} closeDelay={0} {...props}>
      <HoverCard.Trigger>
        <a href="/ana">@ana</a>
      </HoverCard.Trigger>
      <HoverCard.Content data-testid="card">Ana designs the system.</HoverCard.Content>
    </HoverCard>,
  )
}

describe('HoverCard', () => {
  it('keeps the card closed until the trigger is hovered', () => {
    renderCard()

    expect(screen.getByRole('link', { name: '@ana' })).toBeInTheDocument()
    expect(screen.queryByText('Ana designs the system.')).not.toBeInTheDocument()
  })

  it('opens when the pointer enters the trigger and closes when it leaves', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.hover(screen.getByRole('link', { name: '@ana' }))

    expect(await screen.findByText('Ana designs the system.')).toBeInTheDocument()

    await user.unhover(screen.getByRole('link', { name: '@ana' }))

    await waitFor(() => {
      expect(screen.queryByText('Ana designs the system.')).not.toBeInTheDocument()
    })
  })

  it('opens when the trigger gets keyboard focus', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.tab()

    expect(screen.getByRole('link', { name: '@ana' })).toHaveFocus()
    expect(await screen.findByText('Ana designs the system.')).toBeInTheDocument()
  })

  it('closes with the Escape key', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.hover(screen.getByRole('link', { name: '@ana' }))
    await screen.findByText('Ana designs the system.')
    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByText('Ana designs the system.')).not.toBeInTheDocument()
    })
  })

  it('does not open before the open delay has passed', async () => {
    const user = userEvent.setup()
    renderCard({ openDelay: 300 })

    await user.hover(screen.getByRole('link', { name: '@ana' }))

    expect(screen.queryByText('Ana designs the system.')).not.toBeInTheDocument()
    expect(await screen.findByText('Ana designs the system.')).toBeInTheDocument()
  })

  it('reports open changes and supports a controlled open state', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = renderCard({ open: false, onOpenChange })

    await user.hover(screen.getByRole('link', { name: '@ana' }))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
    expect(screen.queryByText('Ana designs the system.')).not.toBeInTheDocument()

    rerender(
      <HoverCard open openDelay={0} closeDelay={0} onOpenChange={onOpenChange}>
        <HoverCard.Trigger>
          <a href="/ana">@ana</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Ana designs the system.</HoverCard.Content>
      </HoverCard>,
    )

    expect(await screen.findByText('Ana designs the system.')).toBeInTheDocument()
  })

  it('can start open', async () => {
    renderCard({ defaultOpen: true })

    expect(await screen.findByText('Ana designs the system.')).toBeInTheDocument()
  })

  it('places the card on the requested side and keeps consumer attributes and refs', async () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <HoverCard defaultOpen>
        <HoverCard.Trigger>
          <button type="button">Open</button>
        </HoverCard.Trigger>
        <HoverCard.Content ref={ref} side="top" className="custom" aria-label="Profile">
          Content
        </HoverCard.Content>
      </HoverCard>,
    )

    const card = await screen.findByText('Content')

    expect(card).toHaveAttribute('data-side', 'top')
    expect(card).toHaveClass('frontier-hover-card', 'frontier-floating-surface', 'custom')
    expect(card).toHaveAttribute('aria-label', 'Profile')
    expect(ref.current).toBe(card)
  })
})
