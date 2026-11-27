import { InputOTP } from '@rayscale/frontier'

export default function WithError() {
  return (
    <InputOTP
      label="Verification code"
      defaultValue="123456"
      error="That code is not right. Try again."
    />
  )
}
