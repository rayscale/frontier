import { Switch } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [compact, setCompact] = useState(false)

  return (
    <Switch
      label="Compact view"
      description={compact ? 'Rows are tighter.' : 'Rows use the default spacing.'}
      checked={compact}
      onChange={(event) => {
        setCompact(event.target.checked)
      }}
    />
  )
}
