import { NumberField } from '@rayscale/frontier'

export default function Limits() {
  return (
    <NumberField
      defaultValue={6}
      description="From 1 to 6 guests."
      label="Guests"
      max={6}
      min={1}
    />
  )
}
