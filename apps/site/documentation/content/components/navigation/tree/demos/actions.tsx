import { Tree } from '@rayscale/frontier'
import { useState } from 'react'

const items = [
  { id: 'new', label: 'New file' },
  { id: 'open', label: 'Open file' },
  { id: 'archived', label: 'Archived', disabled: true },
]

export default function Actions() {
  const [last, setLast] = useState('Nothing yet.')

  return (
    <>
      <Tree
        aria-label="File actions"
        items={items}
        onAction={(node) => {
          setLast(`Activated ${node.id}.`)
        }}
      />
      <p>{last}</p>
    </>
  )
}
