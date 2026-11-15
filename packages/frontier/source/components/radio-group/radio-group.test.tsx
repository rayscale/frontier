import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup } from './index.js'

describe('RadioGroup', () => {
  it('names the group by its legend and each option by its label', () => {
    render(
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    expect(screen.getByRole('group', { name: 'Plan' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(2)
    expect(screen.getByRole('radio', { name: 'Free' })).toBeInTheDocument()
  })

  it('selects an option when its label is clicked', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    await user.click(screen.getByText('Pro'))

    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked()
  })

  it('reports the selected value once', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <RadioGroup label="Plan" onValueChange={onValueChange}>
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    await user.click(screen.getByRole('radio', { name: 'Pro' }))

    expect(onValueChange).toHaveBeenCalledOnce()
    expect(onValueChange).toHaveBeenCalledWith('pro')
  })

  it('keeps a controlled group on the value it is given', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup label="Plan" value="free" onValueChange={() => undefined}>
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    await user.click(screen.getByRole('radio', { name: 'Pro' }))

    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()
  })

  it('keeps the selection when uncontrolled', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup label="Plan" defaultValue="free">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()

    await user.click(screen.getByRole('radio', { name: 'Pro' }))

    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked()
  })

  it('marks every option required when the group is required', () => {
    render(
      <RadioGroup label="Plan" required>
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toBeRequired()
    }
  })

  it('does not share a generated name between two groups', async () => {
    const user = userEvent.setup()

    render(
      <>
        <RadioGroup label="Plan">
          <RadioGroup.Item value="free" label="Free" />
        </RadioGroup>
        <RadioGroup label="Billing">
          <RadioGroup.Item value="monthly" label="Monthly" />
        </RadioGroup>
      </>,
    )

    await user.click(screen.getByRole('radio', { name: 'Free' }))
    await user.click(screen.getByRole('radio', { name: 'Monthly' }))

    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Monthly' })).toBeChecked()
  })

  it('throws when an item is rendered outside a group', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<RadioGroup.Item value="free" label="Free" />)).toThrow(
      /inside RadioGroup/,
    )

    consoleError.mockRestore()
  })

  it('shares one form name across the options', () => {
    render(
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    const [free, pro] = screen.getAllByRole('radio')

    expect(free).toHaveAttribute('name')
    expect(free?.getAttribute('name')).toBe(pro?.getAttribute('name'))
  })

  it('selects the focused option with Space', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    await user.tab()
    await user.keyboard(' ')

    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()
  })

  it('forwards a ref to the fieldset and to an option input', () => {
    const groupRef = createRef<HTMLFieldSetElement>()
    const inputRef = createRef<HTMLInputElement>()

    render(
      <RadioGroup label="Plan" ref={groupRef}>
        <RadioGroup.Item value="free" label="Free" ref={inputRef} />
      </RadioGroup>,
    )

    expect(groupRef.current).toBe(screen.getByRole('group', { name: 'Plan' }))
    expect(inputRef.current).toBe(screen.getByRole('radio', { name: 'Free' }))
  })
})
