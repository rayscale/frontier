import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { Home } from '#/pages/home/index.js'

export const metadata: Metadata = { title: { absolute: 'Frontier' } }

export default function Page(): ReactElement {
  return <Home />
}
