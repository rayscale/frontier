import { CalendarDays, Clock, LayoutGrid, SegmentedControl } from '@rayscale/frontier'

const options = [
  { label: 'Grid', value: 'grid', icon: <LayoutGrid aria-hidden="true" /> },
  { label: 'Calendar', value: 'calendar', icon: <CalendarDays aria-hidden="true" /> },
  { label: 'Timeline', value: 'timeline', icon: <Clock aria-hidden="true" /> },
]

export default function WithIcons() {
  return <SegmentedControl label="View" options={options} defaultValue="grid" />
}
