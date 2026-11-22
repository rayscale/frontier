import { Badge } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
    </div>
  )
}
