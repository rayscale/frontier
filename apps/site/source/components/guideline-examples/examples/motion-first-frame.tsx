import { Button } from '@rayscale/frontier'
import { type ReactElement, useState } from 'react'

import type { TExampleProps } from '../types.js'

const keyframes = `
@keyframes guideline-wrong-place { from { opacity: 0; transform: translateX(-56px); } }
@media (prefers-reduced-motion: reduce) {
  [data-guideline-new] { animation: none !important; }
}
`

export default function MotionFirstFrame({ side }: TExampleProps): ReactElement {
  const [run, setRun] = useState(0)

  return (
    <div style={{ alignItems: 'center', display: 'grid', gap: 16, justifyItems: 'center' }}>
      <style>{keyframes}</style>
      <div
        key={run}
        data-guideline-new=""
        style={{
          animation:
            side === 'dont' && run > 0 ? 'guideline-wrong-place 700ms ease-out' : undefined,
          background: 'var(--frontier-color-surface-raised)',
          border: '1px solid var(--frontier-color-border)',
          borderRadius: 'var(--frontier-radius-md)',
          boxShadow: 'var(--frontier-shadow-sm)',
          padding: '16px 24px',
        }}
      >
        Notification
      </div>
      <Button
        size="small"
        variant="outline"
        onClick={() => {
          setRun((current) => current + 1)
        }}
      >
        Show it again
      </Button>
    </div>
  )
}
