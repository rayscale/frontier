import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, type RefAttributes, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button.js'
import { Input } from '../input/input.js'

import { Popover, type TPopoverContentProps, type TPopoverProps } from './index.js'

afterEach(() => {
  cleanup()
})

function renderPopover(
  props: Partial<TPopoverProps> = {},
  contentProps: Partial<TPopoverContentProps & RefAttributes<HTMLDivElement>> = {},
) {
  return render(
    <Popover {...props}>
      <Popover.Trigger>
        <Button>Open popover</Button>
      </Popover.Trigger>
      <Popover.Content {...contentProps}>
        <Popover.Header>
          <Popover.Title>Filters</Popover.Title>
          <Popover.Description>Choose what to show.</Popover.Description>
        </Popover.Header>
        <p>Body text</p>
        <Popover.Close>Done</Popover.Close>
      </Popover.Content>
    </Popover>,
  )
}

function ControlledPopover({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange?.(nextOpen)
        setOpen(nextOpen)
      }}
    >
      <Popover.Trigger>
        <Button>Toggle</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Controlled</Popover.Title>
      </Popover.Content>
    </Popover>
  )
}

describe('Popover', () => {
  it('exposes every compound part', () => {
    const expectedParts = ['Trigger', 'Content', 'Header', 'Title', 'Description', 'Close']
    const exposedParts = Object.keys(Popover)
    expect(exposedParts).toEqual(expect.arrayContaining(expectedParts))
  })

  it('keeps the popup closed until the trigger is activated', async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole('button', { name: 'Open popover' }))
    expect(await screen.findByRole('dialog', { name: 'Filters' })).toBeInTheDocument()
  })

  it('starts open when defaultOpen is true', () => {
    renderPopover({ defaultOpen: true })
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument()
  })

  it('links the trigger, popup title, and description with ARIA', async () => {
    const user = userEvent.setup()
    renderPopover()
    const trigger = screen.getByRole('button', { name: 'Open popover' })
    await user.click(trigger)
    const popup = await screen.findByRole('dialog', { name: 'Filters' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(popup).toHaveAccessibleDescription('Choose what to show.')
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    renderPopover({ defaultOpen: true })
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Filters' })).not.toBeInTheDocument()
    })
  })

  it('closes when a press lands outside the popup', async () => {
    const user = userEvent.setup()
    renderPopover({ defaultOpen: true })
    await user.click(document.body)
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Filters' })).not.toBeInTheDocument()
    })
  })

  it('closes when Popover.Close is activated', async () => {
    const user = userEvent.setup()
    renderPopover({ defaultOpen: true })
    await user.click(screen.getByRole('button', { name: 'Done' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Filters' })).not.toBeInTheDocument()
    })
  })

  it('renders Popover.Close with type="button"', () => {
    renderPopover({ defaultOpen: true })
    expect(screen.getByRole('button', { name: 'Done' })).toHaveAttribute('type', 'button')
  })

  it('does not open when the trigger is disabled', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <Popover.Trigger>
          <Button disabled>Unavailable</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Hidden</Popover.Title>
        </Popover.Content>
      </Popover>,
    )
    await user.click(screen.getByRole('button', { name: 'Unavailable' }))
    expect(screen.queryByRole('dialog', { name: 'Hidden' })).not.toBeInTheDocument()
  })

  it('renders the popup in a portal outside its container', () => {
    const { container } = renderPopover({ defaultOpen: true })
    const popup = screen.getByRole('dialog', { name: 'Filters' })
    expect(container).not.toContainElement(popup)
    expect(document.body).toContainElement(popup)
  })

  it('forwards ref to the popup element', () => {
    const ref = createRef<HTMLDivElement>()
    renderPopover({ defaultOpen: true }, { ref })
    expect(ref.current).toBe(screen.getByRole('dialog', { name: 'Filters' }))
  })

  it('applies placement and merges className on the popup', () => {
    renderPopover({ defaultOpen: true }, { side: 'top', align: 'end', className: 'custom-popover' })
    const popup = screen.getByRole('dialog', { name: 'Filters' })
    expect(popup).toHaveAttribute('data-side', 'top')
    expect(popup).toHaveAttribute('data-align', 'end')
    expect(popup).toHaveClass('frontier-popover', 'custom-popover')
  })

  it('moves focus into a popover with interactive content on open', async () => {
    render(
      <Popover defaultOpen>
        <Popover.Content>
          <Input aria-label="Search" />
        </Popover.Content>
      </Popover>,
    )
    const search = screen.getByRole('textbox', { name: 'Search' })
    await waitFor(() => {
      expect(search).toHaveFocus()
    })
    expect(search).toHaveFocus()
  })

  it('follows the open prop in controlled mode', async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(<ControlledPopover onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(await screen.findByRole('dialog', { name: 'Controlled' })).toBeInTheDocument()
  })

  it('stays closed in controlled mode when open is not updated', async () => {
    const user = userEvent.setup()
    render(
      <Popover open={false} onOpenChange={() => undefined}>
        <Popover.Trigger>
          <Button>Locked</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Locked content</Popover.Title>
        </Popover.Content>
      </Popover>,
    )
    await user.click(screen.getByRole('button', { name: 'Locked' }))
    expect(screen.queryByRole('dialog', { name: 'Locked content' })).not.toBeInTheDocument()
  })

  it('reports the requested open state when closed with Escape', async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    renderPopover({ defaultOpen: true, onOpenChange })
    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
