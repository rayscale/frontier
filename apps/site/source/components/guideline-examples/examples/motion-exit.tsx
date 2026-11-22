import { Button } from '@rayscale/frontier'
import { type ReactElement, useEffect, useState } from 'react'

import type { TExampleProps } from '../types.js'

const keyframes = `
@keyframes guideline-leave { to { opacity: 0; transform: translateY(8px); } }
@keyframes guideline-bounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.18); }
  55% { transform: scale(0.9); }
  75% { transform: scale(1.08); }
  100% { opacity: 0; transform: scale(0.6); }
}
@media (prefers-reduced-motion: reduce) {
  [data-guideline-leaving] { animation: none !important; opacity: 0; }
}
`

export default function MotionExit({ side }: TExampleProps): ReactElement {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!leaving) {
      return undefined
    }

    const timer = setTimeout(() => {
      setLeaving(false)
    }, 1400)

    return () => {
      clearTimeout(timer)
    }
  }, [leaving])

  const animation =
    side === 'do'
      ? 'guideline-leave 160ms ease-in forwards'
      : 'guideline-bounce 700ms ease-in-out forwards'

  return (
    <div style={{ alignItems: 'center', display: 'grid', gap: 16, justifyItems: 'center' }}>
      <style>{keyframes}</style>
      <div
        data-guideline-leaving={leaving ? '' : undefined}
        style={{
          animation: leaving ? animation : undefined,
          background: 'var(--frontier-color-surface-raised)',
          border: '1px solid var(--frontier-color-border)',
          borderRadius: 'var(--frontier-radius-md)',
          boxShadow: 'var(--frontier-shadow-sm)',
          padding: '16px 24px',
        }}
      >
        Popup
      </div>
      <Button
        size="small"
        variant="outline"
        onClick={() => {
          setLeaving(true)
        }}
      >
        Close it
      </Button>
    </div>
  )
}
