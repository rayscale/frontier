import { Slider } from '@rayscale/frontier'

export default function Range() {
  return (
    <Slider
      label="Price"
      defaultValue={[20, 80]}
      thumbLabels={['Minimum price', 'Maximum price']}
      showValue
    />
  )
}
