import { Slider } from '@rayscale/frontier'

export default function Disabled() {
  return <Slider label="Volume" defaultValue={40} disabled showValue />
}
