import { Children, forwardRef, isValidElement, useRef } from 'react'

import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { useHighlightTarget } from '../../../internal/primitives/animated-highlight/use-highlight-target.js'
import { Drawer } from '../../drawer/drawer.js'
import { sidebarContext } from '../context.js'
import { sidebarHighlightSelector } from '../helpers/highlight.js'
import { useSidebarRoot } from '../hooks/use-sidebar-root.js'
import type { TSidebarInsetProps, TSidebarRootProps } from '../types.js'

export const SidebarInsetElement = forwardRef<HTMLDivElement, TSidebarInsetProps>(
  function SidebarInsetElement({ className, ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={['frontier-sidebar__inset', className].filter(Boolean).join(' ')}
      />
    )
  },
)

export const SidebarRoot = forwardRef<HTMLDivElement, TSidebarRootProps>(function SidebarRoot(
  {
    open,
    defaultOpen = true,
    onOpenChange,
    width = '16rem',
    collapsedWidth = '3rem',
    mobileWidth = '18rem',
    keyboardShortcut = 'b',
    animateOnHover = true,
    label = 'Sidebar',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const sidebarRef = useRef<HTMLElement | null>(null)
  const {
    sidebarId,
    mobileState,
    openState,
    mobileOpen,
    setMobileOpen,
    setOpen,
    toggleSidebar,
    sidebarStyle,
    mobileDrawerStyle,
  } = useSidebarRoot({
    open,
    defaultOpen,
    onOpenChange,
    keyboardShortcut,
    width,
    collapsedWidth,
    mobileWidth,
  })
  const { handlePointerOver, handlePointerLeave, handleFocusCapture, handleBlurCapture } =
    useHighlightTarget({
      enabled: animateOnHover,
      containerRef: sidebarRef,
      selector: sidebarHighlightSelector,
    })

  const context = {
    open: openState,
    mobile: mobileState,
    mobileOpen,
    sidebarId,
    setOpen,
    setMobileOpen,
    toggleSidebar,
  }
  const layoutChildren = Children.toArray(children)
  const sidebarChildren = layoutChildren.filter(
    (child) => !isValidElement(child) || child.type !== SidebarInsetElement,
  )
  const insetChildren = layoutChildren.filter(
    (child) => isValidElement(child) && child.type === SidebarInsetElement,
  )
  const classes = ['frontier-sidebar-layout', className].filter(Boolean).join(' ')

  const sidebar = (
    <nav
      ref={sidebarRef}
      id={sidebarId}
      aria-label={label}
      data-state={mobileState || openState ? 'expanded' : 'collapsed'}
      data-collapsible={mobileState || openState ? 'none' : 'symbol'}
      data-animate-on-hover={animateOnHover ? 'true' : 'false'}
      className="frontier-sidebar"
      style={sidebarStyle}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      <AnimatedHighlight className="frontier-sidebar__highlight" followTargetShape />
      {sidebarChildren}
    </nav>
  )

  return (
    <sidebarContext.Provider value={context}>
      <div
        {...props}
        ref={ref}
        className={classes}
        data-state={openState ? 'expanded' : 'collapsed'}
        data-mobile={mobileState ? 'true' : undefined}
        style={{ ...style }}
      >
        {mobileState ? (
          <Drawer open={mobileOpen} onOpenChange={setMobileOpen} side="left">
            <Drawer.Content
              className="frontier-sidebar__mobile-drawer"
              showCloseButton={false}
              aria-label={label}
              style={mobileDrawerStyle}
            >
              {sidebar}
            </Drawer.Content>
          </Drawer>
        ) : (
          sidebar
        )}
        {insetChildren}
      </div>
    </sidebarContext.Provider>
  )
})
