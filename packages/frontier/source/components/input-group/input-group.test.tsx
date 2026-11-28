import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button.js'

import { InputGroup } from './index.js'

describe('InputGroup', () => {
  it('names the field with the label and connects the description', () => {
    render(
      <InputGroup label="Website" description="Include the protocol.">
        <InputGroup.Input placeholder="https://" />
      </InputGroup>,
    )

    const input = screen.getByRole('textbox', { name: 'Website' })

    expect(input).toHaveAccessibleDescription('Include the protocol.')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('renders a textarea as the field', () => {
    render(
      <InputGroup label="Message">
        <InputGroup.Textarea placeholder="Write" rows={4} />
      </InputGroup>,
    )

    const textarea = screen.getByRole('textbox', { name: 'Message' })

    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveAttribute('rows', '4')
  })

  it('shows addons with their side and keeps the content in the group', () => {
    const { container } = render(
      <InputGroup label="Search">
        <InputGroup.Addon align="start">
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input />
        <InputGroup.Addon align="end">end</InputGroup.Addon>
        <InputGroup.Addon align="top">top</InputGroup.Addon>
        <InputGroup.Addon align="bottom">bottom</InputGroup.Addon>
        <InputGroup.Addon>default</InputGroup.Addon>
      </InputGroup>,
    )

    const sides = Array.from(container.querySelectorAll('.frontier-input-group__addon')).map(
      (addon) => addon.getAttribute('data-align'),
    )

    expect(sides).toEqual(['start', 'end', 'top', 'bottom', 'start'])
    expect(screen.getByText('https://')).toHaveClass('frontier-input-group__text')
  })

  it('focuses the field when the blank area of an addon is clicked', async () => {
    const user = userEvent.setup()
    render(
      <InputGroup label="Message">
        <InputGroup.Textarea />
        <InputGroup.Addon align="bottom">Hint</InputGroup.Addon>
      </InputGroup>,
    )

    await user.click(screen.getByText('Hint'))

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveFocus()
  })

  it('keeps focus on a button inside an addon and runs its action', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <InputGroup label="Message">
        <InputGroup.Textarea />
        <InputGroup.Addon align="bottom">
          <Button size="icon-small" aria-label="Send" onClick={onClick} />
        </InputGroup.Addon>
      </InputGroup>,
    )

    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.getByRole('textbox', { name: 'Message' })).not.toHaveFocus()
  })

  it('lets an addon handler prevent the focus move', async () => {
    const user = userEvent.setup()
    render(
      <InputGroup label="Message">
        <InputGroup.Input />
        <InputGroup.Addon
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          Hint
        </InputGroup.Addon>
      </InputGroup>,
    )

    await user.click(screen.getByText('Hint'))

    expect(screen.getByRole('textbox', { name: 'Message' })).not.toHaveFocus()
  })

  it('links the error, marks the field invalid, and merges existing descriptions', () => {
    render(
      <>
        <span id="external">External help</span>
        <InputGroup label="Website" description="Include the protocol." error="Not a valid URL.">
          <InputGroup.Input aria-describedby="external" />
        </InputGroup>
      </>,
    )

    const input = screen.getByRole('textbox', { name: 'Website' })
    const error = screen.getByText('Not a valid URL.')

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-errormessage', error.id)
    expect(input).toHaveAccessibleDescription(
      'External help Include the protocol. Not a valid URL.',
    )
  })

  it('supports an invalid state without an error message', () => {
    render(
      <InputGroup label="Website" invalid>
        <InputGroup.Input />
      </InputGroup>,
    )

    const input = screen.getByRole('textbox', { name: 'Website' })

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input.closest('.frontier-field')).toHaveAttribute('data-invalid')
  })

  it('disables and read-only-locks the field from the group', async () => {
    const user = userEvent.setup()
    render(
      <>
        <InputGroup label="Disabled" disabled>
          <InputGroup.Input />
        </InputGroup>
        <InputGroup label="Read only" readOnly>
          <InputGroup.Input defaultValue="Locked" />
        </InputGroup>
      </>,
    )

    const disabled = screen.getByRole('textbox', { name: 'Disabled' })
    const readOnly = screen.getByRole('textbox', { name: 'Read only' })
    await user.type(readOnly, 'x')

    expect(disabled).toBeDisabled()
    expect(readOnly).toHaveAttribute('readonly')
    expect(readOnly).toHaveValue('Locked')
    expect(readOnly.closest('.frontier-field')).toHaveAttribute('data-readonly')
  })

  it('supports a controlled field', async () => {
    const user = userEvent.setup()

    function Controlled() {
      const [value, setValue] = useState('')

      return (
        <InputGroup label="Message">
          <InputGroup.Input
            value={value}
            onChange={(event) => {
              setValue(event.target.value.toUpperCase())
            }}
          />
        </InputGroup>
      )
    }

    render(<Controlled />)
    const input = screen.getByRole('textbox', { name: 'Message' })
    await user.type(input, 'ab')

    expect(input).toHaveValue('AB')
  })

  it('grows the textarea with its content and never shows a resize handle', () => {
    render(
      <InputGroup label="Message">
        <InputGroup.Textarea />
      </InputGroup>,
    )

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveClass(
      'frontier-input-group__textarea--auto-size',
    )
  })

  it('keeps the number of rows when auto size is turned off', () => {
    render(
      <InputGroup label="Message">
        <InputGroup.Textarea autoSize={false} rows={5} />
      </InputGroup>,
    )

    const textarea = screen.getByRole('textbox', { name: 'Message' })

    expect(textarea).not.toHaveClass('frontier-input-group__textarea--auto-size')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('forwards refs and native attributes to the box and the field', () => {
    const boxRef = createRef<HTMLDivElement>()
    const inputRef = createRef<HTMLInputElement>()
    render(
      <InputGroup ref={boxRef} label="Website" data-testid="box" className="custom">
        <InputGroup.Input ref={inputRef} name="website" autoComplete="url" />
      </InputGroup>,
    )

    const input = screen.getByRole('textbox', { name: 'Website' })

    expect(boxRef.current).toBe(screen.getByTestId('box'))
    expect(boxRef.current).toHaveClass('frontier-input-group', 'custom')
    expect(inputRef.current).toBe(input)
    expect(input).toHaveAttribute('name', 'website')
    expect(input).toHaveAttribute('autocomplete', 'url')
  })

  it('requires its parts to be inside a group', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<InputGroup.Input />)).toThrow('inside InputGroup')

    vi.restoreAllMocks()
  })
})
