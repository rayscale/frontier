import { InputGroup } from '@rayscale/frontier'

export default function TopAndBottom() {
  return (
    <InputGroup label="Note">
      <InputGroup.Addon align="top">
        <InputGroup.Text>Draft</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Textarea placeholder="Write a note" />
      <InputGroup.Addon align="bottom">
        <InputGroup.Text>Markdown is supported</InputGroup.Text>
      </InputGroup.Addon>
    </InputGroup>
  )
}
