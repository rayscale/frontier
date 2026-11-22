import { Accordion } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string | null>('shipping')

  return (
    <div style={{ display: 'grid', gap: 12, width: 360 }}>
      <Accordion type="single" value={value} onValueChange={setValue}>
        <Accordion.Item value="shipping" title="Shipping">
          Orders ship within two business days.
        </Accordion.Item>
        <Accordion.Item value="returns" title="Returns">
          You can return an item within thirty days.
        </Accordion.Item>
      </Accordion>
      <p>Open item: {value ?? 'none'}</p>
    </div>
  )
}
