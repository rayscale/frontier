import { Checkbox } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <Checkbox label="Unavailable" disabled />
      <Checkbox label="Required by your plan" disabled defaultChecked />
    </>
  )
}
