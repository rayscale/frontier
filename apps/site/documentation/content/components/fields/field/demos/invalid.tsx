import { Field } from '@rayscale/frontier'

export default function Invalid() {
  return (
    <Field.Root invalid>
      <Field.Label>Email address</Field.Label>
      <Field.Box>
        <Field.Control defaultValue="not-an-email" />
      </Field.Box>
      <Field.Error match>Enter a valid email address.</Field.Error>
    </Field.Root>
  )
}
