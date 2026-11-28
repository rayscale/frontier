import type { ReactElement } from 'react'

import { ColorPickerArea } from './parts/area.js'
import { ColorPickerEyeDropper } from './parts/eye-dropper.js'
import { ColorPickerInput } from './parts/input.js'
import { ColorPickerPreview } from './parts/preview.js'
import { ColorPickerRoot } from './parts/root.js'
import { ColorPickerSlider } from './parts/slider.js'
import { ColorPickerSwatches } from './parts/swatches.js'
import { ColorPickerWheel } from './parts/wheel.js'
import type { TColorPickerRootProps } from './types.js'

import './color-picker.css'

export type {
  TColorAreaProps,
  TColorChannel,
  TColorDetails,
  TColorEyeDropperProps,
  TColorFormat,
  TColorHsba,
  TColorInputProps,
  TColorPickerPreviewProps,
  TColorPickerRootProps,
  TColorSliderProps,
  TColorSwatchesProps,
  TColorValueProps,
  TColorWheelProps,
} from './types.js'

export interface TColorPickerComponent {
  (props: TColorPickerRootProps): ReactElement
  /** Holds the color and shares it with the parts. It renders no element. */
  Root: typeof ColorPickerRoot
  /** A square where people pick how vivid and how bright the color is. */
  Area: typeof ColorPickerArea
  /** A slider for one channel of the color, such as the hue or the alpha. */
  Slider: typeof ColorPickerSlider
  /** A ring where people pick the hue. */
  Wheel: typeof ColorPickerWheel
  /** A field with the color as text, or with one channel as a number. */
  Input: typeof ColorPickerInput
  /** A group of ready-made colors to choose from. */
  Swatches: typeof ColorPickerSwatches
  /** A button that picks a color from anywhere on the screen. It hides where that is not possible. */
  EyeDropper: typeof ColorPickerEyeDropper
  /** Shows the current color. */
  Preview: typeof ColorPickerPreview
}

/**
 * Lets people pick a color. Compose it with `ColorPicker.Root` and the parts you need:
 * `Area`, `Slider`, `Wheel`, `Input`, `Swatches`, `EyeDropper`, and `Preview`. Every part also works
 * on its own, with its own `value` and `onValueChange`. Colors are read and written with culori.
 */
export const ColorPicker: TColorPickerComponent = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  Area: ColorPickerArea,
  Slider: ColorPickerSlider,
  Wheel: ColorPickerWheel,
  Input: ColorPickerInput,
  Swatches: ColorPickerSwatches,
  EyeDropper: ColorPickerEyeDropper,
  Preview: ColorPickerPreview,
})
