import { DropdownMenu } from '@rayscale/frontier'

export default function Submenu() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>File</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>New</DropdownMenu.Item>
        <DropdownMenu.Submenu>
          <DropdownMenu.SubmenuTrigger>Export</DropdownMenu.SubmenuTrigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>As PDF</DropdownMenu.Item>
            <DropdownMenu.Item>As image</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Submenu>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
