import type { HTMLAttributes, ReactNode } from 'react'

import type { TButtonProps } from '../button/button.js'
import type { TColorSwatchProps } from '../color-swatch/types.js'
import type { TInputProps } from '../input/input.js'

/** How a color is written in the value: `#2563eb`, `rgb(...)`, `hsl(...)`, or `oklch(...)`. */
export type TColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch'

/** A part of a color that a slider or a field can change. */
export type TColorChannel = 'hue' | 'saturation' | 'brightness' | 'alpha' | 'red' | 'green' | 'blue'

/**
 * A color as hue, saturation, brightness, and alpha. The hue is 0 to 360, saturation and
 * brightness are 0 to 100, and alpha is 0 to 1.
 */
export interface TColorHsba {
  readonly alpha: number
  readonly brightness: number
  readonly hue: number
  readonly saturation: number
}

/** What `onValueChange` receives next to the value text. */
export interface TColorDetails {
  /** The color as hue, saturation, brightness, and alpha. */
  color: TColorHsba
  /** The color as a hex string, whatever the format of the value is. */
  hex: string
}

/** The props that every part takes to work on its own, without a `ColorPicker.Root` around it. */
export interface TColorValueProps {
  /** Format of the value. Defaults to `hex`. */
  format?: TColorFormat | undefined
  /** Whether the color can be see-through. Defaults to `false`. */
  alpha?: boolean | undefined
  /** Controlled color, as any CSS color. Omit to let the part keep its own. */
  value?: string | undefined
  /** Color at the start, in uncontrolled mode. Defaults to `#000000`. */
  defaultValue?: string | undefined
  /** Called with the new color and its details every time it changes. */
  onValueChange?: ((value: string, details: TColorDetails) => void) | undefined
}

/** Props for `ColorPicker.Root`. */
export type TColorPickerRootProps = TColorValueProps & {
  /** Stops people from changing the color. */
  disabled?: boolean | undefined
  /** Parts, such as `ColorPicker.Area` and `ColorPicker.Slider`. */
  children?: ReactNode | undefined
}

/** Props for `ColorPicker.Area`. */
export type TColorAreaProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
  TColorValueProps & {
    /** Stops people from changing the color. */
    disabled?: boolean | undefined
    /** Name for the saturation control. Defaults to `Saturation`. */
    saturationLabel?: string | undefined
    /** Name for the brightness control. Defaults to `Brightness`. */
    brightnessLabel?: string | undefined
  }

/** Props for `ColorPicker.Slider`. */
export type TColorSliderProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
  TColorValueProps & {
    /** The part of the color the slider changes. */
    channel: TColorChannel
    /** Stops people from changing the color. */
    disabled?: boolean | undefined
    /** Name of the slider. Defaults to the channel, such as `Hue`. */
    label?: string | undefined
    /** Direction of the track. Defaults to `horizontal`. */
    orientation?: 'horizontal' | 'vertical' | undefined
  }

/** Props for `ColorPicker.Wheel`. */
export type TColorWheelProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
  TColorValueProps & {
    /** Stops people from changing the color. */
    disabled?: boolean | undefined
    /** Name of the wheel. Defaults to `Hue`. */
    label?: string | undefined
    /** Width of the ring in pixels. Defaults to `20`. */
    thickness?: number | undefined
  }

/** Props for `ColorPicker.Input`. It takes the props of an input, except those that hold the value. */
export type TColorInputProps = Omit<
  TInputProps,
  'defaultValue' | 'max' | 'min' | 'onChange' | 'step' | 'type' | 'value'
> &
  TColorValueProps & {
    /** Edit one channel as a number instead of the whole color as text. */
    channel?: TColorChannel | undefined
  }

/** Props for `ColorPicker.Swatches`. */
export type TColorSwatchesProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange' | 'children'
> &
  TColorValueProps & {
    /** The colors people can choose, as any CSS color. */
    colors: readonly string[]
    /** Stops people from changing the color. */
    disabled?: boolean | undefined
    /** Name of the group. Defaults to `Colors`. */
    label?: string | undefined
  }

/** Props for `ColorPicker.EyeDropper`. It is a button, so it takes the props of a button. */
export type TColorEyeDropperProps = TButtonProps

/** Props for `ColorPicker.Preview`. It takes the props of a color swatch, except the color. */
export type TColorPickerPreviewProps = Omit<TColorSwatchProps, 'color'>
