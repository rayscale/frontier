import { Slider as BaseSlider } from '@base-ui/react/slider'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useColorControl } from '../context.js'
import {
  getChannelGradient,
  getChannelLabel,
  getChannelRange,
  getChannelValue,
  setChannelValue,
} from '../helpers/color.js'
import type { TColorChannel, TColorSliderProps } from '../types.js'

function getValueText(channel: TColorChannel, value: number): string {
  const rounded = String(Math.round(value))

  if (channel === 'alpha' || channel === 'saturation' || channel === 'brightness') {
    return `${rounded}%`
  }

  return rounded
}

/**
 * A slider for one channel of the color. Base UI handles the dragging and the keyboard, as it does
 * for `Slider`; this part adds the track that shows the channel from its lowest to its highest value.
 */
export const ColorPickerSlider = forwardRef<HTMLDivElement, TColorSliderProps>(
  function ColorPickerSlider(
    {
      alpha,
      channel,
      className,
      defaultValue,
      disabled,
      format,
      label,
      onValueChange,
      orientation = 'horizontal',
      style,
      value,
      ...props
    },
    ref,
  ) {
    const {
      color,
      disabled: disabledState,
      setColor,
    } = useColorControl({
      alpha: alpha ?? channel === 'alpha',
      defaultValue,
      disabled,
      format,
      onValueChange,
      value,
    })
    const { max, min, step } = getChannelRange(channel)
    const customProperties: TCssCustomProperties = {
      '--_gradient': getChannelGradient(
        color,
        channel,
        orientation === 'vertical' ? 'top' : 'right',
      ),
    }

    return (
      <BaseSlider.Root<number>
        {...props}
        ref={ref}
        className={classNames(
          'frontier-color-slider',
          `frontier-color-slider--${orientation}`,
          className,
        )}
        data-channel={channel}
        disabled={disabledState}
        max={max}
        min={min}
        orientation={orientation}
        step={step}
        style={{ ...customProperties, ...style }}
        value={Math.round(getChannelValue(color, channel))}
        onValueChange={(next) => {
          setColor(setChannelValue(color, channel, next))
        }}
      >
        <BaseSlider.Control className="frontier-color-slider__control">
          <BaseSlider.Track className="frontier-color-slider__track">
            <BaseSlider.Thumb
              aria-label={label ?? getChannelLabel(channel)}
              className="frontier-color-slider__thumb"
              getAriaValueText={(_formatted, thumbValue) => getValueText(channel, thumbValue)}
            />
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
    )
  },
)
