import type { ReactElement, ReactNode } from 'react'

import { DocsLayout } from '#/components/docs/index.js'

export default function Layout({ children }: { children: ReactNode }): ReactElement {
  return <DocsLayout>{children}</DocsLayout>
}
