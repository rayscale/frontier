import { Button, ColorPicker } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [color, setColor] = useState('#2563eb')

  return (
    <ColorPicker.Root value={color} onValueChange={setColor}>
      <div style={{ display: 'grid', gap: '1rem', width: '16rem' }}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{color}</span>
          <Button
            variant="outline"
            onClick={() => {
              setColor('#ef4444')
            }}
          >
            Reset to red
          </Button>
        </div>
      </div>
    </ColorPicker.Root>
  )
}
