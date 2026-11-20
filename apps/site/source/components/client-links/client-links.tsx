'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function isPlainLeftClick(event: MouseEvent): boolean {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

/**
 * Routes clicks on internal links through the Next.js router. Frontier components
 * render native anchors, so one delegated handler gives every one of them
 * client-side navigation without wrapping each link.
 */
export function ClientLinks(): null {
  const router = useRouter()

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (!isPlainLeftClick(event) || !(event.target instanceof Element)) {
        return
      }

      const anchor = event.target.closest('a[href]')

      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      if ((anchor.target !== '' && anchor.target !== '_self') || anchor.hasAttribute('download')) {
        return
      }

      const url = new URL(anchor.href, window.location.href)
      const samePageHash =
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash !== ''

      if (url.origin !== window.location.origin || samePageHash) {
        return
      }

      event.preventDefault()
      router.push(`${url.pathname}${url.search}${url.hash}`)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [router])

  return null
}
