import { Disclosure } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Disclosure title="Shipping details" open={open} onOpenChange={setOpen}>
        Orders ship within two business days.
      </Disclosure>
      <p>The section is {open ? 'open' : 'closed'}.</p>
    </div>
  )
}
