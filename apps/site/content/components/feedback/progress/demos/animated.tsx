import { Button, Progress } from '@rayscale/frontier'
import { useState } from 'react'

export default function Animated() {
  const [value, setValue] = useState(20)

  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-4)', width: '100%' }}>
      <Progress value={value} aria-label="Import progress" />
      <div>
        <Button
          variant="outline"
          onClick={() => {
            setValue((current) => (current >= 100 ? 0 : current + 20))
          }}
        >
          {value >= 100 ? 'Start over' : 'Advance'}
        </Button>
      </div>
    </div>
  )
}
