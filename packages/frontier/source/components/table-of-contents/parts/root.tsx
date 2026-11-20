import { LayoutGroup, useReducedMotion } from 'motion/react'
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { tableOfContentsContext, type TTableOfContentsContextValue } from '../context.js'
import { getFragmentId } from '../helpers/fragment.js'
import type { TTableOfContentsRootProps } from '../types.js'

export const TableOfContentsRoot = forwardRef<HTMLElement, TTableOfContentsRootProps>(
  function TableOfContentsRoot(
    {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className,
      side = 'left',
      ...props
    },
    ref,
  ) {
    const rootRef = useRef<HTMLElement | null>(null)
    const lastClickRef = useRef<{ id: string; time: number } | null>(null)
    const [activeId, setActiveId] = useState<string | null>(null)
    const prefersReducedMotion = useReducedMotion() ?? false
    const indicatorId = useId()
    const setRootRef = useCallback(
      (node: HTMLElement | null) => {
        rootRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    useEffect(() => {
      const root = rootRef.current
      if (!root || typeof IntersectionObserver === 'undefined') {
        return undefined
      }

      const targets = new Map<Element, string>()
      root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
        const id = getFragmentId(link.getAttribute('href') ?? '')
        if (id) {
          const target = document.getElementById(id)
          if (target) {
            targets.set(target, id)
          }
        }
      })

      if (targets.size === 0) {
        return undefined
      }

      const visibleTargets = new Map<Element, number>()
      const targetTops = new Map<Element, number>()
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            targetTops.set(entry.target, entry.boundingClientRect.top)
            if (entry.isIntersecting) {
              visibleTargets.set(entry.target, entry.boundingClientRect.top)
            } else {
              visibleTargets.delete(entry.target)
            }
          })

          let activeTarget: Element | undefined = [...visibleTargets.entries()].sort(
            ([, firstTop], [, secondTop]) => firstTop - secondTop,
          )[0]?.[0]
          if (!activeTarget) {
            const atBottom =
              window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8
            if (atBottom) {
              activeTarget = [...targets.keys()][targets.size - 1]
            } else {
              const passed = [...targetTops.entries()]
                .filter(([, top]) => top <= 0)
                .sort(([, firstTop], [, secondTop]) => secondTop - firstTop)[0]?.[0]
              activeTarget = passed
            }
          }

          if (lastClickRef.current && Date.now() - lastClickRef.current.time < 1200) {
            return
          }

          const nextId = activeTarget ? (targets.get(activeTarget) ?? null) : null
          if (nextId) {
            setActiveId(nextId)
          }
        },
        { rootMargin: '-15% 0px -75% 0px' },
      )

      targets.forEach((_, target) => {
        observer.observe(target)
      })
      return () => {
        observer.disconnect()
      }
    }, [children])

    const handleLinkClick = useCallback(
      (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          (event.currentTarget.target !== '' &&
            event.currentTarget.target.toLowerCase() !== '_self') ||
          event.currentTarget.hasAttribute('download')
        ) {
          return
        }

        const id = getFragmentId(href)
        const target = id ? document.getElementById(id) : null
        if (!target) {
          return
        }

        event.preventDefault()
        if (id) {
          lastClickRef.current = { id, time: Date.now() }
        }

        setActiveId(id)
        if (window.location.hash !== href) {
          window.history.pushState(null, '', href)
        }

        const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth'
        const top = target.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top, behavior })
      },
      [prefersReducedMotion],
    )

    const context: TTableOfContentsContextValue = {
      activeId,
      handleLinkClick,
      prefersReducedMotion,
      side,
    }

    return (
      <tableOfContentsContext.Provider value={context}>
        <LayoutGroup id={indicatorId}>
          <nav
            {...props}
            ref={setRootRef}
            aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : 'On this page')}
            aria-labelledby={ariaLabelledBy}
            className={[
              'frontier-table-of-contents',
              side === 'right' ? 'frontier-table-of-contents--right' : null,
              className,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <AnimatedHighlight
              className="frontier-table-of-contents__highlight"
              followTargetShape
            />
            {children}
          </nav>
        </LayoutGroup>
      </tableOfContentsContext.Provider>
    )
  },
)
