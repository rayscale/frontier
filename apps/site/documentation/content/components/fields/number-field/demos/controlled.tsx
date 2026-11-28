import { NumberField } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<number | null>(2)

  return (
    <NumberField
      description={value === null ? 'No number.' : `You chose ${String(value)}.`}
      label="Guests"
      min={0}
      value={value}
      onValueChange={setValue}
    />
  )
}
