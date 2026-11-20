import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { assertDefined } from '../../internal/helpers/assert-defined.js'

import { Command, type TCommandItem } from './index.js'

function createItems(onSelect: () => void = () => undefined): TCommandItem[] {
  return [
    {
      value: 'new-note',
      label: 'New note',
      description: 'Create a blank note',
      keywords: ['create'],
      shortcut: ['Mod', 'N'],
      onSelect,
    },
    { value: 'open-settings', label: 'Open settings', onSelect },
    { value: 'archive', label: 'Archive note', disabled: true, onSelect },
  ]
}

function openWithShortcut(options: { metaKey?: boolean; ctrlKey?: boolean } = {}) {
  fireEvent.keyDown(document, { key: 'k', ...options })
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Command.Dialog', () => {
  it('opens with the default Mod+K shortcut and closes with Escape', async () => {
    render(<Command.Dialog items={createItems()} />)
    expect(screen.queryByRole('dialog')).toBeNull()
    openWithShortcut({ ctrlKey: true })
    expect(await screen.findByRole('dialog', { name: 'Command palette' })).toBeTruthy()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('toggles closed when the shortcut is pressed again while open', async () => {
    render(<Command.Dialog items={createItems()} />)
    openWithShortcut({ ctrlKey: true })
    await screen.findByRole('dialog')
    openWithShortcut({ ctrlKey: true })
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('uses Meta+K instead of Ctrl+K for the Mod modifier on Apple platforms', async () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)',
    )
    render(<Command.Dialog items={createItems()} />)
    openWithShortcut({ ctrlKey: true })
    expect(screen.queryByRole('dialog')).toBeNull()
    openWithShortcut({ metaKey: true })
    expect(await screen.findByRole('dialog')).toBeTruthy()
  })

  it('does not open from the shortcut when shortcut is null', () => {
    render(<Command.Dialog items={createItems()} shortcut={null} />)
    openWithShortcut({ ctrlKey: true })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('responds only to the most recently mounted instance for the same shortcut', async () => {
    render(
      <>
        <Command.Dialog items={createItems()} label="First palette" />
        <Command.Dialog items={createItems()} label="Second palette" />
      </>,
    )
    openWithShortcut({ ctrlKey: true })
    const dialog = await screen.findByRole('dialog')
    expect(dialog.getAttribute('aria-label')).toBe('Second palette')
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
  })

  it('removes the shortcut listener when unmounted', () => {
    const { unmount } = render(<Command.Dialog items={createItems()} />)
    unmount()
    openWithShortcut({ ctrlKey: true })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('calls onOpenChange and respects a controlled open prop', async () => {
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <Command.Dialog items={createItems()} open={false} onOpenChange={onOpenChange} />,
    )
    openWithShortcut({ ctrlKey: true })
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByRole('dialog')).toBeNull()
    rerender(<Command.Dialog items={createItems()} open onOpenChange={onOpenChange} />)
    expect(await screen.findByRole('dialog')).toBeTruthy()
  })

  it('closes the dialog before running the selected item and invokes it exactly once', async () => {
    const order: string[] = []
    const items: TCommandItem[] = [
      {
        value: 'a',
        label: 'Alpha',
        onSelect: () => {
          order.push('select')
        },
      },
    ]
    render(
      <Command.Dialog
        items={items}
        defaultOpen
        onOpenChange={(open) => {
          order.push(open ? 'open' : 'close')
        }}
      />,
    )
    await userEvent.click(await screen.findByRole('option', { name: 'Alpha' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
    expect(order.filter((step) => step === 'select')).toHaveLength(1)
    expect(order.indexOf('close')).toBeLessThan(order.indexOf('select'))
  })
})

describe('Command filtering and navigation', () => {
  it('filters items by label, description, and keywords with every term required', async () => {
    render(<Command items={createItems()} />)
    const input = screen.getByRole('combobox', { name: 'Search commands' })
    await userEvent.type(input, 'create blank')
    expect(screen.getByRole('option', { name: /New note/ })).toBeTruthy()
    expect(screen.queryByRole('option', { name: /Open settings/ })).toBeNull()
  })

  it('uses a custom filter when provided', async () => {
    const filter = vi.fn((item: TCommandItem, query: string) => item.value === query)
    render(<Command items={createItems()} filter={filter} />)
    await userEvent.type(screen.getByRole('combobox'), 'archive')
    expect(filter).toHaveBeenCalled()
    expect(screen.queryByRole('option', { name: /New note/ })).toBeNull()
  })

  it('shows the empty state when nothing matches', async () => {
    render(<Command items={createItems()} />)
    await userEvent.type(screen.getByRole('combobox'), 'zzzz')
    expect(await screen.findByText('No results found')).toBeTruthy()
  })

  it('keeps focus in the input while the results resize to the empty state', async () => {
    render(<Command items={createItems()} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'zzzz')
    expect(await screen.findByText('No results found')).toBeTruthy()
    expect(input).toHaveFocus()
  })

  it('does not select disabled items', async () => {
    const onSelect = vi.fn()
    render(<Command items={createItems(onSelect)} />)
    await userEvent.click(screen.getByRole('option', { name: /Archive note/ }))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('selects the highlighted item with Enter exactly once', async () => {
    const onSelect = vi.fn()
    render(<Command items={createItems(onSelect)} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'new')
    await userEvent.keyboard('{ArrowDown}{Enter}')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('renders grouped items with group labels', () => {
    const groups = [
      { label: 'Notes', items: [assertDefined(createItems()[0])] },
      { label: 'App', items: [assertDefined(createItems()[1])] },
    ]
    render(<Command items={groups} />)
    const groupsList = screen.getAllByRole('group')
    expect(groupsList).toHaveLength(2)
    expect(within(assertDefined(groupsList[0])).getByText('Notes')).toBeTruthy()
    expect(within(assertDefined(groupsList[1])).getByText('App')).toBeTruthy()
  })

  it('renders item shortcuts as keyboard hints', () => {
    render(<Command items={createItems()} />)
    const option = screen.getByRole('option', { name: /New note/ })
    expect(within(option).getByText('Mod')).toBeTruthy()
    expect(within(option).getByText('N')).toBeTruthy()
  })
})
