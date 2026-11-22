import { Drawer } from '@rayscale/frontier'

export default function Default() {
  return (
    <Drawer>
      <Drawer.Trigger>Open filters</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Filters</Drawer.Title>
          <Drawer.Description>Narrow the list of results.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
          <Drawer.Close variant="outline">Close</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}
