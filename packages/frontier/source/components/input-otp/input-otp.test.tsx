import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InputOTP } from './index.js'

function getSlots(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.frontier-input-otp__slot'))
}

describe('InputOTP', () => {
  beforeEach(() => {
    document.elementFromPoint = () => null
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders one input named by its label with a slot for each character', () => {
    const { container } = render(<InputOTP label="Verification code" />)

    const input = screen.getByRole('textbox', { name: 'Verification code' })

    expect(input).toHaveAttribute('maxlength', '6')
    expect(input).toHaveAttribute('inputmode', 'numeric')
    expect(getSlots(container)).toHaveLength(6)
  })

  it('shows typed characters in the slots and reports the value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { container } = render(<InputOTP label="Code" length={4} onValueChange={onValueChange} />)

    await user.type(screen.getByRole('textbox', { name: 'Code' }), '123')

    expect(onValueChange).toHaveBeenLastCalledWith('123')
    expect(getSlots(container).map((slot) => slot.textContent)).toEqual(['1', '2', '3', ''])
  })

  it('ignores characters that do not match the pattern', async () => {
    const user = userEvent.setup()
    render(<InputOTP label="Code" defaultValue="" />)

    const input = screen.getByRole('textbox', { name: 'Code' })
    await user.type(input, 'a1b2')

    expect(input).toHaveValue('12')
  })

  it('accepts another pattern', async () => {
    const user = userEvent.setup()
    render(<InputOTP label="Code" pattern="^[a-z]+$" inputMode="text" />)

    const input = screen.getByRole('textbox', { name: 'Code' })
    await user.type(input, 'a1b2')

    expect(input).toHaveValue('ab')
  })

  it('calls onComplete with the full code', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<InputOTP label="Code" length={4} onComplete={onComplete} />)

    await user.type(screen.getByRole('textbox', { name: 'Code' }), '1234')

    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('supports a controlled value', async () => {
    const user = userEvent.setup()

    function Controlled() {
      const [value, setValue] = useState('12')

      return <InputOTP label="Code" length={4} value={value} onValueChange={setValue} />
    }

    render(<Controlled />)
    const input = screen.getByRole('textbox', { name: 'Code' })

    await user.type(input, '3')

    expect(input).toHaveValue('123')
  })

  it('splits the slots into groups with separators', () => {
    const { container } = render(<InputOTP label="Code" groups={[3, 3]} />)

    expect(container.querySelectorAll('.frontier-input-otp__group')).toHaveLength(2)
    expect(container.querySelectorAll('.frontier-input-otp__separator')).toHaveLength(1)
  })

  it('shows one group when the group sizes do not add up to the length', () => {
    const { container } = render(<InputOTP label="Code" length={6} groups={[2, 2]} />)

    expect(container.querySelectorAll('.frontier-input-otp__group')).toHaveLength(1)
    expect(getSlots(container)).toHaveLength(6)
  })

  it('rejects a length that is not a positive integer', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<InputOTP label="Code" length={0} />)).toThrow(RangeError)
  })

  it('links the description and error and marks the input invalid', () => {
    render(<InputOTP label="Code" description="Sent by email." error="That code is wrong." />)

    const input = screen.getByRole('textbox', { name: 'Code' })

    expect(input).toHaveAccessibleDescription('Sent by email. That code is wrong.')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-errormessage')
  })

  it('marks the active slot while the input has focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<InputOTP label="Code" length={4} />)

    await user.click(screen.getByRole('textbox', { name: 'Code' }))

    expect(getSlots(container)[0]).toHaveAttribute('data-active')
  })

  it('does not accept typing when disabled', async () => {
    const user = userEvent.setup()
    render(<InputOTP label="Code" disabled />)

    const input = screen.getByRole('textbox', { name: 'Code' })
    await user.type(input, '123')

    expect(input).toBeDisabled()
    expect(input).toHaveValue('')
  })

  it('forwards native attributes and the ref to the input', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <form aria-label="Sign in">
        <InputOTP ref={ref} label="Code" name="code" autoComplete="one-time-code" required />
      </form>,
    )

    const input = screen.getByRole('textbox', { name: 'Code' })

    expect(ref.current).toBe(input)
    expect(input).toHaveAttribute('name', 'code')
    expect(input).toHaveAttribute('autocomplete', 'one-time-code')
    expect(input).toBeRequired()
  })
})
