import { Button, HoverCard, Link } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCard.Trigger>
          <Link href="#ana">@ana</Link>
        </HoverCard.Trigger>
        <HoverCard.Content>Ana designs the system.</HoverCard.Content>
      </HoverCard>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? 'Close the card' : 'Open the card'}
      </Button>
    </div>
  )
}
