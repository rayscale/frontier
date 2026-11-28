import { InputGroup } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <InputGroup label="Disabled" disabled>
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" />
      </InputGroup>
      <InputGroup label="Read only" readOnly>
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input defaultValue="example.com" />
      </InputGroup>
    </div>
  )
}
