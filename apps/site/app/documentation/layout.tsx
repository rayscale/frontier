import type { ReactElement, ReactNode } from 'react'

import { DocumentationLayout } from '#/components/documentation/index.js'

export default function Layout({ children }: { children: ReactNode }): ReactElement {
  return <DocumentationLayout>{children}</DocumentationLayout>
}
