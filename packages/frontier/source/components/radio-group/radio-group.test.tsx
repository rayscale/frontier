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

    expect(() => render(<RadioGroup.Item value="free" label="Free" />)).toThrow(/inside RadioGroup/)

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

  it('associates the group description', () => {
    render(
      <RadioGroup label="Plan" description="Cancel whenever you want.">
        <RadioGroup.Item value="free" label="Free" />
      </RadioGroup>,
    )

    expect(screen.getByRole('group', { name: 'Plan' })).toHaveAccessibleDescription(
      'Cancel whenever you want.',
    )
  })

  it('associates an option description with its radio', () => {
    render(
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" description="For one person." />
      </RadioGroup>,
    )

    expect(screen.getByRole('radio', { name: 'Free' })).toHaveAccessibleDescription(
      'For one person.',
    )
  })

  it('announces the error and marks every option invalid', () => {
    render(
      <RadioGroup label="Plan" error="Choose a plan.">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Choose a plan.')

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAttribute('aria-invalid', 'true')
    }
  })

  it('marks the group invalid without an error', () => {
    render(
      <RadioGroup label="Plan" invalid>
        <RadioGroup.Item value="free" label="Free" />
      </RadioGroup>,
    )

    expect(screen.getByRole('radio', { name: 'Free' })).toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('disables every option and explains why', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <RadioGroup
        label="Plan"
        description="Cancel whenever you want."
        disabled
        disabledReason="Your plan is managed by your admin."
        onValueChange={onValueChange}
      >
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    expect(screen.getByRole('group', { name: 'Plan' })).toHaveAccessibleDescription(
      'Your plan is managed by your admin.',
    )

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAttribute('aria-disabled', 'true')
    }

    await user.click(screen.getByText('Pro'))

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('keeps a disabled group reachable by keyboard without changing the value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <RadioGroup
        label="Plan"
        defaultValue="free"
        disabled
        disabledReason="Your plan is managed by your admin."
        onValueChange={onValueChange}
      >
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    await user.tab()
    expect(screen.getByRole('radio', { name: 'Free' })).toHaveFocus()

    await user.keyboard('{ArrowDown}{End}{Enter} ')

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()
  })

  it('moves the selection to the first and last option with Home and End', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup label="Plan" defaultValue="pro">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
        <RadioGroup.Item value="team" label="Team" />
        <RadioGroup.Item value="legacy" label="Legacy" disabled disabledReason="Retired." />
      </RadioGroup>,
    )

    await user.tab()
    await user.keyboard('{End}')

    expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Team' })).toHaveFocus()

    await user.keyboard('{Home}')

    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Free' })).toHaveFocus()
  })

  it('selects the focused option with Enter', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    )

    await user.tab()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()
  })

  it('marks the group label as required', () => {
    render(
      <RadioGroup label="Plan" required>
        <RadioGroup.Item value="free" label="Free" />
      </RadioGroup>,
    )

    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('places the description after the options', () => {
    render(
      <RadioGroup label="Plan" description="Cancel whenever you want.">
        <RadioGroup.Item value="free" label="Free" />
      </RadioGroup>,
    )

    const description = screen.getByText('Cancel whenever you want.')
    const option = screen.getByRole('radio', { name: 'Free' })

    expect(
      option.compareDocumentPosition(description) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('cannot select a disabled option', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup label="Plan" defaultValue="free">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" disabled disabledReason="Ask your admin." />
      </RadioGroup>,
    )

    const option = screen.getByRole('radio', { name: 'Pro' })

    expect(option).toBeDisabled()
    expect(option).toHaveAccessibleDescription('Ask your admin.')
    expect(option.closest('.frontier-radio-group__item')).toHaveAttribute('data-disabled', 'true')

    await user.click(screen.getByText('Pro'))

    expect(option).not.toBeChecked()
  })

  it('lays the options out horizontally when asked', () => {
    render(
      <RadioGroup label="Plan" orientation="horizontal">
        <RadioGroup.Item value="free" label="Free" />
      </RadioGroup>,
    )

    expect(screen.getByRole('group', { name: 'Plan' })).toHaveClass(
      'frontier-radio-group--horizontal',
    )
  })

  it('applies the consumer class name to the option row', () => {
    render(
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" className="custom-option" />
      </RadioGroup>,
    )

    expect(
      screen.getByRole('radio', { name: 'Free' }).closest('.frontier-radio-group__item'),
    ).toHaveClass('custom-option')
  })

  it('announces the group error on each option', () => {
    render(
      <RadioGroup label="Plan" error="Choose a plan.">
        <RadioGroup.Item value="free" label="Free" description="For one person." />
      </RadioGroup>,
    )

    expect(screen.getByRole('radio', { name: 'Free' })).toHaveAccessibleDescription(
      'For one person. Choose a plan.',
    )
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
