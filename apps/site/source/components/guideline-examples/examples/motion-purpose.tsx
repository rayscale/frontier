import { SegmentedControl } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

const keyframes = `
@keyframes guideline-pulse { 50% { transform: scale(1.06); } }
@media (prefers-reduced-motion: reduce) { [style*='guideline-pulse'] { animation: none !important; } }
`

export default function MotionPurpose({ side }: TExampleProps): ReactElement {
  return side === 'do' ? (
    <SegmentedControl label="Period" options={options} defaultValue="week" />
  ) : (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          animation: 'guideline-pulse 1.6s ease-in-out infinite',
          background: 'var(--frontier-color-surface-raised)',
          border: '1px solid var(--frontier-color-border)',
          borderRadius: 'var(--frontier-radius-md)',
          padding: '20px 28px',
        }}
      >
        Settings
      </div>
    </>
  )
}
