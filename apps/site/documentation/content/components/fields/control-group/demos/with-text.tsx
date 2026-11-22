import { ControlGroup, Input } from '@rayscale/frontier'

export default function WithText() {
  return (
    <ControlGroup aria-label="Website address">
      <ControlGroup.Text>https://</ControlGroup.Text>
      <Input aria-label="Address" placeholder="example.com" />
    </ControlGroup>
  )
}
