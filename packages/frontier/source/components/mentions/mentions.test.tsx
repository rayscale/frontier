import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Textarea } from '../textarea/textarea.js'

import { Mentions, type TMentionItem, type TMentionTrigger } from './index.js'

const people: readonly TMentionItem[] = [
  { id: 'ana', label: 'Ana', description: 'ana@example.com' },
  { id: 'ben', label: 'Ben' },
  { id: 'bea', label: 'Bea', disabled: true },
]

const commands: readonly TMentionItem[] = [
  { id: 'clear', label: 'clear' },
  { id: 'help', label: 'help', insert: '/help --all' },
]

const triggers: readonly TMentionTrigger[] = [
  { char: '@', items: people, label: 'People' },
  { char: '/', items: commands, atStart: true, label: 'Commands' },
]

function Field({ onSelect }: { onSelect?: (item: TMentionItem, trigger: string) => void }) {
  const [value, setValue] = useState('')

  return (
    <Mentions triggers={triggers} onSelect={onSelect}>
      <Textarea
        aria-label="Message"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value)
        }}
      />
    </Mentions>
  )
}

function getField(): HTMLTextAreaElement {
  return screen.getByRole<HTMLTextAreaElement>('textbox', { name: 'Message' })
}

async function expectClosed(): Promise<void> {
  await waitFor(() => {
    expect(screen.queryByRole('listbox')).toBeNull()
  })
}

describe('Mentions', () => {
  it('stays closed until a trigger is typed', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), 'hello')

    await expectClosed()
  })

  it('opens the list of the trigger at the start of a word', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), 'hi @')

    expect(await screen.findByRole('listbox', { name: 'People' })).toBeTruthy()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('does not open in the middle of a word', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), 'name@')

    await expectClosed()
  })

  it('filters the items by what is typed after the trigger', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@b')

    await screen.findByRole('listbox')
    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
      'Ben',
      'Bea',
    ])
  })

  it('closes the list when nothing matches', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@zzz')

    await expectClosed()
  })

  it('opens a trigger that is only for the start of the field only there', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), 'text /')
    await expectClosed()

    await user.clear(getField())
    await user.type(getField(), '/')
    expect(await screen.findByRole('listbox', { name: 'Commands' })).toBeTruthy()
  })

  it('inserts the chosen item in place of what was typed', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Field onSelect={onSelect} />)

    await user.type(getField(), 'hi @an')
    await user.click(await screen.findByRole('option', { name: /Ana/ }))

    expect(getField().value).toBe('hi @Ana ')
    expect(onSelect).toHaveBeenCalledWith(people[0], '@')
    await expectClosed()
  })

  it('inserts the text of the item when it has one', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '/he')
    await user.click(await screen.findByRole('option', { name: 'help' }))

    expect(getField().value).toBe('/help --all ')
  })

  it('chooses with Enter and moves with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@')
    await screen.findByRole('listbox')
    await user.keyboard('{ArrowDown}{Enter}')

    expect(getField().value).toBe('@Ben ')
  })

  it('skips disabled items when moving', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@b')
    await screen.findByRole('listbox')
    await user.keyboard('{ArrowDown}{Enter}')

    expect(getField().value).toBe('@Ben ')
  })

  it('does not choose a disabled item', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@bea')
    await user.click(await screen.findByRole('option', { name: 'Bea' }))

    expect(getField().value).toBe('@bea')
  })

  it('chooses with Tab', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@a')
    await screen.findByRole('listbox')
    await user.keyboard('{Tab}')

    expect(getField().value).toBe('@Ana ')
  })

  it('closes with Escape and stays closed until the next trigger', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@')
    await screen.findByRole('listbox')
    await user.keyboard('{Escape}')
    await expectClosed()

    await user.type(getField(), 'a')
    await expectClosed()

    await user.type(getField(), ' @')
    expect(await screen.findByRole('listbox')).toBeTruthy()
  })

  it('keeps the keys from reaching the field while the list is open', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    render(
      <Mentions triggers={triggers}>
        <Textarea aria-label="Message" onKeyDown={onKeyDown} />
      </Mentions>,
    )

    await user.type(getField(), '@')
    await screen.findByRole('listbox')
    onKeyDown.mockClear()
    await user.keyboard('{Enter}')

    expect(onKeyDown).not.toHaveBeenCalled()
  })

  it('links the field to the list for assistive technology', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@')
    const list = await screen.findByRole('listbox')

    expect(getField().getAttribute('aria-controls')).toBe(list.id)
    expect(getField().getAttribute('aria-autocomplete')).toBe('list')
    expect(getField().getAttribute('aria-activedescendant')).toBe(
      screen.getAllByRole('option')[0]?.id,
    )

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(getField().hasAttribute('aria-controls')).toBe(false)
    })
  })

  it('marks the active item as selected', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@')
    await screen.findByRole('listbox')
    await user.keyboard('{ArrowDown}')

    expect(screen.getByRole('option', { name: 'Ben' }).getAttribute('aria-selected')).toBe('true')
    expect(screen.getByRole('option', { name: /Ana/ }).getAttribute('aria-selected')).toBe('false')
  })

  it('reports what is typed after a trigger', async () => {
    const user = userEvent.setup()
    const onQueryChange = vi.fn()
    render(
      <Mentions triggers={triggers} onQueryChange={onQueryChange}>
        <Textarea aria-label="Message" />
      </Mentions>,
    )

    await user.type(getField(), '@an')

    expect(onQueryChange).toHaveBeenLastCalledWith('an', '@')
  })

  it('shows the items as they are when filter is false', async () => {
    const user = userEvent.setup()
    render(
      <Mentions triggers={[{ char: '@', items: people, filter: false }]}>
        <Textarea aria-label="Message" />
      </Mentions>,
    )

    await user.type(getField(), '@zzz')

    expect(await screen.findAllByRole('option')).toHaveLength(3)
  })

  it('leaves out the space when insertSpace is false', async () => {
    const user = userEvent.setup()
    render(
      <Mentions triggers={[{ char: '@', items: people, insertSpace: false }]}>
        <Textarea aria-label="Message" />
      </Mentions>,
    )

    await user.type(getField(), '@an')
    await user.click(await screen.findByRole('option', { name: /Ana/ }))

    expect(getField().value).toBe('@Ana')
    await expectClosed()
  })

  it('works with a field that keeps its own value', async () => {
    const user = userEvent.setup()
    render(
      <Mentions triggers={triggers}>
        <textarea aria-label="Message" />
      </Mentions>,
    )

    await user.type(getField(), '@an')
    await user.click(await screen.findByRole('option', { name: /Ana/ }))

    expect(getField().value).toBe('@Ana ')
  })

  it('works with a single line input', async () => {
    const user = userEvent.setup()
    render(
      <Mentions triggers={triggers}>
        <input aria-label="Message" />
      </Mentions>,
    )

    await user.type(screen.getByRole('textbox', { name: 'Message' }), '@be')

    expect(await screen.findByRole('option', { name: 'Ben' })).toBeTruthy()
  })

  it('closes when the field loses focus', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Field />
        <button type="button">Other</button>
      </>,
    )

    await user.type(getField(), '@')
    await screen.findByRole('listbox')
    await user.click(screen.getByRole('button', { name: 'Other' }))

    await expectClosed()
  })

  it('announces how many suggestions there are', async () => {
    const user = userEvent.setup()
    render(<Field />)

    await user.type(getField(), '@')

    expect(await screen.findByRole('status')).toHaveProperty('textContent', '3 suggestions')
  })
})
