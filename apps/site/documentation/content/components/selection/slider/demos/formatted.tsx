import { Slider } from '@rayscale/frontier'

export default function Formatted() {
  return (
    <Slider
      label="Opacity"
      min={0}
      max={1}
      step={0.05}
      defaultValue={0.5}
      format={{ style: 'percent' }}
      showValue
    />
  )
}
