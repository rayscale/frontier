import { InputOTP } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <InputOTP label="Disabled" defaultValue="123" disabled />
      <InputOTP label="Read only" defaultValue="123456" readOnly />
    </div>
  )
}
