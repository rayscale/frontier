import { type RefObject, useEffect, useMemo, useState } from 'react'

import {
  collectHeadings,
  nestHeadings,
  type THeading,
  type THeadingBranch,
} from '#/documentation/headings.js'

function sameHeadings(a: THeading[], b: THeading[]): boolean {
  return a.length === b.length && a.every((heading, index) => heading.id === b[index]?.id)
}

/**
 * Lists the headings of the rendered content. The content loads lazily, so the
 * list updates whenever the content changes.
 */
export function useHeadings(content: RefObject<HTMLElement | null>): THeadingBranch[] {
  const [headings, setHeadings] = useState<THeading[]>([])

  useEffect(() => {
    const element = content.current

    if (!element) {
      return undefined
    }

    const update = (): void => {
      const next = collectHeadings(element)

      setHeadings((current) => (sameHeadings(current, next) ? current : next))
    }

    const observer = new MutationObserver(update)

    update()
    observer.observe(element, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [content])

  return useMemo(() => nestHeadings(headings), [headings])
}
