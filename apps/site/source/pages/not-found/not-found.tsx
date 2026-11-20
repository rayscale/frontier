import type { ReactElement } from 'react'
import { Link } from 'react-router'

/** Shown when no route matches the current path. */
export function NotFound(): ReactElement {
  return (
    <>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to the home page</Link>
    </>
  )
}
