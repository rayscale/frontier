import { Command } from '@rayscale/frontier'

const items = [
  { value: 'new', label: 'New note' },
  { value: 'open', label: 'Open note' },
  { value: 'settings', label: 'Open settings' },
]

export default function Inline() {
  return (
    <Command items={items}>
      <Command.Input aria-label="Search commands" placeholder="Search commands" />
      <Command.List />
      <Command.Empty>No command found.</Command.Empty>
    </Command>
  )
}
