import { Button, NumberFlow } from '@rayscale/frontier'
import { useState } from 'react'

export default function Animated() {
  const [value, setValue] = useState(1234)

  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <NumberFlow value={value} />
      <Button
        variant="outline"
        onClick={() => {
          setValue((current) => current + Math.round(Math.random() * 900))
        }}
      >
        Add
      </Button>
    </div>
  )
}
