import { Folder, Home, Settings, Tree } from '@rayscale/frontier'

const items = [
  { id: 'home', label: 'Home', href: '#', icon: <Home aria-hidden="true" /> },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Folder aria-hidden="true" />,
    children: [
      { id: 'website', label: 'Website', href: '#' },
      { id: 'app', label: 'Mobile app', href: '#' },
    ],
  },
  { id: 'settings', label: 'Settings', href: '#', icon: <Settings aria-hidden="true" /> },
]

export default function Icons() {
  return <Tree aria-label="Workspace" items={items} defaultExpandedIds={['projects']} />
}
