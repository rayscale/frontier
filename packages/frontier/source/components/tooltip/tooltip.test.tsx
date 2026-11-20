import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tooltip } from './index.js'

describe('Tooltip', () => {
  it('stays hidden until the trigger is hovered or focused', () => {
    render(
      <Tooltip content="Add item">
        <button type="button">Add</button>
      </Tooltip>,
    )

    expect(screen.queryByText('Add item')).not.toBeInTheDocument()
  })

  it('appears at once on keyboard focus and never takes focus', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Add item">
        <button type="button">Add</button>
      </Tooltip>,
    )

    await user.tab()

    expect(await screen.findByText('Add item')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toHaveFocus()
  })

  it('appears when the pointer rests on the trigger and leaves with it', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Add item">
        <button type="button">Add</button>
      </Tooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Add' }))

    expect(await screen.findByText('Add item')).toBeInTheDocument()

    await user.unhover(screen.getByRole('button', { name: 'Add' }))

    await waitFor(() => {
      expect(screen.queryByText('Add item')).not.toBeInTheDocument()
    })
  })

  it('closes with Escape', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Add item">
        <button type="button">Add</button>
      </Tooltip>,
    )

    await user.tab()
    await screen.findByText('Add item')
    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByText('Add item')).not.toBeInTheDocument()
    })
  })

  it('does not appear when disabled', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Add item" disabled>
        <button type="button">Add</button>
      </Tooltip>,
    )

    await user.tab()

    expect(screen.queryByText('Add item')).not.toBeInTheDocument()
  })

  it('keeps the trigger props and ref of the child', () => {
    render(
      <Tooltip content="Add item">
        <button type="button" data-testid="trigger" className="custom">
          Add
        </button>
      </Tooltip>,
    )

    expect(screen.getByTestId('trigger')).toHaveClass('custom')
  })
})
