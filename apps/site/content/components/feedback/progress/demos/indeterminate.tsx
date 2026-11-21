import { Progress } from '@rayscale/frontier'

export default function Indeterminate() {
  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-4)', width: '100%' }}>
      <Progress aria-label="Loading" />
      <Progress variant="circular" aria-label="Loading" />
    </div>
  )
}
