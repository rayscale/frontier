import { Button, Copy, Info, InputGroup } from '@rayscale/frontier'

export default function Prefix() {
  return (
    <InputGroup label="Repository">
      <InputGroup.Addon>
        <InputGroup.Text>https://</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="github.com/frontier" />
      <InputGroup.Addon align="end">
        <Button variant="ghost" size="icon-small" aria-label="More information">
          <Info aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon-small" aria-label="Copy link">
          <Copy aria-hidden="true" />
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  )
}
