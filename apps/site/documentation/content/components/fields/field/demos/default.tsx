import { Field } from '@rayscale/frontier'

export default function Default() {
  return (
    <Field.Root>
      <Field.Label>Email address</Field.Label>
      <Field.Box>
        <Field.Control type="email" placeholder="you@example.com" />
      </Field.Box>
      <Field.Description>We will only use this to contact you.</Field.Description>
    </Field.Root>
  )
}
