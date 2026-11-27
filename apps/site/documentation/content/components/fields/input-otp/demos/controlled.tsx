import { InputOTP } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('')

  return (
    <InputOTP
      label="Verification code"
      description={value.length === 6 ? `Code ${value} entered.` : 'Enter all 6 digits.'}
      value={value}
      onValueChange={setValue}
    />
  )
}
