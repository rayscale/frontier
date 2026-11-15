import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Input } from '../../../source/index.js'

describe('Input', () => {
  it('renders a labeled text input', () => {
    render(<Input label="Email" />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'text')
  })

  it('honors an explicit type', () => {
    render(<Input label="Email" type="email" />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'email')
  })

  it('forwards a ref to the input', () => {
    const ref = createRef<HTMLInputElement>()

    render(<Input ref={ref} label="Email" />)

    expect(ref.current?.tagName).toBe('INPUT')
  })

  it('associates the description', () => {
    render(<Input label="Email" description="We never share it." />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleDescription(
      'We never share it.',
    )
  })

  it('marks invalid and announces the error', () => {
    render(<Input label="Email" defaultValue="not-an-email" error="Enter a valid email." />)

    const input = screen.getByRole('textbox', { name: 'Email' })

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Enter a valid email.')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email.')
  })

  it('marks invalid without an error message', () => {
    render(<Input label="Email" invalid />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders leading and trailing content', () => {
    render(
      <Input
        label="Search"
        leadingIcon={<span data-testid="leading" />}
        trailingIcon={<span data-testid="trailing" />}
      />,
    )

    expect(screen.getByTestId('leading')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
  })

  it('shows a disabled reason and keeps the input focusable', async () => {
    const user = userEvent.setup()

    render(
      <Input
        label="Email"
        disabled
        disabledReason="Your plan does not include email."
        defaultValue="a@b.co"
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Email' })

    expect(input).toHaveAttribute('aria-disabled', 'true')
    expect(input).not.toBeDisabled()
    expect(input).toHaveAttribute('readonly')
    expect(input).toHaveAccessibleDescription('Your plan does not include email.')

    await user.tab()
    expect(input).toHaveFocus()

    await user.type(input, 'x')
    expect(input).toHaveValue('a@b.co')
  })

  it('keeps the description when disabled without a reason', () => {
    render(<Input label="Email" disabled description="We never share it." />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleDescription(
      'We never share it.',
    )
  })

  it('keeps a read-only input focusable without editing', async () => {
    const user = userEvent.setup()

    render(<Input label="Email" readOnly defaultValue="a@b.co" />)

    const input = screen.getByRole('textbox', { name: 'Email' })

    expect(input).toHaveAttribute('readonly')

    await user.tab()
    expect(input).toHaveFocus()

    await user.type(input, 'x')
    expect(input).toHaveValue('a@b.co')
  })

  it('uses the given id', () => {
    render(<Input id="email" label="Email" />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email')
  })
})
