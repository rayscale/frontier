'use client'

import { Button } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import './not-found.css'

/** Shown when no route or page matches the current path. */
export function NotFound(): ReactElement {
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
