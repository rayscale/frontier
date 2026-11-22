import { Skeleton } from '@rayscale/frontier'

export default function Variants() {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <Skeleton variant="circular" width={48} />
      <Skeleton variant="rectangular" width={120} height={48} />
      <Skeleton variant="text" width={160} />
    </div>
  )
}
