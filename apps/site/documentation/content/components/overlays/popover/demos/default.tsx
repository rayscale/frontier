import { Popover } from '@rayscale/frontier'

export default function Default() {
  return (
    <Popover>
      <Popover.Trigger>Share</Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Share this page</Popover.Title>
          <Popover.Description>Anyone with the link can read it.</Popover.Description>
        </Popover.Header>
        <Popover.Close variant="outline">Done</Popover.Close>
      </Popover.Content>
    </Popover>
  )
}
