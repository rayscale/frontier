import { Empty, Inbox } from '@rayscale/frontier'

export default function Variants() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['default', 'outline', 'surface'] as const).map((variant) => (
        <Empty key={variant} variant={variant}>
          <Empty.Header>
            <Empty.Media variant="icon">
              <Inbox />
            </Empty.Media>
            <Empty.Title>Inbox is empty</Empty.Title>
            <Empty.Description>The {variant} variant.</Empty.Description>
          </Empty.Header>
        </Empty>
      ))}
    </div>
  )
}
