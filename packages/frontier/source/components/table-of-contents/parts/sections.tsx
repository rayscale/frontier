import { motion } from 'motion/react'
import { forwardRef, useState } from 'react'

import { durationBase, easingStandard, springLayout } from '../../../styles/motion.js'
import { useTableOfContentsContext } from '../context.js'
import { getFragmentId } from '../helpers/fragment.js'
import type {
  TTableOfContentsHeaderProps,
  TTableOfContentsItemProps,
  TTableOfContentsListProps,
} from '../types.js'

export const TableOfContentsHeader = forwardRef<HTMLHeadingElement, TTableOfContentsHeaderProps>(
  function TableOfContentsHeader({ className, ...props }, ref) {
    return (
      <h2
        {...props}
        ref={ref}
        className={['frontier-table-of-contents__header', className].filter(Boolean).join(' ')}
      />
    )
  },
)

export const TableOfContentsList = forwardRef<HTMLUListElement, TTableOfContentsListProps>(
  function TableOfContentsList({ className, ...props }, ref) {
    return (
      <ul
        {...props}
        ref={ref}
        className={['frontier-table-of-contents__list', className].filter(Boolean).join(' ')}
      />
    )
  },
)

export const TableOfContentsItem = forwardRef<HTMLAnchorElement, TTableOfContentsItemProps>(
  function TableOfContentsItem({ children, className, href, label, onClick, ...props }, ref) {
    const { activeId, handleLinkClick, prefersReducedMotion, side } = useTableOfContentsContext()
    const [hovered, setHovered] = useState(false)
    const id = getFragmentId(href)
    const activeState = id !== null && activeId === id
    const activeOffset = side === 'right' ? -2 : 2

    return (
      <li className="frontier-table-of-contents__item">
        <a
          {...props}
          ref={ref}
          href={href}
          aria-current={activeState ? 'location' : undefined}
          data-active={activeState ? '' : undefined}
          data-highlighted={hovered ? '' : undefined}
          className={['frontier-table-of-contents__link', className].filter(Boolean).join(' ')}
          onMouseEnter={() => {
            setHovered(true)
          }}
          onMouseLeave={() => {
            setHovered(false)
          }}
          onClick={(event) => {
            onClick?.(event)
            handleLinkClick(event, href)
          }}
        >
          {activeState && (
            <motion.span
              aria-hidden="true"
              className="frontier-table-of-contents__indicator"
              layoutId="active-indicator"
              initial={false}
              transition={prefersReducedMotion ? { duration: 0 } : springLayout}
            />
          )}
          <motion.span
            className="frontier-table-of-contents__label"
            animate={{ x: activeState ? activeOffset : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: durationBase, ease: easingStandard }
            }
          >
            {label}
          </motion.span>
        </a>
        {children}
      </li>
    )
  },
)
