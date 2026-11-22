import { Box, Sidebar } from '@rayscale/frontier'

const items = [
  {
    id: 'guide',
    label: 'Guide',
    children: [
      { id: 'install', label: 'Installation', href: '#' },
      { id: 'usage', label: 'Usage', href: '#' },
    ],
  },
  { id: 'changelog', label: 'Changelog', href: '#' },
]

export default function Tree() {
  return (
    <div style={{ height: '20rem', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Sidebar label="Documentation">
        <Sidebar.Header>
          <Sidebar.Brand icon={<Box aria-hidden="true" />}>Acme</Sidebar.Brand>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Tree aria-label="Documentation" items={items} defaultExpandedIds={['guide']} />
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Trigger />
        </Sidebar.Footer>
        <Sidebar.Inset>
          <main style={{ padding: 'var(--frontier-spacing-6)' }}>
            <p>A tree of pages inside the sidebar.</p>
          </main>
        </Sidebar.Inset>
      </Sidebar>
    </div>
  )
}
