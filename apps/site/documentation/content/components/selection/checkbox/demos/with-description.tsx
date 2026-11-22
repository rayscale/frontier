import { Checkbox } from '@rayscale/frontier'

export default function WithDescription() {
  return (
    <Checkbox
      label="Marketing emails"
      description="Product news and offers, no more than twice a month."
    />
  )
}
