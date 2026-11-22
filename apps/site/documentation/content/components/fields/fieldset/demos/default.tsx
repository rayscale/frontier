import { Field, Fieldset } from '@rayscale/frontier'

export default function Default() {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Contact</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Box>
          <Field.Control type="email" />
        </Field.Box>
      </Field.Root>
      <Field.Root>
        <Field.Label>Phone</Field.Label>
        <Field.Box>
          <Field.Control type="tel" />
        </Field.Box>
      </Field.Root>
    </Fieldset.Root>
  )
}
