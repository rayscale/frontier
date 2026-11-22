import { Field, Fieldset } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <Fieldset.Root disabled>
      <Fieldset.Legend>Billing address</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Street</Field.Label>
        <Field.Box>
          <Field.Control defaultValue="12 Main Street" />
        </Field.Box>
      </Field.Root>
    </Fieldset.Root>
  )
}
