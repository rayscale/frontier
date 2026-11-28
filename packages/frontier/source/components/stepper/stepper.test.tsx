import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Stepper } from './index.js'

function getItem(title: string): HTMLElement {
  const item = screen.getByText(title).closest('li')

  if (!item) {
    throw new Error(`Expected "${title}" to be inside a step.`)
  }

  return item
}

function renderStepper(props: Parameters<typeof Stepper.Root>[0] = {}) {
  return render(
    <Stepper.Root {...props}>
      <Stepper.List aria-label="Checkout">
        <Stepper.Item value={1}>
          <Stepper.Indicator />
          <Stepper.Title>Cart</Stepper.Title>
          <Stepper.Description>Review your items</Stepper.Description>
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Stepper.Indicator />
          <Stepper.Title>Shipping</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Stepper.Indicator />
          <Stepper.Title>Payment</Stepper.Title>
        </Stepper.Item>
      </Stepper.List>
      <Stepper.Panel value={1}>Cart content</Stepper.Panel>
      <Stepper.Panel value={2}>Shipping content</Stepper.Panel>
      <Stepper.Panel value={3}>Payment content</Stepper.Panel>
    </Stepper.Root>,
  )
}

describe('Stepper', () => {
  it('renders an ordered list of steps with titles and descriptions', () => {
    renderStepper()

    const list = screen.getByRole('list', { name: 'Checkout' })

    expect(list.tagName).toBe('OL')
    expect(within(list).getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('Review your items')).toBeInTheDocument()
  })

  it('starts at the first step and marks the others as upcoming', () => {
    renderStepper()

    const items = screen.getAllByRole('listitem')

    expect(items.map((item) => item.getAttribute('data-status'))).toEqual([
      'current',
      'upcoming',
      'upcoming',
    ])
    expect(items[0]).toHaveAttribute('aria-current', 'step')
    expect(items[1]).not.toHaveAttribute('aria-current')
  })

  it('marks earlier steps completed and announces it', () => {
    renderStepper({ defaultValue: 3 })

    const items = screen.getAllByRole('listitem')

    expect(items.map((item) => item.getAttribute('data-status'))).toEqual([
      'completed',
      'completed',
      'current',
    ])
    expect(within(getItem('Cart')).getByText('Completed')).toBeInTheDocument()
    expect(within(getItem('Payment')).queryByText('Completed')).not.toBeInTheDocument()
  })

  it('lets the announcement for completed steps be changed', () => {
    renderStepper({ defaultValue: 2, completedLabel: 'Hecho' })

    expect(screen.getByText('Hecho')).toBeInTheDocument()
  })

  it('marks every step completed when the value is past the last step', () => {
    renderStepper({ value: 4 })

    expect(screen.getAllByRole('listitem').map((item) => item.getAttribute('data-status'))).toEqual(
      ['completed', 'completed', 'completed'],
    )
  })

  it('shows the number of a step, a check once completed, or the icon passed in', () => {
    const { container } = render(
      <Stepper.Root value={2}>
        <Stepper.List>
          <Stepper.Item value={1}>
            <Stepper.Indicator />
          </Stepper.Item>
          <Stepper.Item value={2}>
            <Stepper.Indicator />
          </Stepper.Item>
          <Stepper.Item value={3}>
            <Stepper.Indicator>
              <svg data-testid="custom-icon" />
            </Stepper.Indicator>
          </Stepper.Item>
        </Stepper.List>
      </Stepper.Root>,
    )

    const indicators = container.querySelectorAll('.frontier-stepper__indicator')

    expect(indicators[0]?.querySelector('svg')).toBeInTheDocument()
    expect(indicators[1]).toHaveTextContent('2')
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    indicators.forEach((indicator) => {
      expect(indicator).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('shows only the content of the current step', () => {
    renderStepper({ defaultValue: 2 })

    expect(screen.getByText('Shipping content')).toBeVisible()
    expect(screen.getByText('Cart content')).not.toBeVisible()
    expect(screen.getByText('Payment content')).not.toBeVisible()
  })

  it('lays steps out in a row by default and in a column when vertical', () => {
    const { container, rerender } = renderStepper()

    expect(container.querySelector('.frontier-stepper')).toHaveAttribute(
      'data-orientation',
      'horizontal',
    )

    rerender(
      <Stepper.Root orientation="vertical">
        <Stepper.List />
      </Stepper.Root>,
    )

    expect(container.querySelector('.frontier-stepper')).toHaveAttribute(
      'data-orientation',
      'vertical',
    )
  })

  it('does not make steps selectable without onValueChange', () => {
    renderStepper()

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('selects a step when it is chosen and onValueChange is given', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderStepper({ onValueChange })

    await user.click(screen.getByRole('button', { name: /Shipping/ }))

    expect(onValueChange).toHaveBeenCalledWith(2)
    expect(screen.getAllByRole('listitem')[1]).toHaveAttribute('data-status', 'current')
  })

  it('leaves the current step to the owner in controlled mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderStepper({ value: 1, onValueChange })

    await user.click(screen.getByRole('button', { name: /Payment/ }))

    expect(onValueChange).toHaveBeenCalledWith(3)
    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('data-status', 'current')
  })

  it('does not select a disabled step', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Stepper.Root onValueChange={onValueChange}>
        <Stepper.List>
          <Stepper.Item value={1}>
            <Stepper.Title>One</Stepper.Title>
          </Stepper.Item>
          <Stepper.Item value={2} disabled>
            <Stepper.Title>Two</Stepper.Title>
          </Stepper.Item>
        </Stepper.List>
      </Stepper.Root>,
    )

    const button = screen.getByRole('button', { name: 'Two' })
    await user.click(button)

    expect(button).toBeDisabled()
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('forwards refs and native attributes to the parts', () => {
    const rootRef = createRef<HTMLDivElement>()
    const itemRef = createRef<HTMLLIElement>()
    render(
      <Stepper.Root ref={rootRef} className="custom" data-testid="root">
        <Stepper.List>
          <Stepper.Item ref={itemRef} value={1} data-testid="item">
            <Stepper.Title>One</Stepper.Title>
          </Stepper.Item>
        </Stepper.List>
      </Stepper.Root>,
    )

    expect(rootRef.current).toBe(screen.getByTestId('root'))
    expect(rootRef.current).toHaveClass('frontier-stepper', 'custom')
    expect(itemRef.current).toBe(screen.getByTestId('item'))
  })

  it('requires its parts to be inside a stepper', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<Stepper.Item value={1} />)).toThrow('inside Stepper.Root')

    vi.restoreAllMocks()
  })
})
