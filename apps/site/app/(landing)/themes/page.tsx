import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { ThemesCover } from '#/pages/themes-cover/index.js'

export const metadata: Metadata = { title: 'Themes' }

export default function Page(): ReactElement {
  return <ThemesCover />
}
