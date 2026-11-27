import { Textarea } from '@rayscale/frontier'

export default function WithDescription() {
  return (
    <Textarea
      label="Bio"
      description="A few sentences about you. It appears on your profile."
      placeholder="I design and build…"
    />
  )
}
