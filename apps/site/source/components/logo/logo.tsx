import type { ReactElement, SVGProps } from 'react'

/** The Frontier mark: a rounded square with an open doorway, drawn on a 64 px grid. */
export function Logo(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="24"
      viewBox="0 0 64 64"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 8h20a14 14 0 0 1 14 14v20a14 14 0 0 1-14 14H22A14 14 0 0 1 8 42V22A14 14 0 0 1 22 8zM24 56V30a8 8 0 0 1 16 0v26z"
        fillRule="evenodd"
      />
    </svg>
  )
}
