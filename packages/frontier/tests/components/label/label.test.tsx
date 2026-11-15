import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Label } from '../../../source/index.js'

describe('Label', () => {
  it('names the field it points at and moves focus into it', async () => {
    const user = userEvent.setup()

    render(
      <>
        <Label htmlFor="email">Your email address</Label>
        <input id="email" />
      </>,
    )

    const field = screen.getByLabelText('Your email address')

    expect(field).toHaveProperty('tagName', 'INPUT')

    await user.click(screen.getByText('Your email address'))

    expect(field).toHaveFocus()
  })

  it('forwards its class name, native props, and ref', () => {
    const ref = createRef<HTMLLabelElement>()

    render(
      <Label ref={ref} className="custom-label" data-testid="label" htmlFor="email">
        Your email address
      </Label>,
    )

    const label = screen.getByTestId('label')

    expect(label).toHaveClass('frontier-label', 'custom-label')
    expect(label).toHaveAttribute('for', 'email')
    expect(ref.current).toBe(label)
  })
})
