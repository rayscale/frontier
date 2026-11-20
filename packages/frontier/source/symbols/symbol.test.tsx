import { render } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Check, createSymbol, Symbol } from './index.js'

describe('Symbol', () => {
  it('draws its shapes on the 24-unit grid and stays out of the accessibility tree', () => {
    const { container } = render(<Check data-testid="check" />)

    const symbol = container.querySelector('svg')

    expect(symbol).toHaveAttribute('viewBox', '0 0 24 24')
    expect(symbol).toHaveAttribute('aria-hidden', 'true')
    expect(symbol?.querySelector('path')).toHaveAttribute('d', 'M20 6 9 17l-5-5')
  })

  it('sizes the symbol from the size prop and defaults to 24', () => {
    const { container } = render(
      <>
        <Check data-testid="default" />
        <Check data-testid="small" size={16} />
      </>,
    )

    expect(container.querySelector('[data-testid="default"]')).toHaveAttribute('width', '24')
    expect(container.querySelector('[data-testid="small"]')).toHaveAttribute('width', '16')
    expect(container.querySelector('[data-testid="small"]')).toHaveAttribute('height', '16')
  })

  it('forwards its class name, native props, and ref', () => {
    const ref = createRef<SVGSVGElement>()

    render(<Check ref={ref} className="custom-symbol" data-testid="check" />)

    const symbol = document.querySelector('[data-testid="check"]')

    expect(symbol).toHaveClass('frontier-symbol', 'custom-symbol')
    expect(ref.current).toBe(symbol)
  })

  it('creates a named symbol that exposes its shapes', () => {
    const Dot = createSymbol({
      name: 'Dot',
      symbolNode: [['circle', { cx: 12, cy: 12, r: 4 }]],
    })

    expect(Dot.displayName).toBe('Dot')
    expect(Dot.symbolNode).toEqual([['circle', { cx: 12, cy: 12, r: 4 }]])

    const { container } = render(<Dot />)

    expect(container.querySelector('circle')).toBeInTheDocument()
  })

  it('renders a symbol node directly', () => {
    const { container } = render(<Symbol symbolNode={[['path', { d: 'M4 12h16' }]]} />)

    expect(container.querySelector('path')).toHaveAttribute('d', 'M4 12h16')
  })
})
