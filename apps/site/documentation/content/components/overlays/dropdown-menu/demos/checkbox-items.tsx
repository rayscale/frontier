import { DropdownMenu } from '@rayscale/frontier'
import { useState } from 'react'

export default function CheckboxItems() {
  const [grid, setGrid] = useState(true)
  const [rulers, setRulers] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>View</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.CheckboxItem checked={grid} onCheckedChange={setGrid}>
          Show grid
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem checked={rulers} onCheckedChange={setRulers}>
          Show rulers
        </DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
