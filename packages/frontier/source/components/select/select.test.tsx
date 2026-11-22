import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Select } from './index.js'

function BasicSelect(props: {
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  name?: string
  required?: boolean
}) {
  return (
    <Select.Root
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      disabled={props.disabled}
      name={props.name}
      required={props.required}
    >
      <Select.Trigger aria-label="Fruit">
        <Select.Value placeholder="Pick a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="cherry" disabled>
            Cherry
          </Select.Item>
        </Select.List>
      </Select.Content>
    </Select.Root>
  )
}

function ControlledSelect({ onChange }: { onChange: (value: string | null) => void }) {
  const [value, setValue] = useState<string | null>('apple')

  return (
    <>
      <Select.Root
        value={value}
        onValueChange={(nextValue) => {
          setValue(nextValue)
          onChange(nextValue)
        }}
      >
        <Select.Trigger aria-label="Controlled">
          <Select.Value placeholder="Pick" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>
      <output data-testid="controlled-value">{value ?? 'none'}</output>
    </>
  )
}

async function openWithKeyboard(user: ReturnType<typeof userEvent.setup>) {
  await user.tab()
  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toHaveFocus())
}

describe('Select', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the placeholder when no value is selected', () => {
    render(<BasicSelect />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    expect(trigger).toHaveTextContent('Pick a fruit')
    expect(trigger.querySelector('[data-placeholder]')).not.toBeNull()
  })

  it('applies the one class names to the trigger', () => {
    render(<BasicSelect />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    expect(trigger).toHaveClass('frontier-select__trigger')
    expect(trigger.querySelector('.frontier-select__value')).not.toBeNull()
    expect(trigger.querySelector('.frontier-select__icon')).not.toBeNull()
  })

  it('animates the selected value width when its label changes', async () => {
    const user = userEvent.setup()
    render(<BasicSelect defaultValue="apple" />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    const animatedValue = trigger.querySelector('.frontier-auto-size[data-axis="horizontal"]')

    expect(animatedValue).not.toBeNull()
    await user.click(trigger)
    await user.click(await screen.findByRole('option', { name: 'Banana' }))
    expect(trigger).toHaveTextContent('Banana')
    expect(trigger.querySelector('.frontier-auto-size[data-axis="horizontal"]')).toBe(animatedValue)
  })

  it('opens the popup when the trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<BasicSelect />)
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    const listbox = await screen.findByRole('listbox')
    expect(listbox).toHaveClass('frontier-select__list')
    expect(listbox.closest('.frontier-select__popup')).toHaveClass('frontier-floating-surface')
  })

  it('selects an option, updates the value, and closes the popup', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect onValueChange={onValueChange} />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(trigger)
    await user.click(await screen.findByRole('option', { name: 'Banana' }))
    expect(onValueChange).toHaveBeenCalledWith('banana')
    expect(trigger).toHaveTextContent('Banana')
  })

  it('marks the selected option with aria-selected', async () => {
    const user = userEvent.setup()
    render(<BasicSelect defaultValue="apple" />)
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    expect(await screen.findByRole('option', { name: 'Apple' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute('aria-selected', 'false')
  })

  it('uses defaultValue as the initial selection', () => {
    render(<BasicSelect defaultValue="banana" />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    expect(trigger).toHaveTextContent('Banana')
  })

  it('keeps a controlled value in sync with onValueChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ControlledSelect onChange={onChange} />)
    const trigger = screen.getByRole('combobox', { name: 'Controlled' })
    await user.click(trigger)
    await user.click(await screen.findByRole('option', { name: 'Banana' }))
    expect(onChange).toHaveBeenCalledWith('banana')
    expect(screen.getByTestId('controlled-value')).toHaveTextContent('banana')
    expect(trigger).toHaveTextContent('Banana')
  })

  it('does not open when the root is disabled', async () => {
    const user = userEvent.setup()
    render(<BasicSelect disabled />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(trigger)
    expect(trigger).toBeDisabled()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('does not select a disabled option', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect onValueChange={onValueChange} />)
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await user.click(await screen.findByRole('option', { name: 'Cherry' }))
    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('option', { name: 'Cherry' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('opens with the keyboard and selects with Enter', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect onValueChange={onValueChange} />)
    await openWithKeyboard(user)
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    expect(onValueChange).toHaveBeenCalledWith('banana')
  })

  it('moves the highlight back to the first enabled option with Home', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect onValueChange={onValueChange} />)
    await openWithKeyboard(user)
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Home}')
    await user.keyboard('{Enter}')
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('apple')
  })

  it('moves the highlight to the last enabled option with End', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect onValueChange={onValueChange} />)
    await openWithKeyboard(user)
    await user.keyboard('{End}')
    await user.keyboard('{Enter}')
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('banana')
  })

  it('closes on Escape and restores focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<BasicSelect />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    await user.click(trigger)
    await screen.findByRole('listbox')
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
  })

  it('renders group labels and separators', async () => {
    const user = userEvent.setup()
    render(
      <Select.Root>
        <Select.Trigger aria-label="Food">
          <Select.Value placeholder="Pick" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Group>
              <Select.GroupLabel>Fruits</Select.GroupLabel>
              <Select.Item value="apple">Apple</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Vegetables</Select.GroupLabel>
              <Select.Item value="carrot">Carrot</Select.Item>
            </Select.Group>
          </Select.List>
        </Select.Content>
      </Select.Root>,
    )
    await user.click(screen.getByRole('combobox', { name: 'Food' }))
    const listbox = await screen.findByRole('listbox')
    const groups = within(listbox).getAllByRole('group')
    const [fruits, vegetables] = groups

    if (!fruits || !vegetables) {
      throw new Error('Expected two groups.')
    }

    expect(groups).toHaveLength(2)
    expect(within(fruits).getByText('Fruits')).toHaveClass('frontier-select__group-label')
    expect(within(vegetables).getByText('Vegetables')).toBeInTheDocument()
    expect(listbox.querySelector('.frontier-select__separator')).not.toBeNull()
  })

  it('submits the selected value with a form using name', () => {
    const { container } = render(
      <form>
        <BasicSelect defaultValue="banana" name="fruit" />
      </form>,
    )
    const hiddenInput = container.querySelector<HTMLInputElement>('input[name="fruit"]')
    expect(hiddenInput).not.toBeNull()
    expect(hiddenInput).toHaveValue('banana')
  })

  it('marks the trigger as required when required is set', () => {
    render(<BasicSelect required />)
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    expect(trigger).toHaveAttribute('aria-required', 'true')
  })

  it('forwards the ref to the trigger button', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <Select.Root>
        <Select.Trigger ref={ref} aria-label="Ref">
          <Select.Value placeholder="Pick" />
        </Select.Trigger>
      </Select.Root>,
    )
    const trigger = screen.getByRole('combobox', { name: 'Ref' })
    expect(ref.current).toBe(trigger)
  })

  it('forwards className and data attributes to parts', () => {
    render(
      <Select.Root>
        <Select.Trigger aria-label="Custom" className="custom-trigger" data-testid="trigger">
          <Select.Value placeholder="Pick" />
        </Select.Trigger>
      </Select.Root>,
    )
    const trigger = screen.getByTestId('trigger')
    expect(trigger).toHaveClass('frontier-select__trigger', 'custom-trigger')
  })
})

describe('Select animated highlight', () => {
  it('renders a single hidden highlight surface inside the popup', async () => {
    const user = userEvent.setup()
    render(<BasicSelect />)
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    const listbox = await screen.findByRole('listbox')
    const popup = listbox.closest<HTMLElement>('.frontier-select__popup')
    const surfaces = popup?.querySelectorAll('.frontier-animated-highlight')
    expect(surfaces).toHaveLength(1)
    expect(surfaces?.[0]).toHaveAttribute('aria-hidden', 'true')
  })

  it('marks the pointer-hovered option as the highlight target', async () => {
    const user = userEvent.setup()
    render(<BasicSelect />)
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    const banana = await screen.findByRole('option', { name: 'Banana' })
    await user.hover(banana)
    expect(banana).toHaveAttribute('data-highlighted')
    expect(screen.getByRole('option', { name: 'Cherry' })).not.toHaveAttribute('data-highlighted')
  })
})
