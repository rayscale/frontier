import { Button } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <Button disabled>Primary</Button>
      <Button disabled variant="secondary">
        Secondary
      </Button>
      <Button disabled variant="outline">
        Outline
      </Button>
    </>
  )
}
