import { AlertDialog, Button } from '@rayscale/frontier'

export default function Destructive() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant="danger">Delete account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete your account?</AlertDialog.Title>
          <AlertDialog.Description>
            Your projects and your history are deleted for good. This cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Keep my account</AlertDialog.Cancel>
          <AlertDialog.Action variant="danger">Delete account</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
