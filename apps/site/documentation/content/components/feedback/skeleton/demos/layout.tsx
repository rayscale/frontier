import { Skeleton } from '@rayscale/frontier'

export default function Layout() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading profile"
      role="group"
      style={{ alignItems: 'center', display: 'flex', gap: 12, width: 280 }}
    >
      <Skeleton variant="circular" width={40} />
      <div style={{ display: 'grid', flex: 1, gap: 8 }}>
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" />
      </div>
    </div>
  )
}
