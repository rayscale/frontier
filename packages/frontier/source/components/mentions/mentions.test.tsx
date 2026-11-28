import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  getNearestEditorFromDOMNode,
  type LexicalEditor,
} from 'lexical'
import { createRef, useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  Mentions,
  type TMentionDetails,
  type TMentionItem,
  type TMentionsProps,
  type TMentionTrigger,
} from './index.js'

const people: readonly TMentionItem[] = [
  { id: 'ana', label: 'Ana', description: 'ana@example.com', insert: '@ana' },
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

function renderMentions(props: Partial<TMentionsProps> = {}) {
  return render(<Mentions label="Message" triggers={triggers} {...props} />)
}

function getField(): HTMLElement {
  return screen.getByRole('textbox', { name: 'Message' })
}

function getEditor(): LexicalEditor {
  const editor = getNearestEditorFromDOMNode(getField())
  if (!editor) {
    throw new Error('The field has no editor.')
  }

  return editor
}

/** Writes at the end of the field, as typing does. jsdom cannot type into an editable element. */
async function type(text: string): Promise<void> {
  const editor = getEditor()
  await act(async () => {
    editor.update(
      () => {
        if (!$isRangeSelection($getSelection())) {
          $getRoot().selectEnd()
        }

        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.insertText(text)
        }
      },
      { discrete: true },
    )
    await Promise.resolve()
  })
}

/** Presses Backspace with the cursor at the end of the text. */
async function pressBackspaceAtTheEnd(): Promise<void> {
  const editor = getEditor()
  await act(async () => {
    editor.update(
      () => {
        $getRoot().selectEnd()
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.deleteCharacter(true)
        }
      },
      { discrete: true },
    )
    await Promise.resolve()
  })
}

async function press(key: string, options: KeyboardEventInit = {}): Promise<void> {
  await act(async () => {
    fireEvent.keyDown(getField(), { key, ...options })
    await Promise.resolve()
  })
}

function getText(): string {
  return getEditor()
    .getEditorState()
    .read(() => $getRoot().getTextContent())
}

function getChips(): HTMLElement[] {
  return Array.from(getField().querySelectorAll<HTMLElement>('.frontier-mentions__chip'))
}

async function expectClosed(): Promise<void> {
  await waitFor(() => {
    expect(screen.queryByRole('listbox')).toBeNull()
  })
}

beforeEach(() => {
  // jsdom has no layout.
  Object.defineProperty(Range.prototype, 'getBoundingClientRect', {
    configurable: true,
    writable: true,
    value: () => new DOMRect(),
  })
})

afterEach(() => {
  cleanup()
})

describe('Mentions', () => {
  it('is a labelled multi-line text box with a placeholder', () => {
    renderMentions({ placeholder: 'Write a message' })

    expect(getField().getAttribute('aria-multiline')).toBe('true')
    expect(getField().getAttribute('aria-placeholder')).toBe('Write a message')
    expect(screen.getByText('Write a message')).toBeTruthy()
  })

  it('takes a name from aria-label when it has no label', () => {
    render(<Mentions aria-label="Comment" triggers={triggers} />)

    expect(screen.getByRole('textbox', { name: 'Comment' })).toBeTruthy()
  })

  it('shows the text of an item in the default value as a chip', () => {
    renderMentions({ defaultValue: 'Hi @ana and @Ben, not name@ana' })

    expect(getChips().map((chip) => chip.textContent)).toEqual(['@ana', '@Ben'])
    expect(getChips()[0]?.getAttribute('data-mention-id')).toBe('ana')
    expect(getChips()[0]?.getAttribute('data-trigger')).toBe('@')
    expect(getText()).toBe('Hi @ana and @Ben, not name@ana')
  })

  it('keeps the lines of the value', () => {
    renderMentions({ defaultValue: 'one\n@ana' })

    expect(getText()).toBe('one\n@ana')
    expect(getChips()).toHaveLength(1)
  })

  it('opens the list of a trigger at the start of a word, and filters it', async () => {
    renderMentions()

    await type('hi @')
    expect(await screen.findByRole('listbox', { name: 'People' })).toBeTruthy()
    expect(screen.getAllByRole('option')).toHaveLength(3)

    await type('b')
    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
      'Ben',
      'Bea',
    ])
  })

  it('does not open in the middle of a word', async () => {
    renderMentions()

    await type('name@')

    await expectClosed()
  })

  it('opens a trigger that is only for the start of the field only there', async () => {
    const { unmount } = renderMentions({ defaultValue: 'text ' })
    await type('/')
    await expectClosed()
    unmount()

    renderMentions()
    await type('/')
    expect(await screen.findByRole('listbox', { name: 'Commands' })).toBeTruthy()
  })

  it('opens after a chip, but not for a start-only trigger', async () => {
    renderMentions({ defaultValue: '@ana ' })

    await type('/')
    await expectClosed()

    await type(' @')
    expect(await screen.findByRole('listbox', { name: 'People' })).toBeTruthy()
  })

  it('turns the chosen item into a chip, and reports the text and the chips', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onValueChange = vi.fn<(value: string, details: TMentionDetails) => void>()
    renderMentions({ onSelect, onValueChange })

    await type('hi @an')
    await user.click(await screen.findByRole('option', { name: /Ana/ }))

    expect(getText()).toBe('hi @ana ')
    expect(getChips().map((chip) => chip.textContent)).toEqual(['@ana'])
    expect(onSelect).toHaveBeenCalledWith(people[0], '@')
    await waitFor(() => {
      expect(onValueChange).toHaveBeenLastCalledWith('hi @ana ', {
        mentions: [{ id: 'ana', text: '@ana', trigger: '@' }],
      })
    })
    await expectClosed()
  })

  it('writes the trigger and the label when the item has no text of its own', async () => {
    renderMentions()

    await type('@ben')
    await press('Enter')

    expect(getText()).toBe('@Ben ')
  })

  it('moves with the arrow keys, skipping disabled items, and chooses with Tab', async () => {
    renderMentions()

    await type('@')
    await screen.findByRole('listbox')
    await press('ArrowDown')
    expect(screen.getByRole('option', { name: 'Ben' }).getAttribute('aria-selected')).toBe('true')

    await press('ArrowDown')
    expect(screen.getByRole('option', { name: /Ana/ }).getAttribute('aria-selected')).toBe('true')

    await press('ArrowUp')
    await press('Tab')

    expect(getText()).toBe('@Ben ')
  })

  it('does not choose a disabled item', async () => {
    const user = userEvent.setup()
    renderMentions()

    await type('@bea')
    await user.click(await screen.findByRole('option', { name: 'Bea' }))

    expect(getText()).toBe('@bea')
    expect(getChips()).toHaveLength(0)
  })

  it('closes with Escape and stays closed until the next trigger', async () => {
    renderMentions()

    await type('@')
    await screen.findByRole('listbox')
    await press('Escape')
    await expectClosed()

    await type('a')
    await expectClosed()

    await type(' @')
    expect(await screen.findByRole('listbox')).toBeTruthy()
  })

  it('keeps the cursor out of a chip, and the spell checker off it', () => {
    renderMentions({ defaultValue: 'hi @ana' })

    const chip = getChips()[0]
    expect(chip?.getAttribute('contenteditable')).toBe('false')
    expect(chip?.getAttribute('spellcheck')).toBe('false')
  })

  it('takes a chip away whole, as one character', async () => {
    renderMentions({ defaultValue: 'hi @ana' })

    await pressBackspaceAtTheEnd()

    expect(getText()).toBe('hi ')
    expect(getChips()).toHaveLength(0)
  })

  it('links the field to the list while it is open, and says how many there are', async () => {
    renderMentions()

    await type('@')
    const list = await screen.findByRole('listbox')

    expect(getField().getAttribute('aria-controls')).toBe(list.id)
    expect(getField().getAttribute('aria-activedescendant')).toBe(
      screen.getAllByRole('option')[0]?.id,
    )
    expect(screen.getByRole('status').textContent).toBe('3 suggestions')

    await press('Escape')
    await waitFor(() => {
      expect(getField().hasAttribute('aria-controls')).toBe(false)
    })
  })

  it('reports what is typed after a trigger', async () => {
    const onQueryChange = vi.fn()
    renderMentions({ onQueryChange })

    await type('@an')

    expect(onQueryChange).toHaveBeenLastCalledWith('an', '@')
  })

  it('shows the items as they are when filter is false', async () => {
    renderMentions({ triggers: [{ char: '@', items: people, filter: false }] })

    await type('@zzz')

    expect(await screen.findAllByRole('option')).toHaveLength(3)
  })

  it('leaves out the space when insertSpace is false', async () => {
    renderMentions({ triggers: [{ char: '@', items: people, insertSpace: false }] })

    await type('@ben')
    await press('Enter')

    expect(getText()).toBe('@Ben')
  })

  it('follows a controlled value, and turns its mentions into chips', async () => {
    const user = userEvent.setup()

    function Controlled() {
      const [value, setValue] = useState('start')

      return (
        <>
          <Mentions label="Message" triggers={triggers} value={value} onValueChange={setValue} />
          <button
            type="button"
            onClick={() => {
              setValue('to @ana')
            }}
          >
            Fill
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('')
            }}
          >
            Clear
          </button>
          <output>{value}</output>
        </>
      )
    }

    render(<Controlled />)
    await user.click(screen.getByRole('button', { name: 'Fill' }))
    await waitFor(() => {
      expect(getChips()).toHaveLength(1)
    })
    expect(getText()).toBe('to @ana')

    await user.click(screen.getByRole('button', { name: 'Clear' }))
    await waitFor(() => {
      expect(getText()).toBe('')
    })

    await type('typed')
    await waitFor(() => {
      expect(document.querySelector('output')?.textContent).toBe('typed')
    })
  })

  it('sends with Enter when there is somewhere to send to', async () => {
    const onSubmit = vi.fn()
    renderMentions({ defaultValue: 'hello', onSubmit })

    await press('Enter')

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(getText()).toBe('hello')
  })

  it('gives Enter to the list while it is open, not to onSubmit', async () => {
    const onSubmit = vi.fn()
    renderMentions({ onSubmit })

    await type('@ben')
    await press('Enter')

    expect(onSubmit).not.toHaveBeenCalled()
    expect(getText()).toBe('@Ben ')
  })

  it('adds no line in a single line field', async () => {
    renderMentions({ defaultValue: 'hello', singleLine: true })

    await press('Enter')

    expect(getText()).toBe('hello')
    expect(getField().getAttribute('aria-multiline')).toBe('false')
  })

  it('cannot be edited when disabled or read only', () => {
    const { unmount } = renderMentions({ disabled: true })
    expect(getField().getAttribute('contenteditable')).toBe('false')
    expect(getField().getAttribute('aria-disabled')).toBe('true')
    unmount()

    renderMentions({ readOnly: true })
    expect(getField().getAttribute('contenteditable')).toBe('false')
    expect(getField().getAttribute('aria-readonly')).toBe('true')
  })

  it('sends its text with a form', async () => {
    const { container } = render(
      <form>
        <Mentions defaultValue="hi @ana" label="Message" name="message" triggers={triggers} />
      </form>,
    )
    const form = container.querySelector('form')

    expect(new FormData(form ?? undefined).get('message')).toBe('hi @ana')

    await type('!')
    await waitFor(() => {
      expect(new FormData(form ?? undefined).get('message')).toBe('hi @ana!')
    })
  })

  it('links the description and the error, and marks the field invalid', () => {
    renderMentions({ description: 'Mention someone.', error: 'Required.' })

    const describedBy = getField().getAttribute('aria-describedby')?.split(' ') ?? []
    expect(describedBy).toContain(screen.getByText('Mention someone.').id)
    expect(describedBy).toContain(screen.getByText('Required.').id)
    expect(getField().getAttribute('aria-invalid')).toBe('true')
  })

  it('shows the controls of the footer, and forwards the ref and the class name', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Mentions
        ref={ref}
        className="extra"
        footer={<button type="button">Send</button>}
        label="Message"
        triggers={triggers}
      />,
    )

    expect(screen.getByRole('button', { name: 'Send' })).toBeTruthy()
    expect(ref.current).toBe(getField())
    expect(ref.current?.classList.contains('extra')).toBe(true)
  })
})
