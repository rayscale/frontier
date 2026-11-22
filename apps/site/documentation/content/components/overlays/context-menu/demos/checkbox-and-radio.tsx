import { ContextMenu } from '@rayscale/frontier'
import { useState } from 'react'

export default function CheckboxAndRadio() {
  const [hidden, setHidden] = useState(false)
  const [view, setView] = useState('list')

  return (
    <ContextMenu>
      <ContextMenu.Trigger style={{ padding: 'var(--frontier-spacing-8)', textAlign: 'center' }}>
        Right-click the folder
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.CheckboxItem checked={hidden} onCheckedChange={setHidden}>
          Show hidden files
        </ContextMenu.CheckboxItem>
        <ContextMenu.Separator />
        <ContextMenu.RadioGroup value={view} onValueChange={setView}>
          <ContextMenu.RadioItem value="list">As a list</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="grid">As a grid</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
      </ContextMenu.Content>
    </ContextMenu>
  )
}
