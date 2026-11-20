import { Button } from '@rayscale/frontier'
import { type ReactElement, useEffect } from 'react'

import './not-found.css'

/** Shown when no route or page matches the current path. */
export function NotFound(): ReactElement {
  useEffect(() => {
    document.title = 'Page not found · Frontier'
  }, [])

  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button asChild>
        <a href="/docs">Go to the documentation</a>
      </Button>
    </main>
  )
}
