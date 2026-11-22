import { Button, Dialog } from '@rayscale/frontier'

export default function Default() {
  return (
    <Dialog>
      <Dialog.Trigger>Delete project</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Delete this project?</Dialog.Title>
          <Dialog.Description>
            The project and its files will be removed. This cannot be undone.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close variant="outline">Cancel</Dialog.Close>
          <Button variant="danger">Delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
