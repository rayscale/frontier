'use client'

import { Link } from '@rayscale/frontier'
import type { ComponentPropsWithoutRef, ReactElement } from 'react'

/** The links of a page, rendered with the Frontier link. */
export function DocumentationLink(props: ComponentPropsWithoutRef<'a'>): ReactElement {
  return <Link {...props} />
}
