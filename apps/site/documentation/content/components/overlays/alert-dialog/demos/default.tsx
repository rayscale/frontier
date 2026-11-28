import { AlertDialog, Button } from '@rayscale/frontier'

export default function Default() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant="outline">Sign out</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Sign out?</AlertDialog.Title>
          <AlertDialog.Description>
            You will need to sign in again to see your projects.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Sign out</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
