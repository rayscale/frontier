import { Separator } from '@rayscale/frontier'

export default function Colors() {
  return (
    <div style={{ display: 'grid', gap: 16, width: 280 }}>
      <Separator color="subtle" />
      <Separator color="default" />
      <Separator color="strong" />
    </div>
  )
}
