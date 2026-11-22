import { Tree } from '@rayscale/frontier'
import { useState } from 'react'

const items = [
  {
    id: 'guide',
    label: 'Guide',
    children: [
      { id: 'install', label: 'Installation', href: '#' },
      { id: 'usage', label: 'Usage', href: '#' },
    ],
  },
  {
    id: 'reference',
    label: 'Reference',
    children: [
      { id: 'components', label: 'Components', href: '#' },
      { id: 'tokens', label: 'Tokens', href: '#' },
    ],
  },
  { id: 'changelog', label: 'Changelog', href: '#' },
]

export default function Active() {
  const [activeId, setActiveId] = useState('tokens')

  return (
    <Tree
      aria-label="Documentation"
      items={items}
      activeId={activeId}
      onClickCapture={(event) => {
        if (event.target instanceof Element && event.target.closest('a')) {
          event.preventDefault()
        }
      }}
      onNavigate={(node) => {
        setActiveId(node.id)
      }}
    />
  )
}
