import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ColorPicker, type TColorDetails } from './index.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ColorPicker', () => {
  it('writes the color in the chosen format', () => {
    render(
      <ColorPicker.Root defaultValue="#2563eb" format="rgb">
        <ColorPicker.Input label="Color" />
      </ColorPicker.Root>,
    )

    expect(screen.getByLabelText<HTMLInputElement>('Color').value).toBe('rgb(37, 99, 235)')
  })

  it('writes oklch and hsl', () => {
    render(
      <>
        <ColorPicker.Input aria-label="oklch" defaultValue="#2563eb" format="oklch" />
        <ColorPicker.Input aria-label="hsl" defaultValue="#2563eb" format="hsl" />
      </>,
    )

    expect(screen.getByLabelText<HTMLInputElement>('oklch').value).toMatch(/^oklch\(/)
    expect(screen.getByLabelText<HTMLInputElement>('hsl').value).toMatch(/^hsl\(/)
  })

  it('adds the alpha to the value only when alpha is on', () => {
    render(
      <>
        <ColorPicker.Input aria-label="opaque" defaultValue="#2563eb80" />
        <ColorPicker.Input alpha aria-label="clear" defaultValue="#2563eb80" />
      </>,
    )

    expect(screen.getByLabelText<HTMLInputElement>('opaque').value).toBe('#2563eb')
    expect(screen.getByLabelText<HTMLInputElement>('clear').value).toBe('#2563eb80')
  })

  it('shares the color between the parts', () => {
    render(
      <ColorPicker.Root defaultValue="#ff0000">
        <ColorPicker.Slider channel="hue" />
        <ColorPicker.Input label="Color" />
      </ColorPicker.Root>,
    )

    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), { target: { value: '120' } })

    expect(screen.getByLabelText<HTMLInputElement>('Color').value).toBe('#00ff00')
  })

  it('reports the new color and its details', () => {
    const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
    render(
      <ColorPicker.Root defaultValue="#ff0000" onValueChange={onValueChange}>
        <ColorPicker.Slider channel="hue" />
      </ColorPicker.Root>,
    )

    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), { target: { value: '240' } })

    expect(onValueChange).toHaveBeenCalledWith('#0000ff', {
      color: { hue: 240, saturation: 100, brightness: 100, alpha: 1 },
      hex: '#0000ff',
    })
  })

  it('follows a controlled value', async () => {
    const user = userEvent.setup()

    function Controlled() {
      const [value, setValue] = useState('#ff0000')

      return (
        <ColorPicker.Root value={value} onValueChange={setValue}>
          <ColorPicker.Input label="Color" />
          <button
            type="button"
            onClick={() => {
              setValue('#0000ff')
            }}
          >
            Blue
          </button>
        </ColorPicker.Root>
      )
    }

    render(<Controlled />)
    await user.click(screen.getByRole('button', { name: 'Blue' }))

    expect(screen.getByLabelText<HTMLInputElement>('Color').value).toBe('#0000ff')
  })

  it('keeps the hue when the saturation drops to zero', () => {
    render(
      <ColorPicker.Root defaultValue="#00ff00">
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
      </ColorPicker.Root>,
    )

    fireEvent.change(screen.getByRole('slider', { name: 'Saturation' }), {
      target: { value: '0' },
    })

    expect(screen.getByRole<HTMLInputElement>('slider', { name: 'Hue' }).value).toBe('120')
  })

  it('works without a root', () => {
    const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
    render(
      <ColorPicker.Slider channel="hue" defaultValue="#ff0000" onValueChange={onValueChange} />,
    )

    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), { target: { value: '60' } })

    expect(onValueChange).toHaveBeenCalledWith('#ffff00', expect.anything())
  })

  describe('Area', () => {
    it('has a control for the saturation and one for the brightness', () => {
      render(<ColorPicker.Area defaultValue="#ff0000" />)

      expect(screen.getByRole<HTMLInputElement>('slider', { name: 'Saturation' }).value).toBe('100')
      expect(screen.getByRole<HTMLInputElement>('slider', { name: 'Brightness' }).value).toBe('100')
    })

    it('changes one axis at a time through its control', () => {
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(<ColorPicker.Area defaultValue="#ff0000" onValueChange={onValueChange} />)

      fireEvent.change(screen.getByRole('slider', { name: 'Brightness' }), {
        target: { value: '50' },
      })

      expect(onValueChange).toHaveBeenCalledWith(
        '#800000',
        expect.objectContaining({ hex: '#800000' }),
      )
      expect(
        screen.getByRole('slider', { name: 'Brightness' }).getAttribute('aria-valuetext'),
      ).toBe('50%')
    })

    it('picks the point where the pointer goes down', () => {
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(<ColorPicker.Area defaultValue="#ff0000" onValueChange={onValueChange} />)
      const area = screen.getByRole('group', { name: 'Color' })
      area.getBoundingClientRect = () => new DOMRect(0, 0, 200, 100)
      area.setPointerCapture = vi.fn()

      fireEvent.pointerDown(area, { button: 0, clientX: 100, clientY: 50, pointerId: 1 })

      expect(onValueChange).toHaveBeenCalledWith('#804040', expect.anything())
      expect(onValueChange.mock.lastCall?.[1].color).toMatchObject({
        saturation: 50,
        brightness: 50,
      })
    })

    it('ignores the pointer when disabled', () => {
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(<ColorPicker.Area disabled defaultValue="#ff0000" onValueChange={onValueChange} />)
      const area = screen.getByRole('group', { name: 'Color' })
      area.getBoundingClientRect = () => new DOMRect(0, 0, 200, 100)

      fireEvent.pointerDown(area, { button: 0, clientX: 100, clientY: 50, pointerId: 1 })

      expect(onValueChange).not.toHaveBeenCalled()
      expect(screen.getByRole<HTMLInputElement>('slider', { name: 'Saturation' }).disabled).toBe(
        true,
      )
    })
  })

  describe('Slider', () => {
    it('names the slider after its channel, or with a label', () => {
      render(
        <>
          <ColorPicker.Slider channel="red" />
          <ColorPicker.Slider channel="blue" label="Azul" />
        </>,
      )

      expect(screen.getByRole('slider', { name: 'Red' })).toBeTruthy()
      expect(screen.getByRole('slider', { name: 'Azul' })).toBeTruthy()
    })

    it('runs the alpha from 0 to 100', () => {
      render(<ColorPicker.Slider alpha channel="alpha" defaultValue="#2563eb80" />)

      const slider = screen.getByRole<HTMLInputElement>('slider', { name: 'Alpha' })
      expect(slider.min).toBe('0')
      expect(slider.max).toBe('100')
      expect(slider.value).toBe('50')
      expect(slider.getAttribute('aria-valuetext')).toBe('50%')
    })

    it('changes the red, green, and blue channels', () => {
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(
        <ColorPicker.Root defaultValue="#000000" onValueChange={onValueChange}>
          <ColorPicker.Slider channel="green" />
        </ColorPicker.Root>,
      )

      fireEvent.change(screen.getByRole('slider', { name: 'Green' }), { target: { value: '255' } })

      expect(onValueChange).toHaveBeenCalledWith('#00ff00', expect.anything())
    })

    it('goes up when it is vertical', () => {
      render(<ColorPicker.Slider channel="hue" orientation="vertical" />)

      expect(screen.getByRole('slider', { name: 'Hue' }).getAttribute('aria-orientation')).toBe(
        'vertical',
      )
    })

    it('moves with the arrow keys and jumps with End', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(
        <ColorPicker.Slider channel="hue" defaultValue="#ff0000" onValueChange={onValueChange} />,
      )

      screen.getByRole('slider', { name: 'Hue' }).focus()
      await user.keyboard('{ArrowRight}')
      expect(onValueChange.mock.lastCall?.[1].color.hue).toBe(1)

      await user.keyboard('{End}')
      expect(onValueChange.mock.lastCall?.[1].color.hue).toBe(360)
    })

    it('stops people from changing it when disabled', () => {
      render(<ColorPicker.Slider disabled channel="hue" />)

      expect(screen.getByRole<HTMLInputElement>('slider', { name: 'Hue' }).disabled).toBe(true)
    })
  })

  describe('Wheel', () => {
    it('has a control for the hue', () => {
      render(<ColorPicker.Wheel defaultValue="#00ff00" />)

      expect(screen.getByRole<HTMLInputElement>('slider', { name: 'Hue' }).value).toBe('120')
    })

    it('picks the hue at the point where the pointer goes down on the ring', () => {
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      const { container } = render(
        <ColorPicker.Wheel defaultValue="#ff0000" onValueChange={onValueChange} />,
      )
      const wheel = container.querySelector<HTMLElement>('.frontier-color-wheel')
      if (!wheel) {
        throw new Error('The wheel is missing.')
      }

      wheel.getBoundingClientRect = () => new DOMRect(0, 0, 200, 200)
      wheel.setPointerCapture = vi.fn()

      // At the right edge of the ring, which is a quarter turn from the top.
      fireEvent.pointerDown(wheel, { button: 0, clientX: 195, clientY: 100, pointerId: 1 })

      expect(onValueChange).toHaveBeenCalledWith('#80ff00', expect.anything())
      expect(onValueChange.mock.lastCall?.[1].color.hue).toBe(90)
    })

    it('turns the short way when the hue goes past the top', () => {
      const { container } = render(<ColorPicker.Wheel defaultValue="hsl(350 100% 50%)" />)
      const wheel = container.querySelector<HTMLElement>('.frontier-color-wheel')
      const input = screen.getByRole('slider', { name: 'Hue' })

      expect(wheel?.style.getPropertyValue('--_hue')).toBe('350deg')

      fireEvent.change(input, { target: { value: '10' } })

      expect(wheel?.style.getPropertyValue('--_hue')).toBe('370deg')
    })

    it('ignores the pointer in the hole', () => {
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      const { container } = render(
        <ColorPicker.Wheel defaultValue="#ff0000" onValueChange={onValueChange} />,
      )
      const wheel = container.querySelector<HTMLElement>('.frontier-color-wheel')
      if (!wheel) {
        throw new Error('The wheel is missing.')
      }

      wheel.getBoundingClientRect = () => new DOMRect(0, 0, 200, 200)

      fireEvent.pointerDown(wheel, { button: 0, clientX: 100, clientY: 100, pointerId: 1 })

      expect(onValueChange).not.toHaveBeenCalled()
    })
  })

  describe('Input', () => {
    it('commits the text when it is a color', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(<ColorPicker.Input label="Color" onValueChange={onValueChange} />)

      const input = screen.getByLabelText('Color')
      await user.clear(input)
      await user.type(input, 'rebeccapurple{Enter}')

      expect(onValueChange).toHaveBeenCalledWith('#663399', expect.anything())
      expect((input as HTMLInputElement).value).toBe('#663399')
    })

    it('goes back to the color when the text is not one', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(
        <ColorPicker.Input defaultValue="#2563eb" label="Color" onValueChange={onValueChange} />,
      )

      const input = screen.getByLabelText<HTMLInputElement>('Color')
      await user.clear(input)
      await user.type(input, 'nope')
      expect(input.getAttribute('aria-invalid')).toBe('true')
      await user.tab()

      expect(onValueChange).not.toHaveBeenCalled()
      expect(input.value).toBe('#2563eb')
    })

    it('drops the text on Escape', async () => {
      const user = userEvent.setup()
      render(<ColorPicker.Input defaultValue="#2563eb" label="Color" />)

      const input = screen.getByLabelText<HTMLInputElement>('Color')
      await user.type(input, 'abc{Escape}')

      expect(input.value).toBe('#2563eb')
    })

    it('edits one channel as a number', () => {
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(
        <ColorPicker.Root defaultValue="#000000" onValueChange={onValueChange}>
          <ColorPicker.Input channel="red" />
        </ColorPicker.Root>,
      )

      const input = screen.getByRole<HTMLInputElement>('spinbutton', { name: 'Red' })
      expect(input.max).toBe('255')
      fireEvent.change(input, { target: { value: '255' } })

      expect(onValueChange).toHaveBeenCalledWith('#ff0000', expect.anything())
    })

    it('is disabled with the root', () => {
      render(
        <ColorPicker.Root disabled>
          <ColorPicker.Input label="Color" />
        </ColorPicker.Root>,
      )

      expect(screen.getByLabelText<HTMLInputElement>('Color').disabled).toBe(true)
    })
  })

  describe('Swatches', () => {
    const colors = ['#ef4444', '#22c55e', '#2563eb']

    it('shows a radio for each color and checks the current one', () => {
      render(<ColorPicker.Swatches colors={colors} defaultValue="#22c55e" />)

      expect(screen.getByRole('radiogroup', { name: 'Colors' })).toBeTruthy()
      expect(screen.getAllByRole('radio')).toHaveLength(3)
      expect(screen.getByRole<HTMLInputElement>('radio', { name: '#22c55e' }).checked).toBe(true)
    })

    it('matches a color written another way', () => {
      render(<ColorPicker.Swatches colors={colors} defaultValue="rgb(239 68 68)" />)

      expect(screen.getByRole<HTMLInputElement>('radio', { name: '#ef4444' }).checked).toBe(true)
    })

    it('chooses a color', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(<ColorPicker.Swatches colors={colors} onValueChange={onValueChange} />)

      await user.click(screen.getByRole('radio', { name: '#2563eb' }))

      expect(onValueChange).toHaveBeenCalledWith('#2563eb', expect.anything())
    })

    it('moves with the arrow keys and jumps with Home and End', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(
        <ColorPicker.Swatches
          colors={colors}
          defaultValue="#ef4444"
          onValueChange={onValueChange}
        />,
      )

      screen.getByRole('radio', { name: '#ef4444' }).focus()
      await user.keyboard('{ArrowRight}')
      expect(onValueChange).toHaveBeenLastCalledWith('#22c55e', expect.anything())

      await user.keyboard('{End}')
      expect(onValueChange).toHaveBeenLastCalledWith('#2563eb', expect.anything())
    })
  })

  describe('EyeDropper', () => {
    it('is hidden where the browser has none', () => {
      render(<ColorPicker.EyeDropper />)

      expect(screen.queryByRole('button')).toBeNull()
    })

    it('picks the color the browser returns', async () => {
      const user = userEvent.setup()
      vi.stubGlobal(
        'EyeDropper',
        class {
          public open(): Promise<{ sRGBHex: string }> {
            return Promise.resolve({ sRGBHex: '#123456' })
          }
        },
      )
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(
        <ColorPicker.Root onValueChange={onValueChange}>
          <ColorPicker.EyeDropper />
        </ColorPicker.Root>,
      )

      await user.click(screen.getByRole('button', { name: 'Pick a color from the screen' }))

      await vi.waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith('#123456', expect.anything())
      })
    })

    it('does nothing when the picking is cancelled', async () => {
      const user = userEvent.setup()
      vi.stubGlobal(
        'EyeDropper',
        class {
          public open(): Promise<{ sRGBHex: string }> {
            return Promise.reject(new Error('cancelled'))
          }
        },
      )
      const onValueChange = vi.fn<(value: string, details: TColorDetails) => void>()
      render(
        <ColorPicker.Root onValueChange={onValueChange}>
          <ColorPicker.EyeDropper />
        </ColorPicker.Root>,
      )

      await user.click(screen.getByRole('button', { name: 'Pick a color from the screen' }))

      expect(onValueChange).not.toHaveBeenCalled()
    })
  })

  describe('Preview', () => {
    it('shows the current color', () => {
      render(
        <ColorPicker.Root defaultValue="#2563eb">
          <ColorPicker.Preview />
        </ColorPicker.Root>,
      )

      const preview = screen.getByRole('img', { name: '#2563eb' })
      expect(preview.style.getPropertyValue('--_color')).toBe('#2563ebff')
    })
  })
})
