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

export default function Controlled() {
  const [expanded, setExpanded] = useState<string[]>(['reference'])

  return (
    <>
      <Tree
        aria-label="Documentation"
        items={items}
        expandedIds={expanded}
        onExpandedChange={setExpanded}
      />
      <p>Expanded: {expanded.length > 0 ? expanded.join(', ') : 'none'}</p>
    </>
  )
}
