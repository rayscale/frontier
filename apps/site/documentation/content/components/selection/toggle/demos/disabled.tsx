import { Toggle } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <Toggle disabled>Off</Toggle>
      <Toggle disabled defaultPressed>
        On
      </Toggle>
    </>
  )
}
