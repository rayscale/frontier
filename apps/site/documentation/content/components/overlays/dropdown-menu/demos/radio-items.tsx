import { DropdownMenu } from '@rayscale/frontier'
import { useState } from 'react'

export default function RadioItems() {
  const [sort, setSort] = useState('name')

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Sort by</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenu.RadioItem value="name">Name</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="date">Date</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="size">Size</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
