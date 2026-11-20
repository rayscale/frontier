import type { CSSProperties, ReactElement } from 'react'

export function CircularIndicator({
  percentage,
}: {
  percentage: number | undefined
}): ReactElement {
  const arcStyle: CSSProperties | undefined =
    percentage === undefined ? undefined : { strokeDashoffset: 100 - percentage }

  return (
    <svg className="frontier-progress__svg" aria-hidden="true" focusable="false">
      <circle className="frontier-progress__track" cx="50%" cy="50%" />
      <circle
        className="frontier-progress__arc"
        cx="50%"
        cy="50%"
        pathLength={100}
        style={arcStyle}
      />
    </svg>
  )
}
