import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { motion, useReducedMotion } from 'motion/react'
import {
  forwardRef,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import {
  type TSelectorBounds,
  type TSelectorDragItem,
  useSelectorDrag,
} from '../../../internal/helpers/use-selector-drag.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { springLayout } from '../../../styles/motion.js'
import { tabsHighlightContext, tabsPanelContext } from '../context.js'
import type { TTabsListProps } from '../types.js'

function resolveIndicatorTransition(reduceMotion: boolean | null, dragging: boolean) {
  if (reduceMotion) {
    return { duration: 0 }
  }

  if (dragging) {
    return {
      left: { duration: 0 },
      top: { duration: 0 },
      width: springLayout,
      height: springLayout,
    }
  }

  return springLayout
}

export const TabsList = forwardRef<HTMLDivElement, TTabsListProps>(function TabsList(
  {
    children,
    className,
    onBlur,
    onClickCapture,
    onFocus,
    onPointerCancel,
    onPointerDown,
    onPointerLeave,
    onPointerMove,
    onPointerOver,
    onPointerUp,
    ...props
  },
  ref,
) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const [indicatorBounds, setIndicatorBounds] = useState<TSelectorBounds | null>(null)
  const [verticalState, setIsVertical] = useState(false)
  const [hoveredValue, setHoveredValue] = useState<string | null>(null)
  const [focusedValue, setFocusedValue] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const highlightedValue = hoveredValue ?? focusedValue

  const getHighlightableValue = useCallback((target: EventTarget | null) => {
    const list = listRef.current
    const tab =
      target instanceof Element
        ? target.closest<HTMLElement>('[role="tab"][data-selector-value]')
        : null
    if (!list || !tab || !list.contains(tab) || tab.hasAttribute('data-disabled')) {
      return null
    }

    return tab.dataset.selectorValue ?? null
  }, [])

  const getItems = useCallback(() => {
    const list = listRef.current
    if (!list) {
      return []
    }

    return Array.from(list.querySelectorAll<HTMLElement>('[role="tab"][data-selector-value]')).map<
      TSelectorDragItem<string>
    >((tab) => ({
      value: tab.dataset.selectorValue ?? '',
      disabled: tab.getAttribute('aria-disabled') === 'true',
    }))
  }, [])

  const getItemElement = useCallback((value: string) => {
    const list = listRef.current
    if (!list) {
      return undefined
    }

    return Array.from(list.querySelectorAll<HTMLElement>('[role="tab"][data-selector-value]')).find(
      (tab) => tab.dataset.selectorValue === value,
    )
  }, [])

  const getItemBounds = useCallback(
    (value: string): TSelectorBounds | null => {
      const list = listRef.current
      const tab = getItemElement(value)
      if (!list || !tab) {
        return null
      }

      const listRect = list.getBoundingClientRect()
      const tabRect = tab.getBoundingClientRect()
      return {
        left: tabRect.left - listRect.left - list.clientLeft,
        width: tabRect.width,
        top: tabRect.top - listRect.top - list.clientTop,
        height: tabRect.height,
      }
    },
    [getItemElement],
  )

  const selectTab = useCallback(
    (value: string) => {
      getItemElement(value)?.focus()
    },
    [getItemElement],
  )

  const measureIndicator = useCallback(() => {
    const list = listRef.current
    const activeTab = list?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')

    if (!list || !activeTab) {
      setIndicatorBounds(null)
      return
    }

    const listRect = list.getBoundingClientRect()
    const tabRect = activeTab.getBoundingClientRect()
    const vertical = list.closest('.frontier-tabs')?.getAttribute('data-orientation') === 'vertical'
    setIsVertical(vertical)
    setIndicatorBounds({
      left: tabRect.left - listRect.left - list.clientLeft,
      width: tabRect.width,
      top: tabRect.top - listRect.top - list.clientTop,
      height: tabRect.height,
    })
  }, [])

  const panelContext = useContext(tabsPanelContext)
  const selectedValue = panelContext?.value ?? undefined

  const drag = useSelectorDrag({
    containerRef: listRef,
    disabled: false,
    indicatorBounds,
    getItems,
    getItemElement,
    getItemBounds,
    onBoundsChange: setIndicatorBounds,
    onSelect: selectTab,
    measureIndicator,
    selectedValue,
    orientation: verticalState ? 'vertical' : 'horizontal',
  })

  const setListRef = useCallback(
    (element: HTMLDivElement | null) => {
      listRef.current = element
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    },
    [ref],
  )

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) {
      return undefined
    }

    measureIndicator()
    const mutationObserver = new MutationObserver(measureIndicator)
    mutationObserver.observe(list, {
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-selected'],
    })

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measureIndicator)
    resizeObserver?.observe(list)
    for (const tab of list.querySelectorAll<HTMLElement>('[role="tab"]')) {
      resizeObserver?.observe(tab)
    }

    window.addEventListener('resize', measureIndicator)

    return () => {
      mutationObserver.disconnect()
      resizeObserver?.disconnect()
      window.removeEventListener('resize', measureIndicator)
    }
  }, [children, measureIndicator])

  return (
    <BaseTabs.List
      {...props}
      ref={setListRef}
      activateOnFocus
      className={['frontier-tabs__list', className].filter(Boolean).join(' ')}
      data-dragging={drag.dragging || undefined}
      onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event)
        drag.onPointerDown(event)
      }}
      onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event)
        drag.onPointerMove(event)
      }}
      onPointerUp={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerUp?.(event)
        drag.onPointerUp(event)
      }}
      onPointerCancel={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerCancel?.(event)
        drag.onPointerCancel(event)
      }}
      onClickCapture={(event: ReactMouseEvent<HTMLDivElement>) => {
        onClickCapture?.(event)
        drag.onClickCapture(event)
      }}
      onFocus={(event: ReactFocusEvent<HTMLDivElement>) => {
        onFocus?.(event)
        const keyboardFocus =
          event.target instanceof Element && event.target.matches(':focus-visible')
        setFocusedValue(keyboardFocus ? getHighlightableValue(event.target) : null)
      }}
      onBlur={(event: ReactFocusEvent<HTMLDivElement>) => {
        onBlur?.(event)
        setFocusedValue(null)
      }}
      onPointerOver={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerOver?.(event)
        if (event.pointerType === 'touch') {
          return
        }

        setHoveredValue(getHighlightableValue(event.target))
      }}
      onPointerLeave={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event)
        setHoveredValue(null)
      }}
    >
      <tabsHighlightContext.Provider value={highlightedValue}>
        <AnimatedHighlight className="frontier-tabs__highlight" />
        {children}
      </tabsHighlightContext.Provider>
      {indicatorBounds && (
        <motion.span
          className="frontier-tabs__indicator"
          data-orientation={verticalState ? 'vertical' : 'horizontal'}
          aria-hidden="true"
          initial={false}
          animate={
            verticalState
              ? {
                  top: indicatorBounds.top ?? 0,
                  height: indicatorBounds.height ?? 0,
                }
              : {
                  left: indicatorBounds.left,
                  width: indicatorBounds.width,
                }
          }
          transition={resolveIndicatorTransition(reduceMotion, drag.dragging)}
        />
      )}
    </BaseTabs.List>
  )
})
