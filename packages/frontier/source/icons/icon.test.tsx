import { render } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { ArrowRight, Check, createIcon, Icon, iconMetadata, Info } from './index.js'
import { iconMotions } from './motion.js'

describe('Icon', () => {
  it('draws its shapes on the 24-unit grid and stays out of the accessibility tree', () => {
    const { container } = render(<Check data-testid="check" />)

    const icon = container.querySelector('svg')

    expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon?.querySelector('path')).toHaveAttribute('d', 'M20 6 9 17l-5-5')
  })

  it('sizes the icon from the size prop and defaults to 24', () => {
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
  describe('movement', () => {
    it('gives each built-in icon the movement that matches its meaning', () => {
      const { container } = render(
        <>
          <ArrowRight data-testid="arrow" />
          <Check data-testid="check" />
          <Info data-testid="info" />
        </>,
      )

      expect(container.querySelector('[data-testid="arrow"]')).toHaveAttribute(
        'data-motion',
        'nudge-right',
      )
      expect(container.querySelector('[data-testid="check"]')).toHaveAttribute(
        'data-motion',
        'draw',
      )
      expect(container.querySelector('[data-testid="info"]')).toHaveAttribute('data-motion', 'pop')
    })

    it.each(iconMetadata.map((icon) => icon.component))('animates %s', (component) => {
      expect(iconMotions.has(component)).toBe(true)
    })

    it('plays the movement only when animate is true', () => {
      const { container } = render(
        <>
          <Check animate data-testid="on" />
          <Check animate={false} data-testid="off" />
        </>,
      )

      expect(container.querySelector('[data-testid="on"]')).toHaveAttribute('data-animate')
      expect(container.querySelector('[data-testid="off"]')).not.toHaveAttribute('data-animate')
    })

    it('normalizes the path length of a drawn icon, so one rule draws any stroke', () => {
      const { container } = render(
        <>
          <Check data-testid="check" />
          <ArrowRight data-testid="arrow" />
        </>,
      )

      expect(container.querySelector('[data-testid="check"] path')).toHaveAttribute(
        'pathLength',
        '1',
      )
      expect(container.querySelector('[data-testid="arrow"] path')).not.toHaveAttribute(
        'pathLength',
      )
    })

    it('lets a custom icon choose its movement, and lets an instance override it', () => {
      const Spin = createIcon({
        name: 'Spin',
        iconNode: [['circle', { cx: 12, cy: 12, r: 8 }]],
        motion: 'sweep',
      })
      const { container } = render(
        <>
          <Spin data-testid="default" />
          <Spin data-testid="override" motion="turn" />
        </>,
      )

      expect(container.querySelector('[data-testid="default"]')).toHaveAttribute(
        'data-motion',
        'sweep',
      )
      expect(container.querySelector('[data-testid="override"]')).toHaveAttribute(
        'data-motion',
        'turn',
      )
    })
  })
})
