import { Command } from '@rayscale/frontier'

const items = [
  { value: 'new', label: 'New note' },
  { value: 'settings', label: 'Open settings' },
]

export default function Shortcut() {
  return (
    <>
      <p>
        Press Mod+K, or Alt+P, to open the palette. Mod is Command on macOS and Control elsewhere.
      </p>
      <Command.Dialog items={items} shortcut="Alt+P" label="Quick actions" />
    </>
  )
}
