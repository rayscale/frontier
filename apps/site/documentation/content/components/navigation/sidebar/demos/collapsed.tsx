import { Activity, Box, Home, Sidebar } from '@rayscale/frontier'

export default function Collapsed() {
  return (
    <div style={{ height: '20rem', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Sidebar label="Workspace" defaultOpen={false}>
        <Sidebar.Header>
          <Sidebar.Brand icon={<Box aria-hidden="true" />}>Acme</Sidebar.Brand>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.Item href="#" icon={<Home aria-hidden="true" />} active>
                Overview
              </Sidebar.Item>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.Item href="#" icon={<Activity aria-hidden="true" />}>
                Activity
              </Sidebar.Item>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Trigger />
        </Sidebar.Footer>
        <Sidebar.Inset>
          <main style={{ padding: 'var(--frontier-spacing-6)' }}>
            <p>Collapsed to icons, with the labels shown on hover.</p>
          </main>
        </Sidebar.Inset>
      </Sidebar>
    </div>
  )
}
