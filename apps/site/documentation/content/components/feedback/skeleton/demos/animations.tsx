import { Skeleton } from '@rayscale/frontier'

export default function Animations() {
  return (
    <div style={{ display: 'grid', gap: 12, width: 240 }}>
      <Skeleton animation="shimmer" variant="rectangular" height={24} />
      <Skeleton animation="pulse" variant="rectangular" height={24} />
      <Skeleton animation="none" variant="rectangular" height={24} />
    </div>
  )
}
