import { Archive, Button, Command, FilePlus, Settings } from '@rayscale/frontier'
import { useState } from 'react'

const groups = [
  {
    label: 'Notes',
    items: [
      { value: 'new', label: 'New note', icon: <FilePlus aria-hidden="true" size={16} /> },
      { value: 'archive', label: 'Archive note', icon: <Archive aria-hidden="true" size={16} /> },
    ],
  },
  {
    label: 'Application',
    items: [
      {
        value: 'settings',
        label: 'Open settings',
        icon: <Settings aria-hidden="true" size={16} />,
      },
    ],
  },
]

export default function Groups() {
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
      <Command.Dialog items={groups} open={open} onOpenChange={setOpen} />
    </>
  )
}
