import { Progress } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-4)', width: '100%' }}>
      <Progress size="small" value={40} aria-label="Small" />
      <Progress size="medium" value={60} aria-label="Medium" />
      <Progress size="large" value={80} aria-label="Large" />
    </div>
  )
}
