import { SegmentedControl } from '@rayscale/frontier'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

export default function Default() {
  return <SegmentedControl label="Period" options={options} defaultValue="week" />
}
