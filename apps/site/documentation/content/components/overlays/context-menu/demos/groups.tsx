import { ContextMenu } from '@rayscale/frontier'

export default function Groups() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger style={{ padding: 'var(--frontier-spacing-8)', textAlign: 'center' }}>
        Right-click the file
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>report.pdf</ContextMenu.GroupLabel>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>Rename</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  )
}
