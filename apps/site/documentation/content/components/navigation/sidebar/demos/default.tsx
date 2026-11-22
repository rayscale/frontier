import { Activity, Bell, Box, Home, Settings, Sidebar } from '@rayscale/frontier'

export default function Default() {
  return (
    <div style={{ height: '24rem', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Sidebar label="Workspace">
        <Sidebar.Header>
          <Sidebar.Brand icon={<Box aria-hidden="true" />}>Acme</Sidebar.Brand>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
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
                <Sidebar.MenuItem>
                  <Sidebar.Item href="#" icon={<Bell aria-hidden="true" />}>
                    Notifications
                  </Sidebar.Item>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.Item href="#" icon={<Settings aria-hidden="true" />}>
                Settings
              </Sidebar.Item>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
          <Sidebar.Trigger />
        </Sidebar.Footer>
        <Sidebar.Inset>
          <main style={{ padding: 'var(--frontier-spacing-6)' }}>
            <h3>Overview</h3>
            <p>Your workspace, at a glance.</p>
          </main>
        </Sidebar.Inset>
      </Sidebar>
    </div>
  )
}
