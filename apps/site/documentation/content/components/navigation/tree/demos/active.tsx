import { Tree } from '@rayscale/frontier'

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
  return <Tree aria-label="Documentation" items={items} activeId="tokens" />
}
