import { Slider } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState(1)

  return (
    <Slider
      label="Playback speed"
      min={0.5}
      max={2}
      step={0.25}
      value={value}
      onValueChange={(next) => {
        if (typeof next === 'number') {
          setValue(next)
        }
      }}
      formatValue={(current) => `${String(current)}x`}
      showValue
    />
  )
}
