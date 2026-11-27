import { Button, Sheet } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open sheet
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Controlled sheet</Sheet.Title>
            <Sheet.Description>Your component owns the open state.</Sheet.Description>
          </Sheet.Header>
          <Sheet.Footer>
            <Sheet.Close>Done</Sheet.Close>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
      <p>{open ? 'The sheet is open.' : 'The sheet is closed.'}</p>
    </>
  )
}
