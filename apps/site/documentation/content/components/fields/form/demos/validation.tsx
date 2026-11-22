import { Button, Form, Input } from '@rayscale/frontier'

export default function Validation() {
  return (
    <Form>
      <Input label="Email" name="email" type="email" required description="Required." />
      <Input
        label="Age"
        name="age"
        type="number"
        min={18}
        max={120}
        description="Between 18 and 120."
      />
      <Button type="submit">Save</Button>
    </Form>
  )
}
