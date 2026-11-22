import { Progress } from '@rayscale/frontier'

export default function Colors() {
  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-4)', width: '100%' }}>
      <Progress color="primary" value={50} aria-label="Primary" />
      <Progress color="success" value={100} aria-label="Complete" />
      <Progress color="danger" value={25} aria-label="Failing" />
    </div>
  )
}
