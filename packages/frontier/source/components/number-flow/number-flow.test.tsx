import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NumberFlow, NumberFlow as PublicNumberFlow } from './index.js'

function getDigitValues(container: HTMLElement): number[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>('.frontier-number-flow__digit'),
    (digit) => Number(digit.dataset.digit),
  )
}

function getStripOffsets(container: HTMLElement): string[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>('.frontier-number-flow__strip'),
    (strip) => strip.style.getPropertyValue('--_number-flow-digit'),
  )
}

function getRoot(container: HTMLElement): HTMLElement {
  const root = container.firstElementChild

  if (!(root instanceof HTMLElement)) {
    throw new Error('Expected NumberFlow to render an HTML element')
  }

  return root
}

describe('NumberFlow', () => {
  it('is exported from the package entry point', () => {
    expect(PublicNumberFlow).toBe(NumberFlow)
  })

  it('renders the initial value with one animated column per digit', () => {
    const { container, getByText } = render(<NumberFlow value={1234} />)
    const visibleText = getByText('1,234')
    expect(visibleText).toHaveClass('frontier-number-flow__sr-only')
    expect(getDigitValues(container)).toEqual([1, 2, 3, 4])
    expect(getStripOffsets(container)).toEqual(['1', '2', '3', '4'])
  })

  it('keeps the root element free of entrance animation state', () => {
    const { container } = render(<NumberFlow value={42} />)
    expect(getRoot(container)).toHaveClass('frontier-number-flow')
    expect(getRoot(container).style.getPropertyValue('--_number-flow-duration')).toBe('')
  })

  it('updates the digits when the value increases', () => {
    const { container, rerender } = render(<NumberFlow value={12} />)
    rerender(<NumberFlow value={37} />)
    expect(getDigitValues(container)).toEqual([3, 7])
    expect(getStripOffsets(container)).toEqual(['3', '7'])
  })

  it('updates the digits when the value decreases', () => {
    const { container, rerender } = render(<NumberFlow value={250} />)
    rerender(<NumberFlow value={180} />)
    expect(getDigitValues(container)).toEqual([1, 8, 0])
  })

  it('adds a leading column when the value rolls from 9 to 10', () => {
    const { container, getByText, rerender } = render(<NumberFlow value={9} />)
    rerender(<NumberFlow value={10} />)
    expect(getByText('10')).toHaveClass('frontier-number-flow__sr-only')
    expect(getDigitValues(container)).toEqual([1, 0])
  })

  it('adds a leading column when the value rolls from 99 to 100', () => {
    const { container, rerender } = render(<NumberFlow value={99} />)
    rerender(<NumberFlow value={100} />)
    expect(getDigitValues(container)).toEqual([1, 0, 0])
  })

  it('removes a leading column when the value rolls from 100 to 99', () => {
    const { container, getByText, rerender } = render(<NumberFlow value={100} />)
    rerender(<NumberFlow value={99} />)
    expect(getByText('99')).toHaveClass('frontier-number-flow__sr-only')
    expect(getDigitValues(container)).toEqual([9, 9])
  })

  it('keeps the element for an unchanged place value when digit count changes', () => {
    const { container, rerender } = render(<NumberFlow value={9} />)
    const onesBefore = container.querySelectorAll('.frontier-number-flow__digit')[0]
    rerender(<NumberFlow value={10} />)
    const digits = container.querySelectorAll('.frontier-number-flow__digit')
    expect(digits[1]).toBe(onesBefore)
    expect(digits[1]).toHaveAttribute('data-digit', '0')
  })

  it('formats negative values with a static minus sign', () => {
    const { container, getByText } = render(<NumberFlow value={-12.5} />)
    const visibleText = getByText('-12.5')
    expect(visibleText).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([1, 2, 5])
  })

  it('animates fraction digits in addition to integer digits', () => {
    const { container, getByText, rerender } = render(
      <NumberFlow value={3} format={{ minimumFractionDigits: 2 }} />,
    )
    rerender(<NumberFlow value={3.75} format={{ minimumFractionDigits: 2 }} />)
    expect(getByText('3.75')).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([3, 7, 5])
  })

  it('formats values with the requested locale grouping and decimal separators', () => {
    const { container, getByText } = render(<NumberFlow value={1234.5} locale="de-DE" />)
    const visibleText = getByText('1.234,5')
    expect(visibleText).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([1, 2, 3, 4, 5])
  })

  it('animates locale-specific numerals when the locale uses them', () => {
    const { container, getByText, rerender } = render(<NumberFlow value={12} locale="ar-EG" />)
    rerender(<NumberFlow value={34} locale="ar-EG" />)
    expect(getByText('٣٤')).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([3, 4])
  })

  it('applies currency formatting and keeps the currency symbol static', () => {
    const { container, getByText } = render(
      <NumberFlow value={1250} locale="en-US" format={{ style: 'currency', currency: 'USD' }} />,
    )
    const visibleText = getByText('$1,250.00')
    expect(visibleText).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([1, 2, 5, 0, 0, 0])
  })

  it('applies percent formatting', () => {
    const { container, getByText } = render(
      <NumberFlow value={0.256} format={{ style: 'percent' }} />,
    )
    const visibleText = getByText('26%')
    expect(visibleText).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([2, 6])
  })

  it('applies compact notation and keeps the compact suffix static', () => {
    const { container, getByText } = render(
      <NumberFlow value={1200} format={{ notation: 'compact' }} />,
    )
    const visibleText = getByText('1.2K')
    expect(visibleText).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([1, 2])
  })

  it('respects grouping options', () => {
    const { getByText } = render(<NumberFlow value={1234567} format={{ useGrouping: false }} />)
    expect(getByText('1234567')).toBeInTheDocument()
  })

  it('applies the duration as a CSS custom property', () => {
    const { container } = render(<NumberFlow value={5} duration={300} />)
    const root = getRoot(container)
    expect(root.style.getPropertyValue('--_number-flow-duration')).toBe('300ms')
  })

  it('merges className and native attributes onto the root element', () => {
    const { container } = render(
      <NumberFlow
        value={5}
        className="custom-flow"
        id="total"
        style={{ color: 'rebeccapurple' }}
      />,
    )
    const root = getRoot(container)
    expect(root).toHaveClass('frontier-number-flow', 'custom-flow')
    expect(root).toHaveAttribute('id', 'total')
    expect(root.style.color).toBe('rebeccapurple')
  })

  it('settles on the final value after rapid successive updates', () => {
    const { container, getByText, rerender } = render(<NumberFlow value={0} />)
    for (let value = 1; value <= 25; value += 1) {
      rerender(<NumberFlow value={value} />)
    }

    expect(getByText('25')).toBeInTheDocument()
    expect(getDigitValues(container)).toEqual([2, 5])
    expect(getStripOffsets(container)).toEqual(['2', '5'])
  })

  it('exposes the formatted value once to assistive technology', () => {
    const { container, getByText } = render(<NumberFlow value={2048} />)
    const accessibleText = getByText('2,048')
    expect(accessibleText.closest('[aria-hidden="true"]')).toBeNull()
    expect(container.querySelectorAll('[aria-live]')).toHaveLength(0)
    expect(getRoot(container)).not.toHaveAttribute('aria-live')
  })

  it('hides the animated digits from assistive technology', () => {
    const { container } = render(<NumberFlow value={808} />)
    const visualLayer = container.querySelector('.frontier-number-flow__visual')
    expect(visualLayer).toHaveAttribute('aria-hidden', 'true')
  })
})
