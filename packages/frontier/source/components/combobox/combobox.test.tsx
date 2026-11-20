import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Combobox, type TComboboxOption, type TComboboxOptionGroup } from './index.js'

afterEach(() => {
  cleanup()
})

const fruits: readonly TComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' },
]

const groups: readonly TComboboxOptionGroup[] = [
  {
    label: 'Frontend',
    items: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ],
  },
  {
    label: 'Backend',
    items: [{ value: 'go', label: 'Go' }],
  },
]

function renderCombobox(
  props: Partial<React.ComponentProps<typeof Combobox>> = {},
  options: {
    readonly items?: readonly TComboboxOption[] | readonly TComboboxOptionGroup[]
  } = {},
) {
  return render(
    <Combobox items={options.items ?? fruits} {...props}>
      <Combobox.Input label="Fruit" placeholder="Search fruit" />
      <Combobox.Content>
        <Combobox.List />
        <Combobox.Empty>No fruit found.</Combobox.Empty>
      </Combobox.Content>
    </Combobox>,
  )
}

describe('Combobox rendering', () => {
  it('renders an accessible labeled input', () => {
    renderCombobox()
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    expect(input).toBeInstanceOf(HTMLInputElement)
    expect(input).toHaveAttribute('placeholder', 'Search fruit')
  })

  it('does not show the list until the input is opened', () => {
    renderCombobox()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('propagates the disabled state to the input', () => {
    renderCombobox({ disabled: true })
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    expect(input).toBeDisabled()
  })
})

describe('Combobox opening and filtering', () => {
  it('opens the list when the user types into the input', async () => {
    const user = userEvent.setup()
    renderCombobox()

    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(input)
    await user.type(input, 'b')
    expect(await screen.findByRole('option', { name: 'Banana' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'Blueberry' })).toBeVisible()
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument()
  })

  it('shows the empty state when no option matches the query', async () => {
    const user = userEvent.setup()
    renderCombobox()
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(input)
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveAttribute('aria-activedescendant')
    await user.type(input, 'zzz')
    expect(await screen.findByText('No fruit found.')).toBeInTheDocument()
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
    expect(input).not.toHaveAttribute('aria-activedescendant')
  })

  it('keeps group headings when filtering grouped items', async () => {
    const user = userEvent.setup()
    renderCombobox({}, { items: groups })
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(input)
    await user.type(input, 're')
    expect(await screen.findByRole('option', { name: 'React' })).toBeVisible()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.queryByText('Backend')).not.toBeInTheDocument()
  })
})

describe('Combobox selection', () => {
  it('selects an option with the keyboard and reports the value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderCombobox({ onValueChange })
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(input)
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}')
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('banana')
    })
    expect(input).toHaveValue('Banana')
  })

  it('selects an option with a pointer click', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderCombobox({ onValueChange })
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await user.click(await screen.findByRole('option', { name: 'Cherry' }))
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('cherry')
    })
  })

  it('closes the list on Escape without changing the value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderCombobox({ onValueChange })
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(input)
    await screen.findByRole('option', { name: 'Apple' })
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument()
    })
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('starts with the provided default value', () => {
    renderCombobox({ defaultValue: 'blueberry' })
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('Blueberry')
  })
})

describe('Combobox clearing', () => {
  it('clears the selection with the clear button', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox items={fruits} defaultValue="apple" onValueChange={onValueChange}>
        <Combobox.Input label="Fruit">
          <Combobox.Clear />
        </Combobox.Input>
        <Combobox.Content>
          <Combobox.List />
        </Combobox.Content>
      </Combobox>,
    )
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith(null)
    })
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('')
  })
})

describe('Combobox disabled and readOnly states', () => {
  it('does not open when the whole combobox is disabled', async () => {
    const user = userEvent.setup()
    renderCombobox({ disabled: true })
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })

  it('does not let a read-only combobox change its value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderCombobox({ readOnly: true, defaultValue: 'apple', onValueChange })
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(input)
    await user.keyboard('{ArrowDown}{Enter}')
    expect(onValueChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('Apple')
  })

  it('highlights but does not select a disabled option', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const options: readonly TComboboxOption[] = [
      { value: 'apple', label: 'Apple', disabled: true },
      { value: 'banana', label: 'Banana' },
    ]
    renderCombobox({ onValueChange }, { items: options })
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(input)
    await user.keyboard('{ArrowDown}{Enter}')
    expect(input).toHaveAttribute('aria-activedescendant', expect.stringContaining('-0'))
    expect(onValueChange).not.toHaveBeenCalled()
    await user.keyboard('{ArrowDown}{Enter}')
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('banana')
    })
  })
})

describe('Combobox controlled state', () => {
  it('reflects the controlled value and reports changes', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [value, setValue] = useState<string | null>('apple')
      return (
        <>
          <Combobox items={fruits} value={value} onValueChange={setValue}>
            <Combobox.Input label="Fruit" />
            <Combobox.Content>
              <Combobox.List />
            </Combobox.Content>
          </Combobox>
          <output aria-label="Current value">{value ?? 'none'}</output>
        </>
      )
    }

    render(<Controlled />)
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await user.click(await screen.findByRole('option', { name: 'Cherry' }))
    await waitFor(() => {
      expect(screen.getByLabelText('Current value')).toHaveTextContent('cherry')
    })
  })
})

describe('Combobox form integration', () => {
  it('submits the selected value under the provided name', () => {
    const { container } = render(
      <form>
        <Combobox items={fruits} name="fruit" defaultValue="banana">
          <Combobox.Input label="Fruit" />
          <Combobox.Content>
            <Combobox.List />
          </Combobox.Content>
        </Combobox>
      </form>,
    )
    const hidden = container.querySelector<HTMLInputElement>('input[name="fruit"]')
    expect(hidden).not.toBeNull()
    expect(hidden?.value).toBe('banana')
  })

  it('marks the input as required when the required prop is set', () => {
    renderCombobox({ required: true })
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeRequired()
  })
})

describe('Combobox groups', () => {
  it('renders group labels with their items', async () => {
    const user = userEvent.setup()
    renderCombobox({}, { items: groups })
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    expect(await screen.findByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Go' })).toBeInTheDocument()
  })
})

describe('Combobox animated highlight', () => {
  it('renders a single hidden highlight surface inside the popup', async () => {
    const user = userEvent.setup()
    renderCombobox()
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    const listbox = await screen.findByRole('listbox')
    const popup = listbox.closest<HTMLElement>('.frontier-combobox__popup')
    const surfaces = popup?.querySelectorAll('.frontier-animated-highlight')
    expect(surfaces).toHaveLength(1)
    expect(surfaces?.[0]).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps one highlight surface when the filtered options change', async () => {
    const user = userEvent.setup()
    renderCombobox()
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    await user.type(input, 'ber')
    const listbox = await screen.findByRole('listbox')
    const popup = listbox.closest<HTMLElement>('.frontier-combobox__popup')
    expect(popup?.querySelectorAll('.frontier-animated-highlight')).toHaveLength(1)
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument()
  })
})
