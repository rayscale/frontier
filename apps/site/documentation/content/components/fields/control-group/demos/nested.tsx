import { Button, ControlGroup } from '@rayscale/frontier'

export default function Nested() {
  return (
    <ControlGroup aria-label="Editor">
      <Button variant="outline">Undo</Button>
      <Button variant="outline">Redo</Button>
      <ControlGroup aria-label="Text formatting">
        <Button variant="outline">Bold</Button>
        <Button variant="outline">Italic</Button>
      </ControlGroup>
    </ControlGroup>
  )
}
