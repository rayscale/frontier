import { ArrowUp, Button, InputGroup, Plus } from '@rayscale/frontier'

export default function Default() {
  return (
    <InputGroup label="Message">
      <InputGroup.Textarea placeholder="Ask, search or chat…" />
      <InputGroup.Addon align="bottom">
        <Button variant="outline" size="icon-small" aria-label="Attach a file">
          <Plus aria-hidden="true" />
        </Button>
        <InputGroup.Text>Auto</InputGroup.Text>
        <Button size="icon-small" aria-label="Send" style={{ marginInlineStart: 'auto' }}>
          <ArrowUp aria-hidden="true" />
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  )
}
