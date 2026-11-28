import { NumberField } from '@rayscale/frontier'

export default function Formats() {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <NumberField
        defaultValue={1234.5}
        format={{ style: 'currency', currency: 'USD' }}
        label="Price"
        locale="en-US"
        step={10}
      />
      <NumberField
        defaultValue={0.2}
        format={{ style: 'percent' }}
        label="Discount"
        max={1}
        min={0}
        step={0.05}
      />
    </div>
  )
}
