import { InputOTP } from '@rayscale/frontier'

export default function WithDescription() {
  return (
    <InputOTP
      label="Verification code"
      description="Enter the 6-digit code we sent to your email."
      autoComplete="one-time-code"
    />
  )
}
