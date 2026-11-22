import { Badge, Check } from '@rayscale/frontier'

export default function WithIcon() {
  return (
    <Badge variant="success">
      <Check aria-hidden="true" />
      Verified
    </Badge>
  )
}
