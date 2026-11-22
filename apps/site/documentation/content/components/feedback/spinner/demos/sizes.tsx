import { Spinner } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 24 }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  )
}
