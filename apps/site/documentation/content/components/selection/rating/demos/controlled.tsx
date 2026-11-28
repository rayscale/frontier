import { Rating } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState(3)

  return (
    <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'start' }}>
      <Rating label="Rate this recipe" value={value} onValueChange={setValue} />
      <span>You gave it {value} of 5.</span>
    </div>
  )
}
