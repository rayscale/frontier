import { Slider } from '@rayscale/frontier'

export default function WithError() {
  return (
    <Slider
      label="Budget"
      description="Choose between 10 and 90."
      defaultValue={95}
      max={100}
      error="The budget cannot go above 90."
      showValue
    />
  )
}
