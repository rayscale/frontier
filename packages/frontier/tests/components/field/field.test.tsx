import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Field } from '../../../source/index.js'

describe('Field', () => {
  it('names the control from the label', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control />
        </Field.Box>
      </Field.Root>,
    )

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
  })

  it('associates the description', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control />
        </Field.Box>
        <Field.Description>We never share it.</Field.Description>
      </Field.Root>,
    )

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleDescription(
      'We never share it.',
    )
  })

  it('marks invalid from the error and announces it', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control />
        </Field.Box>
        <Field.Error>Enter a valid email.</Field.Error>
      </Field.Root>,
    )

    const input = screen.getByRole('textbox', { name: 'Email' })

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Enter a valid email.')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email.')
  })

  it('describes both the help text and the error', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control />
        </Field.Box>
        <Field.Description>Use your work address.</Field.Description>
        <Field.Error>Enter a valid email.</Field.Error>
      </Field.Root>,
    )

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleDescription(
      'Use your work address. Enter a valid email.',
    )
  })

  it('shows a required marker and marks the control required', () => {
    render(
      <Field.Root required>
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control />
        </Field.Box>
      </Field.Root>,
    )

    expect(screen.getByText('Required')).toBeInTheDocument()

    const input = screen.getByRole('textbox', { name: 'Email' })

    expect(input).toBeRequired()
    expect(input).toHaveAttribute('aria-required', 'true')
  })

  it('keeps a disabled field focusable, read-only, and prevents edits', async () => {
    const user = userEvent.setup()

    render(
      <Field.Root disabled>
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control defaultValue="a@b.co" />
        </Field.Box>
        <Field.Description>Your plan does not include email.</Field.Description>
      </Field.Root>,
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

  it('uses the given id for the label and the control', () => {
    render(
      <Field.Root id="email">
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control />
        </Field.Box>
      </Field.Root>,
    )

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email')
  })

  it('merges a given aria-describedby with the field text', () => {
    render(
      <>
        <span id="hint">Read the policy.</span>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Field.Box>
            <Field.Control aria-describedby="hint" />
          </Field.Box>
          <Field.Description>We never share it.</Field.Description>
        </Field.Root>
      </>,
    )

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleDescription(
      'We never share it. Read the policy.',
    )
  })
})
