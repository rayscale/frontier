import { Input } from '@rayscale/frontier'

export default function WithError() {
  return (
    <Input
      label="Email"
      type="email"
      defaultValue="ana@"
      error="Enter an address like ana@example.com."
    />
  )
}
