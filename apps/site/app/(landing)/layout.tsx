import type { ReactElement, ReactNode } from 'react'

import { LandingLayout } from '#/layout/index.js'

export default function Layout({ children }: { children: ReactNode }): ReactElement {
  return <LandingLayout>{children}</LandingLayout>
}
