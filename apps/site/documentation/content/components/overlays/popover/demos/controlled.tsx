import { Popover } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger>Details</Popover.Trigger>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Details</Popover.Title>
            <Popover.Description>Your component owns the open state.</Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover>
      <p>{open ? 'Open' : 'Closed'}</p>
    </>
  )
}
