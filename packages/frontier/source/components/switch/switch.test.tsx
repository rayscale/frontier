import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from '../../index.js'

describe('Switch', () => {
  it('renders a switch named by its label', () => {
    render(<Switch label="Dark mode" />)

    expect(screen.getByRole('switch', { name: 'Dark mode' })).toBeInTheDocument()
  })

  it('toggles when the visible label is clicked', async () => {
    const user = userEvent.setup()

    render(<Switch label="Dark mode" />)

    const control = screen.getByRole('switch', { name: 'Dark mode' })

    await user.click(screen.getByText('Dark mode'))

    expect(control).toBeChecked()
  })

  it('toggles with Space and with Enter', async () => {
    const user = userEvent.setup()

    render(<Switch label="Dark mode" />)

    const control = screen.getByRole('switch', { name: 'Dark mode' })

    await user.tab()
    expect(control).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(control).toBeChecked()

    await user.keyboard(' ')
    expect(control).not.toBeChecked()
  })

  it('reports the change once', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Switch label="Dark mode" onChange={onChange} />)

    await user.click(screen.getByRole('switch', { name: 'Dark mode' }))

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('associates its description without changing the name', () => {
    render(<Switch label="Dark mode" description="Follows the system setting." />)

    const control = screen.getByRole('switch', { name: 'Dark mode' })

    expect(control).toHaveAccessibleDescription('Follows the system setting.')
  })

  it('keeps a disabled switch focusable, explains why, and ignores changes', async () => {
    const user = userEvent.setup()

    render(
      <Switch
        disabled
        disabledReason="Your plan does not include this setting."
        label="Dark mode"
      />,
    )

    const control = screen.getByRole('switch', { name: 'Dark mode' })

    expect(control).toHaveAttribute('aria-disabled', 'true')
    expect(control).not.toBeDisabled()
    expect(control).toHaveAccessibleDescription('Your plan does not include this setting.')

    await user.tab()
    expect(control).toHaveFocus()

    await user.click(screen.getByText('Dark mode'))
    await user.keyboard('{Enter}')
    await user.keyboard(' ')

    expect(control).not.toBeChecked()
  })

  it('forwards a ref to the input', () => {
    const ref = createRef<HTMLInputElement>()

    render(<Switch ref={ref} label="Dark mode" />)

    expect(ref.current?.type).toBe('checkbox')
  })
})
