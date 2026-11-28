import { InputGroup } from '@rayscale/frontier'
import { useState } from 'react'

export default function WithCounter() {
  const [value, setValue] = useState('')
  const limit = 140

  return (
    <InputGroup label="Bio" description="A few sentences about you.">
      <InputGroup.Textarea
        maxLength={limit}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
      <InputGroup.Addon align="bottom">
        <InputGroup.Text style={{ marginInlineStart: 'auto' }}>
          {value.length} / {limit}
        </InputGroup.Text>
      </InputGroup.Addon>
    </InputGroup>
  )
}
