import { SegmentedControl } from '@rayscale/frontier'

const options = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise', disabled: true },
]

export default function Disabled() {
  return (
    <>
      <SegmentedControl label="One option" options={options} defaultValue="free" />
      <SegmentedControl label="Whole control" options={options} defaultValue="free" disabled />
    </>
  )
}
