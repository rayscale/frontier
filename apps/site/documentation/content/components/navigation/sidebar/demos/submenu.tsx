import { Bell, Box, Folder, Home, Sidebar } from '@rayscale/frontier'

export default function Submenu() {
  return (
    <div style={{ height: '24rem', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Sidebar label="Workspace">
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
              <Sidebar.Item href="#" icon={<Bell aria-hidden="true" />}>
                Notifications
              </Sidebar.Item>
              <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.Submenu label="Projects" icon={<Folder aria-hidden="true" />} defaultOpen>
                <Sidebar.SubmenuItem href="#">Website</Sidebar.SubmenuItem>
                <Sidebar.SubmenuItem href="#">Mobile app</Sidebar.SubmenuItem>
              </Sidebar.Submenu>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Trigger />
        </Sidebar.Footer>
        <Sidebar.Inset>
          <main style={{ padding: 'var(--frontier-spacing-6)' }}>
            <p>A group of links that opens in place.</p>
          </main>
        </Sidebar.Inset>
      </Sidebar>
    </div>
  )
}
