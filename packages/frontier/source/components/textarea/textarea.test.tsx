import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Textarea } from './index.js'

describe('Textarea', () => {
  it('renders a textarea associated with its label and forwards native attributes', () => {
    render(
      <Textarea label="Message" placeholder="Say hello" rows={5} maxLength={200} name="message" />,
    )

    const textarea = screen.getByRole('textbox', { name: 'Message' })

    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveAttribute('placeholder', 'Say hello')
    expect(textarea).toHaveAttribute('rows', '5')
    expect(textarea).toHaveAttribute('maxlength', '200')
    expect(textarea).toHaveAttribute('name', 'message')
  })

  it('shows three rows by default', () => {
    render(<Textarea label="Message" />)

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute('rows', '3')
  })

  it('forwards the ref to the native textarea', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} label="Message" />)

    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Message' }))
  })

  it('supports uncontrolled and controlled values', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function Controlled() {
      const [value, setValue] = useState('')

      return (
        <Textarea
          label="Controlled"
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
            setValue(event.target.value.toUpperCase())
          }}
        />
      )
    }

    render(
      <>
        <Textarea label="Uncontrolled" defaultValue="start" />
        <Controlled />
      </>,
    )

    const uncontrolled = screen.getByRole('textbox', { name: 'Uncontrolled' })
    const controlled = screen.getByRole('textbox', { name: 'Controlled' })

    await user.type(uncontrolled, '!')
    await user.type(controlled, 'ab{Enter}c')

    expect(uncontrolled).toHaveValue('start!')
    expect(controlled).toHaveValue('AB\nC')
    expect(onChange).toHaveBeenCalled()
  })

  it('supports disabled and read-only states', () => {
    render(
      <>
        <Textarea aria-label="Disabled" disabled />
        <Textarea aria-label="Read only" readOnly value="Cannot edit" />
      </>,
    )

    expect(screen.getByRole('textbox', { name: 'Disabled' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Read only' })).toHaveAttribute('readonly')
    expect(
      screen.getByRole('textbox', { name: 'Read only' }).closest('.frontier-field'),
    ).toHaveAttribute('data-readonly')
  })

  it('associates descriptions and errors accessibly', () => {
    render(
      <>
        <span id="external-help">External help</span>
        <Textarea
          label="Bio"
          aria-describedby="external-help"
          description="Tell us about yourself"
          error="Bio is too short"
        />
      </>,
    )

    const textarea = screen.getByRole('textbox', { name: 'Bio' })
    const description = screen.getByText('Tell us about yourself')
    const error = screen.getByText('Bio is too short')

    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAttribute('aria-errormessage', error.id)
    expect(textarea.getAttribute('aria-describedby')).toBe(
      `external-help ${description.id} ${error.id}`,
    )
  })

  it('supports an invalid state without an error message', () => {
    render(<Textarea aria-label="Invalid field" invalid />)

    const textarea = screen.getByRole('textbox', { name: 'Invalid field' })

    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea.closest('.frontier-field')).toHaveAttribute('data-invalid')
  })

  it('applies the resize and auto size modifiers', () => {
    render(
      <>
        <Textarea aria-label="Default" />
        <Textarea aria-label="Fixed" resize="none" />
        <Textarea aria-label="Auto" autoSize />
      </>,
    )

    expect(screen.getByRole('textbox', { name: 'Default' })).not.toHaveClass(
      'frontier-textarea--fixed',
      'frontier-textarea--auto-size',
    )
    expect(screen.getByRole('textbox', { name: 'Fixed' })).toHaveClass('frontier-textarea--fixed')
    expect(screen.getByRole('textbox', { name: 'Auto' })).toHaveClass(
      'frontier-textarea--auto-size',
    )
  })

  it('keeps a consumer class on the textarea', () => {
    render(<Textarea aria-label="Notes" className="custom" />)

    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveClass(
      'frontier-field__control',
      'frontier-textarea',
      'custom',
    )
  })
})
