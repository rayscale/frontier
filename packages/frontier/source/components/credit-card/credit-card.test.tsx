import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { CreditCard, detectCreditCardBrand } from './index.js'

describe('detectCreditCardBrand', () => {
  it.each([
    ['4242 4242 4242 4242', 'visa'],
    ['5018 0000 0000 0009', 'maestro'],
    ['3056 9309 0259 04', 'diners'],
    ['5555 5555 5555 4444', 'mastercard'],
    ['2221 0000 0000 0009', 'mastercard'],
    ['3782 822463 10005', 'amex'],
    ['6011 1111 1111 1117', 'discover'],
    ['3530 1113 3330 0000', 'jcb'],
    ['6200 0000 0000 0005', 'unionpay'],
    ['9999', 'generic'],
    ['', 'generic'],
  ])('reads %s as %s', (number, brand) => {
    expect(detectCreditCardBrand(number)).toBe(brand)
  })
})

describe('CreditCard', () => {
  it('names the card by its network and last digits', () => {
    render(<CreditCard number="4242424242421234" />)
    expect(screen.getByRole('group', { name: 'Visa card ending in 1234' })).toBeInTheDocument()
  })

  it('lets the consumer replace the accessible name', () => {
    render(<CreditCard number="4242424242421234" aria-label="Company card" />)
    expect(screen.getByRole('group', { name: 'Company card' })).toBeInTheDocument()
  })

  it('masks every digit but the last four by default', () => {
    render(<CreditCard number="4242424242421234" />)
    const number = screen.getByRole('img', { name: 'Card number ending in 1234' })
    expect(number).toHaveTextContent('•••• •••• •••• 1234')
  })

  it('prints the whole number when masked is false', () => {
    render(<CreditCard number="4242424242421234" masked={false} />)
    expect(screen.getByText('4242 4242 4242 1234')).toBeInTheDocument()
  })

  it('groups an American Express number as 4-6-5', () => {
    render(<CreditCard number="378282246310005" masked={false} />)
    expect(screen.getByText('3782 822463 10005')).toBeInTheDocument()
  })

  it('shows the holder and the expiry', () => {
    render(<CreditCard holder="Olivia Rhye" expiry="06/28" />)
    expect(screen.getByText('Olivia Rhye')).toBeInTheDocument()
    expect(screen.getByText('06/28')).toBeInTheDocument()
  })

  it('prefers an explicit brand over the number', () => {
    render(<CreditCard number="4242424242421234" brand="mastercard" />)
    expect(screen.getByRole('group', { name: /^Mastercard card/ })).toBeInTheDocument()
  })

  it('replaces the network logo with a custom one', () => {
    render(<CreditCard logo={<span>Custom</span>} />)
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('applies the variant and size classes', () => {
    render(<CreditCard variant="subtle" size="large" data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('frontier-credit-card--subtle', 'frontier-credit-card--large')
  })

  it('tints the card with the accent color', () => {
    render(<CreditCard accent="rebeccapurple" data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('frontier-credit-card--accent')
    expect(card.style.getPropertyValue('--_credit-card-accent')).toBe('rebeccapurple')
  })

  it('hides the contactless symbol on request', () => {
    const { container, rerender } = render(<CreditCard />)
    expect(container.querySelector('.frontier-credit-card__contactless')).not.toBeNull()
    rerender(<CreditCard contactless={false} />)
    expect(container.querySelector('.frontier-credit-card__contactless')).toBeNull()
  })

  it('marks a monochrome logo', () => {
    const { container } = render(<CreditCard brand="visa" monochrome />)
    expect(container.querySelector('.frontier-credit-card__brand')).toHaveAttribute(
      'data-monochrome',
    )
  })

  it('forwards the ref and native attributes', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CreditCard ref={ref} className="extra" id="card" />)
    expect(ref.current).toBe(document.getElementById('card'))
    expect(ref.current).toHaveClass('frontier-credit-card', 'extra')
  })
})
