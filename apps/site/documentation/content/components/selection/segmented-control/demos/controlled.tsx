import { SegmentedControl } from '@rayscale/frontier'
import { useState } from 'react'

type TView = 'list' | 'board'

const options: { label: string; value: TView }[] = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
]

export default function Controlled() {
  const [view, setView] = useState<TView>('list')

  return (
    <>
      <SegmentedControl label="Layout" options={options} value={view} onChange={setView} />
      <p>Showing the {view} view.</p>
    </>
  )
}
