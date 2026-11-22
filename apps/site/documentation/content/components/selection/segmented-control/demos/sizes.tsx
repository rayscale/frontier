import { SegmentedControl } from '@rayscale/frontier'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

export default function Sizes() {
  return (
    <>
      <SegmentedControl aria-label="Small" options={options} defaultValue="day" size="small" />
      <SegmentedControl aria-label="Medium" options={options} defaultValue="day" size="medium" />
      <SegmentedControl aria-label="Large" options={options} defaultValue="day" size="large" />
    </>
  )
}
