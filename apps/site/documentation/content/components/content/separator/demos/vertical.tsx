import { Separator } from '@rayscale/frontier'

export default function Vertical() {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 12, height: 24 }}>
      <span>Documentation</span>
      <Separator orientation="vertical" decorative />
      <span>Guides</span>
      <Separator orientation="vertical" decorative />
      <span>Icons</span>
    </div>
  )
}
