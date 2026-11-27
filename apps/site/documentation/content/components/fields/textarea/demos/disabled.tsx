import { Textarea } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <Textarea label="Disabled" placeholder="Unavailable" disabled />
      <Textarea label="Read only" value="Locked value" readOnly />
    </div>
  )
}
