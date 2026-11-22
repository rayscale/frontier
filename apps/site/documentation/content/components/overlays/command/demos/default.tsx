import { Archive, Button, Command, FilePlus, Settings } from '@rayscale/frontier'
import { useState } from 'react'

const items = [
  {
    value: 'new-note',
    label: 'New note',
    description: 'Create a blank note in the current folder',
    keywords: ['create', 'add'],
    icon: <FilePlus aria-hidden="true" size={16} />,
    shortcut: ['Mod', 'N'],
  },
  {
    value: 'settings',
    label: 'Open settings',
    icon: <Settings aria-hidden="true" size={16} />,
    shortcut: ['Mod', ','],
  },
  {
    value: 'archive',
    label: 'Archive note',
    description: 'Not available in the trash',
    icon: <Archive aria-hidden="true" size={16} />,
    disabled: true,
  },
]

export default function Default() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open the palette
      </Button>
      <Command.Dialog items={items} open={open} onOpenChange={setOpen} />
    </>
  )
}
