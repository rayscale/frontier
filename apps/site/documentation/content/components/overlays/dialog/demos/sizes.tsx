import { Dialog } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Dialog key={size}>
          <Dialog.Trigger>{`Open ${size}`}</Dialog.Trigger>
          <Dialog.Content size={size}>
            <Dialog.Header>
              <Dialog.Title>{`A ${size} dialog`}</Dialog.Title>
              <Dialog.Description>The width follows the size you choose.</Dialog.Description>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog>
      ))}
    </>
  )
}
