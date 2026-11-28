import { AlertDialog, Button } from '@rayscale/frontier'
import { useState } from 'react'

export default function SlowAction() {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!deleting) {
          setOpen(next)
        }
      }}
    >
      <AlertDialog.Trigger>
        <Button variant="danger">Delete project</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete this project?</AlertDialog.Title>
          <AlertDialog.Description>
            The files and the history are deleted from the server.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel disabled={deleting}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            variant="danger"
            disabled={deleting}
            onClick={(event) => {
              event.preventDefault()
              setDeleting(true)
              // Stands for a request to a server.
              setTimeout(() => {
                setDeleting(false)
                setOpen(false)
              }, 1200)
            }}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
