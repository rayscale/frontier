import { Callout, CircleX, Info } from '@rayscale/frontier'

export default function Roles() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Callout role="status">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Content>
          <Callout.Title>Status</Callout.Title>
          <p>Announced politely when it appears.</p>
        </Callout.Content>
      </Callout>
      <Callout role="alert" tone="danger">
        <Callout.Icon>
          <CircleX />
        </Callout.Icon>
        <Callout.Content>
          <Callout.Title>Alert</Callout.Title>
          <p>Announced at once. Keep it for urgent messages.</p>
        </Callout.Content>
      </Callout>
    </div>
  )
}
