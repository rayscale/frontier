import { Input } from '@rayscale/frontier'

export default function WithDescription() {
  return (
    <Input
      label="Username"
      description="Use letters and numbers. It appears on your profile."
      placeholder="ana"
    />
  )
}
