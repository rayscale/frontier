import { ContextMenu } from '@rayscale/frontier'

export default function Submenu() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger style={{ padding: 'var(--frontier-spacing-8)', textAlign: 'center' }}>
        Right-click here
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Open</ContextMenu.Item>
        <ContextMenu.Submenu>
          <ContextMenu.SubmenuTrigger>Share</ContextMenu.SubmenuTrigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy link</ContextMenu.Item>
            <ContextMenu.Item>Send by email</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Submenu>
      </ContextMenu.Content>
    </ContextMenu>
  )
}
