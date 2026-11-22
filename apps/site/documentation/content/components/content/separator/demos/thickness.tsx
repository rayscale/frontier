import { Separator } from '@rayscale/frontier'

export default function Thickness() {
  return (
    <div style={{ display: 'grid', gap: 16, width: 280 }}>
      <Separator thickness={1} />
      <Separator thickness={3} />
    </div>
  )
}
