import { Button, Command } from '@rayscale/frontier'
import { useState } from 'react'

export default function Selection() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState('Nothing chosen yet.')
  const items = [
    {
      value: 'new',
      label: 'New note',
      onSelect: () => {
        setLast('You chose New note.')
      },
    },
    {
      value: 'settings',
      label: 'Open settings',
      onSelect: () => {
        setLast('You chose Open settings.')
      },
    },
  ]

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open the palette
      </Button>
      <p>{last}</p>
      <Command.Dialog items={items} open={open} onOpenChange={setOpen} />
    </>
  )
}
