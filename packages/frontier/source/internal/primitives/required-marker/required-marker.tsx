import type { ReactElement } from 'react'

import './required-marker.css'

export function RequiredMarker(): ReactElement {
  return (
    <span className="frontier-required" aria-hidden="true">
      Required
    </span>
  )
}
