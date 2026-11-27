import { InputOTP } from '@rayscale/frontier'

export default function Pattern() {
  return (
    <InputOTP
      label="Recovery code"
      length={8}
      groups={[4, 4]}
      pattern="^[a-zA-Z0-9]+$"
      inputMode="text"
    />
  )
}
