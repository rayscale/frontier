import { Button, Collapsible } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger>Shipping details</Collapsible.Trigger>
        <Collapsible.Content>Orders ship within two business days.</Collapsible.Content>
      </Collapsible>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(false)
        }}
      >
        Close from outside
      </Button>
    </div>
  )
}
