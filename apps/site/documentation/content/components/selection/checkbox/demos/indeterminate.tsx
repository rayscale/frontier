import { Checkbox } from '@rayscale/frontier'
import { useState } from 'react'

const options = ['Email', 'Phone', 'Post']

export default function Indeterminate() {
  const [selected, setSelected] = useState<string[]>(['Email'])
  const all = selected.length === options.length
  const some = selected.length > 0 && !all

  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-3)' }}>
      <Checkbox
        label="All contact methods"
        checked={all}
        indeterminate={some}
        onChange={() => {
          setSelected(all ? [] : options)
        }}
      />
      {options.map((option) => (
        <Checkbox
          key={option}
          label={option}
          checked={selected.includes(option)}
          onChange={(event) => {
            setSelected((current) =>
              event.target.checked
                ? [...current, option]
                : current.filter((item) => item !== option),
            )
          }}
        />
      ))}
    </div>
  )
}
