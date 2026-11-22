import { Field } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <Field.Root disabled>
      <Field.Label>Email address</Field.Label>
      <Field.Box>
        <Field.Control defaultValue="ana@example.com" />
      </Field.Box>
    </Field.Root>
  )
}
