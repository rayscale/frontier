import { render } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Check, createIcon, Icon } from '../index.js'

describe('Icon', () => {
  it('draws its shapes on the 24-unit grid and stays out of the accessibility tree', () => {
    const { container } = render(<Check data-testid="check" />)

    const icon = container.querySelector('svg')

    expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon?.querySelector('path')).toHaveAttribute('d', 'M20 6 9 17l-5-5')
  })

  it('sizes the icon from the icon scale and defaults to inline', () => {
    const { container } = render(
      <>
        <Check data-testid="inline" />
        <Check data-testid="control" size="control" />
        <Check data-testid="standalone" size="standalone" />
      </>,
    )

    expect(container.querySelector('[data-testid="inline"]')).toHaveClass('frontier-icon--inline')
    expect(container.querySelector('[data-testid="control"]')).toHaveClass('frontier-icon--control')
    expect(container.querySelector('[data-testid="standalone"]')).toHaveClass(
      'frontier-icon--standalone',
    )
  })

  it('forwards its class name, native props, and ref', () => {
    const ref = createRef<SVGSVGElement>()

    render(<Check ref={ref} className="custom-icon" data-testid="check" />)

    const icon = document.querySelector('[data-testid="check"]')

    expect(icon).toHaveClass('frontier-icon', 'custom-icon')
    expect(ref.current).toBe(icon)
  })

  it('creates a named icon that exposes its shapes', () => {
    const Dot = createIcon({
      name: 'Dot',
      iconNode: [['circle', { cx: 12, cy: 12, r: 4 }]],
    })

    expect(Dot.displayName).toBe('Dot')
    expect(Dot.iconNode).toEqual([['circle', { cx: 12, cy: 12, r: 4 }]])

    const { container } = render(<Dot />)

    expect(container.querySelector('circle')).toBeInTheDocument()
  })

  it('renders an icon node directly', () => {
    const { container } = render(<Icon iconNode={[['path', { d: 'M4 12h16' }]]} />)

    expect(container.querySelector('path')).toHaveAttribute('d', 'M4 12h16')
  })
})
