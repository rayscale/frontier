import { Sheet } from '@rayscale/frontier'

export default function Default() {
  return (
    <Sheet>
      <Sheet.Trigger>Open filters</Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Filters</Sheet.Title>
          <Sheet.Description>Narrow the list of results.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer>
          <Sheet.Close variant="outline">Close</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  )
}
