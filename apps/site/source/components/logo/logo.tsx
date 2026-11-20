import type { ReactElement, SVGProps } from 'react'

/** The Frontier mark: an F drawn on the same grid and stroke as the symbols. */
export function Logo(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7 20V4h10M7 12h7" />
    </svg>
  )
}
