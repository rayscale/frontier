import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { NumberField } from './index.js'

function getInput(): HTMLInputElement {
  return screen.getByRole<HTMLInputElement>('textbox')
}

describe('NumberField', () => {
  it('shows a labelled input with its value and both step buttons', () => {
    render(<NumberField defaultValue={5} label="Guests" />)

    expect(screen.getByLabelText('Guests')).toBe(getInput())
    expect(getInput().value).toBe('5')
    expect(screen.getByRole('button', { name: 'Increase' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeTruthy()
  })

  it('steps the value with the buttons and reports it', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<NumberField defaultValue={5} label="Guests" step={2} onValueChange={onValueChange} />)

    await user.click(screen.getByRole('button', { name: 'Increase' }))
    expect(getInput().value).toBe('7')
    expect(onValueChange).toHaveBeenLastCalledWith(7)

    await user.click(screen.getByRole('button', { name: 'Decrease' }))
    expect(getInput().value).toBe('5')
  })

  it('steps the value with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<NumberField defaultValue={5} label="Guests" />)

    await user.click(getInput())
    await user.keyboard('{ArrowUp}{ArrowUp}')
    expect(getInput().value).toBe('7')

    await user.keyboard('{ArrowDown}')
    expect(getInput().value).toBe('6')
  })

  it('stops at the lowest and the highest number', async () => {
    const user = userEvent.setup()
    render(<NumberField defaultValue={1} label="Guests" max={2} min={1} />)
    const decrease = screen.getByRole<HTMLButtonElement>('button', { name: 'Decrease' })
    const increase = screen.getByRole<HTMLButtonElement>('button', { name: 'Increase' })

    expect(decrease.disabled || decrease.hasAttribute('data-disabled')).toBe(true)

    await user.click(increase)

    expect(getInput().value).toBe('2')
    expect(increase.disabled || increase.hasAttribute('data-disabled')).toBe(true)
  })

  it('writes the number with the format and the locale', () => {
    render(
      <NumberField
        defaultValue={1234.5}
        format={{ style: 'currency', currency: 'USD' }}
        label="Price"
        locale="en-US"
      />,
    )

    expect(getInput().value).toBe('$1,234.50')
  })

  it('reads what people type', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<NumberField label="Guests" onValueChange={onValueChange} />)

    await user.type(getInput(), '42')
    await user.tab()

    expect(onValueChange).toHaveBeenLastCalledWith(42)
    expect(getInput().value).toBe('42')
  })

  it('reports an empty field as null', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<NumberField defaultValue={3} label="Guests" onValueChange={onValueChange} />)

    await user.clear(getInput())

    expect(onValueChange).toHaveBeenLastCalledWith(null)
  })

  it('follows a controlled value', async () => {
    const user = userEvent.setup()

    function Controlled() {
      const [value, setValue] = useState<number | null>(1)

      return (
        <>
          <NumberField label="Guests" value={value} onValueChange={setValue} />
          <button
            type="button"
            onClick={() => {
              setValue(10)
            }}
          >
            Ten
          </button>
        </>
      )
    }

    render(<Controlled />)
    await user.click(screen.getByRole('button', { name: 'Ten' }))

    expect(getInput().value).toBe('10')
  })

  it('puts both buttons after the number, or none', () => {
    const { container, unmount } = render(<NumberField controls="end" label="Guests" />)
    const box = container.querySelector('.frontier-number-field__box')

    expect(box?.firstElementChild?.tagName).toBe('INPUT')
    expect(screen.getAllByRole('button')).toHaveLength(2)
    unmount()

    render(<NumberField controls="none" label="Guests" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('names the buttons for other languages', () => {
    render(<NumberField decrementLabel="Menos" incrementLabel="Más" label="Cantidad" />)

    expect(screen.getByRole('button', { name: 'Más' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Menos' })).toBeTruthy()
  })

  it('links the description and the error to the input and marks it invalid', () => {
    render(<NumberField description="Up to six." error="Too many." label="Guests" />)

    const describedBy = getInput().getAttribute('aria-describedby') ?? ''
    expect(describedBy.split(' ')).toContain(screen.getByText('Up to six.').id)
    expect(describedBy.split(' ')).toContain(screen.getByText('Too many.').id)
    expect(getInput().getAttribute('aria-invalid')).toBe('true')
  })

  it('does not change when it is disabled or read only', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { unmount } = render(
      <NumberField disabled defaultValue={1} label="Guests" onValueChange={onValueChange} />,
    )

    expect(getInput().disabled).toBe(true)
    unmount()

    render(<NumberField readOnly defaultValue={1} label="Guests" onValueChange={onValueChange} />)
    await user.click(screen.getByRole('button', { name: 'Increase' }))

    expect(getInput().value).toBe('1')
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('sends its number with a form', () => {
    const { container } = render(
      <form>
        <NumberField defaultValue={4} label="Guests" name="guests" />
      </form>,
    )

    const form = container.querySelector('form')
    expect(new FormData(form ?? undefined).get('guests')).toBe('4')
  })

  it('passes attributes and the ref to the input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<NumberField ref={ref} className="extra" label="Guests" placeholder="0" />)

    expect(ref.current).toBe(getInput())
    expect(getInput().classList.contains('extra')).toBe(true)
    expect(getInput().getAttribute('placeholder')).toBe('0')
  })
})
