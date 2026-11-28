import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Rating } from './index.js'

describe('Rating', () => {
  it('is a radio group with one radio for each shape', () => {
    render(<Rating label="Rate this recipe" />)

    expect(screen.getByRole('radiogroup', { name: 'Rate this recipe' })).toBeTruthy()
    expect(screen.getAllByRole('radio')).toHaveLength(5)
    expect(screen.getByRole('radio', { name: '3 of 5' })).toBeTruthy()
  })

  it('uses max for the number of shapes', () => {
    render(<Rating max={3} />)

    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(screen.getByRole('radio', { name: '3 of 3' })).toBeTruthy()
  })

  it('starts at the default value', () => {
    render(<Rating defaultValue={4} />)

    expect(screen.getByRole<HTMLInputElement>('radio', { name: '4 of 5' }).checked).toBe(true)
  })

  it('changes the rating on click and reports it', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Rating onValueChange={onValueChange} />)

    await user.click(screen.getByRole('radio', { name: '2 of 5' }))

    expect(onValueChange).toHaveBeenCalledWith(2)
    expect(screen.getByRole<HTMLInputElement>('radio', { name: '2 of 5' }).checked).toBe(true)
  })

  it('changes the rating with the arrow keys', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Rating defaultValue={2} onValueChange={onValueChange} />)

    screen.getByRole('radio', { name: '2 of 5' }).focus()
    await user.keyboard('{ArrowRight}')

    expect(onValueChange).toHaveBeenCalledWith(3)
  })

  it('follows a controlled value', async () => {
    const user = userEvent.setup()

    function Controlled() {
      const [value, setValue] = useState(1)

      return (
        <>
          <Rating value={value} onValueChange={setValue} />
          <button
            type="button"
            onClick={() => {
              setValue(5)
            }}
          >
            Five
          </button>
        </>
      )
    }

    render(<Controlled />)
    await user.click(screen.getByRole('button', { name: 'Five' }))

    expect(screen.getByRole<HTMLInputElement>('radio', { name: '5 of 5' }).checked).toBe(true)
  })

  it('takes the rating back when allowClear is on', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Rating allowClear defaultValue={3} onValueChange={onValueChange} />)

    await user.click(screen.getByRole('radio', { name: '3 of 5' }))

    expect(onValueChange).toHaveBeenCalledWith(0)
    expect(screen.queryByRole('radio', { checked: true })).toBeNull()
  })

  it('keeps the rating when allowClear is off', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Rating defaultValue={3} onValueChange={onValueChange} />)

    await user.click(screen.getByRole('radio', { name: '3 of 5' }))

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('lets people give half a shape', () => {
    const onValueChange = vi.fn()
    render(<Rating precision={0.5} onValueChange={onValueChange} />)

    expect(screen.getAllByRole('radio')).toHaveLength(10)

    fireEvent.click(screen.getByRole('radio', { name: '2.5 of 5' }))

    expect(onValueChange).toHaveBeenCalledWith(2.5)
  })

  it('fills the shapes up to the rating, and half of one', () => {
    const { container } = render(<Rating defaultValue={2.5} precision={0.5} />)

    const fills = Array.from(container.querySelectorAll<HTMLElement>('.frontier-rating__item')).map(
      (item) => item.style.getPropertyValue('--_fill'),
    )

    expect(fills).toEqual(['100%', '100%', '50%', '0%', '0%'])
  })

  it('previews the rating that the pointer is on', () => {
    const { container } = render(<Rating defaultValue={1} />)
    const item = container.querySelectorAll<HTMLElement>('.frontier-rating__choice')[3]
    if (!item) {
      throw new Error('The fourth choice is missing.')
    }

    fireEvent.mouseEnter(item)
    expect(
      container
        .querySelectorAll<HTMLElement>('.frontier-rating__item')[3]
        ?.style.getPropertyValue('--_fill'),
    ).toBe('100%')

    fireEvent.mouseLeave(screen.getByRole('radiogroup'))
    expect(
      container
        .querySelectorAll<HTMLElement>('.frontier-rating__item')[3]
        ?.style.getPropertyValue('--_fill'),
    ).toBe('0%')
  })

  it('shows the rating as an image when it is read only', () => {
    render(<Rating readOnly defaultValue={3.5} label="Average" precision={0.5} />)

    expect(screen.getByRole('img', { name: 'Average: 3.5 of 5' })).toBeTruthy()
    expect(screen.queryByRole('radio')).toBeNull()
  })

  it('disables every choice', () => {
    render(<Rating disabled />)

    for (const radio of screen.getAllByRole<HTMLInputElement>('radio')) {
      expect(radio.disabled).toBe(true)
    }
  })

  it('names the choices with getLabel', () => {
    render(<Rating getLabel={(value, max) => `${String(value)} estrellas de ${String(max)}`} />)

    expect(screen.getByRole('radio', { name: '4 estrellas de 5' })).toBeTruthy()
  })

  it('sends its value with a form', () => {
    const { container } = render(
      <form>
        <Rating defaultValue={4} name="score" />
      </form>,
    )

    const form = container.querySelector('form')
    expect(new FormData(form ?? undefined).get('score')).toBe('4')
  })

  it('draws a custom icon', () => {
    render(<Rating icon={<span data-testid="heart" />} max={2} />)

    expect(screen.getAllByTestId('heart')).toHaveLength(4)
  })

  it('applies the size, forwards the ref, and merges the class name', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Rating ref={ref} className="extra" size="lg" />)

    expect(ref.current?.classList.contains('frontier-rating--lg')).toBe(true)
    expect(ref.current?.classList.contains('extra')).toBe(true)
  })
})
