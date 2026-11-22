import { Slider } from '@rayscale/frontier'

export default function Marks() {
  return <Slider label="Brightness" defaultValue={50} step={10} markInterval={25} />
}
