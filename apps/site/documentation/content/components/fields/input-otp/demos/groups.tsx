import { InputOTP } from '@rayscale/frontier'

export default function Groups() {
  return <InputOTP label="Verification code" groups={[3, 3]} />
}
