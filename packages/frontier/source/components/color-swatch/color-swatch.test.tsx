import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { ColorSwatch } from './index.js'

describe('ColorSwatch', () => {
  it('shows the color and reads it out as an image', () => {
    render(<ColorSwatch color="#2563eb" />)

    const swatch = screen.getByRole('img', { name: '#2563eb' })
    expect(swatch.style.getPropertyValue('--_color')).toBe('#2563eb')
  })

  it('uses the label as the name', () => {
    render(<ColorSwatch color="#2563eb" label="Brand blue" />)

    expect(screen.getByRole('img', { name: 'Brand blue' })).toBeTruthy()
  })

  it('applies the size', () => {
    render(<ColorSwatch color="red" size="lg" />)

    expect(screen.getByRole('img').classList.contains('frontier-color-swatch--lg')).toBe(true)
  })

  it('forwards the ref, the class name, and the style', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<ColorSwatch ref={ref} className="extra" color="red" style={{ margin: 4 }} />)

    expect(ref.current?.classList.contains('extra')).toBe(true)
    expect(ref.current?.style.margin).toBe('4px')
    expect(ref.current?.style.getPropertyValue('--_color')).toBe('red')
  })
})
