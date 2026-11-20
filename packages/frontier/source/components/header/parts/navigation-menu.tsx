import { forwardRef, useEffect, useId, useRef, useState } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useMediaQuery } from '../../../internal/helpers/use-media-query.js'
import { NavigationMenu } from '../../navigation-menu/index.js'
import { useHeaderContext } from '../context.js'
import type { THeaderNavigationMenuProps } from '../types.js'

import { HeaderMenuButton } from './menu-button.js'

const compactQuery = '(max-width: 48rem)'

export const HeaderNavigationMenu = forwardRef<HTMLElement, THeaderNavigationMenuProps>(
  function HeaderNavigationMenu(
    { label, toggleLabel = 'Menu', compact: compactProp, className, children, onClick, ...props },
    ref,
  ) {
    const viewportCompact = useMediaQuery(compactQuery)
    const compact = compactProp ?? viewportCompact
    const header = useHeaderContext()
    const [open, setOpen] = useState(false)
    const panelId = useId()
    const toggleRef = useRef<HTMLButtonElement | null>(null)
    const expanded = compact && open
    const setHeaderExpanded = header?.setExpanded
    const headerRef = header?.headerRef

    useEffect(() => {
      if (!compact) {
        setOpen(false)
      }
    }, [compact])

    useEffect(() => {
      setHeaderExpanded?.(expanded)

      return () => {
        setHeaderExpanded?.(false)
      }
    }, [expanded, setHeaderExpanded])

    useEffect(() => {
      if (!expanded) {
        return undefined
      }

      const handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          setOpen(false)
          toggleRef.current?.focus()
        }
      }

      const handlePointerDown = (event: PointerEvent): void => {
        const owner = headerRef?.current ?? toggleRef.current?.closest('nav')

        if (event.target instanceof Node && owner && !owner.contains(event.target)) {
          setOpen(false)
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('pointerdown', handlePointerDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('pointerdown', handlePointerDown)
      }
    }, [expanded, headerRef])

    if (!compact) {
      return (
        <NavigationMenu
          {...props}
          ref={ref}
          aria-label={label}
          className={className}
          onClick={onClick}
        >
          {children}
        </NavigationMenu>
      )
    }

    return (
      <NavigationMenu
        {...props}
        ref={ref}
        layout="stacked"
        revealed={open}
        aria-label={label}
        className={classNames('frontier-header__navigation', className)}
        onClick={(event) => {
          onClick?.(event)

          if (event.target instanceof Element && event.target.closest('a[href]')) {
            setOpen(false)
          }
        }}
      >
        <HeaderMenuButton
          ref={toggleRef}
          aria-label={toggleLabel}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((current) => !current)
          }}
        />
        <div
          id={panelId}
          className="frontier-header__panel"
          inert={!open}
          data-open={open ? '' : undefined}
        >
          <div className="frontier-header__panel-inner">
            <div className="frontier-header__panel-content">{children}</div>
          </div>
        </div>
      </NavigationMenu>
    )
  },
)
