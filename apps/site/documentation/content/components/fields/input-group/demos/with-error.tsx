import { InputGroup } from '@rayscale/frontier'

export default function WithError() {
  return (
    <InputGroup label="Website" error="Enter a valid address.">
      <InputGroup.Addon>
        <InputGroup.Text>https://</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input defaultValue="example" />
    </InputGroup>
  )
}
