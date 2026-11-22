import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { IconsCover } from '#/pages/icons-cover/index.js'

export const metadata: Metadata = { title: 'Icons' }

export default function Page(): ReactElement {
  return <IconsCover />
}
