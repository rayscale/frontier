import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { SymbolsCover } from '#/pages/symbols-cover/index.js'

export const metadata: Metadata = { title: 'Symbols' }

export default function Page(): ReactElement {
  return <SymbolsCover />
}
