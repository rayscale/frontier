import { Button, Spinner } from '@rayscale/frontier'

export default function InButton() {
  return (
    <Button disabled>
      <Spinner size="small" label="Saving" />
      Saving
    </Button>
  )
}
