import { Dialog } from '@rayscale/frontier'

export default function RequiredChoice() {
  return (
    <Dialog>
      <Dialog.Trigger>Accept the terms</Dialog.Trigger>
      <Dialog.Content showCloseButton={false} closeOnBackdropClick={false}>
        <Dialog.Header>
          <Dialog.Title>Accept the terms</Dialog.Title>
          <Dialog.Description>
            You need to choose before you continue. Pressing outside does not close this dialog.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close variant="outline">Decline</Dialog.Close>
          <Dialog.Close>Accept</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
