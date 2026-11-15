import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from '../../index.js'

describe('Checkbox', () => {
  it('renders a checkbox named by its label', () => {
    render(<Checkbox label="Send me updates" />)

    expect(screen.getByRole('checkbox', { name: 'Send me updates' })).toBeInTheDocument()
  })

  it('toggles when the visible label is clicked', async () => {
    const user = userEvent.setup()

    render(<Checkbox label="Send me updates" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Send me updates' })

    expect(checkbox).not.toBeChecked()

    await user.click(screen.getByText('Send me updates'))

    expect(checkbox).toBeChecked()
  })

  it('toggles with Space and with Enter', async () => {
    const user = userEvent.setup()

    render(<Checkbox label="Send me updates" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Send me updates' })

    await user.tab()
    expect(checkbox).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(checkbox).toBeChecked()

    await user.keyboard(' ')
    expect(checkbox).not.toBeChecked()
  })

  it('reports the change once', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Checkbox label="Send me updates" onChange={onChange} />)

    await user.click(screen.getByRole('checkbox', { name: 'Send me updates' }))

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('associates its description without changing the name', () => {
    render(<Checkbox label="Send me updates" description="No more than one a week." />)

    const checkbox = screen.getByRole('checkbox', { name: 'Send me updates' })

    expect(checkbox).toHaveAccessibleDescription('No more than one a week.')
  })

  it('merges a given description with the helper text', () => {
    render(
      <>
        <span id="hint">Read the policy.</span>
        <Checkbox
          label="Send me updates"
          description="No more than one a week."
          aria-describedby="hint"
        />
      </>,
    )

    expect(screen.getByRole('checkbox', { name: 'Send me updates' })).toHaveAccessibleDescription(
      'Read the policy. No more than one a week.',
    )
  })

  it('keeps a disabled checkbox focusable, explains why, and ignores changes', async () => {
    const user = userEvent.setup()

    render(
      <Checkbox
        disabled
        disabledReason="You need permission to change notifications."
        label="Send me updates"
      />,
    )

    const checkbox = screen.getByRole('checkbox', { name: 'Send me updates' })

    expect(checkbox).toHaveAttribute('aria-disabled', 'true')
    expect(checkbox).not.toBeDisabled()
    expect(checkbox).toHaveAccessibleDescription('You need permission to change notifications.')

    await user.tab()
    expect(checkbox).toHaveFocus()

    await user.click(screen.getByText('Send me updates'))
    await user.keyboard('{Enter}')
    await user.keyboard(' ')

    expect(checkbox).not.toBeChecked()
  })

  it('forwards a ref to the input', () => {
    const ref = createRef<HTMLInputElement>()

    render(<Checkbox ref={ref} label="Send me updates" />)

    expect(ref.current?.type).toBe('checkbox')
  })
})
