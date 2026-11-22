import { Input, Popover } from '@rayscale/frontier'

export default function WithForm() {
  return (
    <Popover>
      <Popover.Trigger>Rename</Popover.Trigger>
      <Popover.Content align="start">
        <Popover.Header>
          <Popover.Title>Rename the file</Popover.Title>
        </Popover.Header>
        <Input label="Name" defaultValue="report.pdf" />
        <Popover.Close>Save</Popover.Close>
      </Popover.Content>
    </Popover>
  )
}
