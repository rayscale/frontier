import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { ComponentsCover } from '#/pages/components-cover/index.js'

export const metadata: Metadata = { title: 'Components' }

export default function Page(): ReactElement {
  return <ComponentsCover />
}
