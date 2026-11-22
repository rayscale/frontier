import { Button, Dialog } from '@rayscale/frontier'
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
        Open dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Controlled dialog</Dialog.Title>
            <Dialog.Description>Your component owns the open state.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close>Done</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
      <p>{open ? 'The dialog is open.' : 'The dialog is closed.'}</p>
    </>
  )
}
