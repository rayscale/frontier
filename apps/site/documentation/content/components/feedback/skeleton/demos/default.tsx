import { Skeleton } from '@rayscale/frontier'

export default function Default() {
  return (
    <div style={{ display: 'grid', gap: 8, width: 280 }}>
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
    </div>
  )
}
