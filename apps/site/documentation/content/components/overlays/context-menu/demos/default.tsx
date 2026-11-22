import { ContextMenu } from '@rayscale/frontier'

export default function Default() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger style={{ padding: 'var(--frontier-spacing-8)', textAlign: 'center' }}>
        Right-click here
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  )
}
