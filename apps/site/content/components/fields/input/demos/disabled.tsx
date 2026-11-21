import { Input } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <Input label="Disabled" defaultValue="Cannot change" disabled />
      <Input label="Read only" defaultValue="Can be selected" readOnly />
    </>
  )
}
