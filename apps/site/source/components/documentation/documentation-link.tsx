'use client'

import { Link } from '@rayscale/frontier'
import type { ComponentPropsWithoutRef, ReactElement } from 'react'

/** The links of a page, rendered with the link component. */
export function DocumentationLink(props: ComponentPropsWithoutRef<'a'>): ReactElement {
  return <Link {...props} />
}
