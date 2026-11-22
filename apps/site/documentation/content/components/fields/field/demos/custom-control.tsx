import { Field } from '@rayscale/frontier'

export default function CustomControl() {
  return (
    <Field.Root>
      <Field.Label>Message</Field.Label>
      <Field.Box>
        <Field.Control render={<textarea rows={3} />} placeholder="Write a message" />
      </Field.Box>
      <Field.Description>
        Use the render prop to put another element in the control.
      </Field.Description>
    </Field.Root>
  )
}
