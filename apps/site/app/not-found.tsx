import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { LandingLayout } from '#/layout/index.js'
import { NotFound } from '#/pages/not-found/index.js'

export const metadata: Metadata = { title: 'Page not found' }

export default function Page(): ReactElement {
  return (
    <LandingLayout>
      <NotFound />
    </LandingLayout>
  )
}
