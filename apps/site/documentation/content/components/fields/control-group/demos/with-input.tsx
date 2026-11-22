import { Button, ControlGroup, Input } from '@rayscale/frontier'

export default function WithInput() {
  return (
    <ControlGroup aria-label="Search">
      <Input aria-label="Search notes" placeholder="Search notes" />
      <Button variant="outline">Search</Button>
    </ControlGroup>
  )
}
