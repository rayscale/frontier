import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { TypefaceCover } from '#/pages/typeface-cover/index.js'

export const metadata: Metadata = { title: 'Typeface' }

export default function Page(): ReactElement {
  return <TypefaceCover />
}
