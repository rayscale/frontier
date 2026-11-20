import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { animate, useReducedMotion } from 'motion/react'
import { forwardRef, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { durationBase, easingStandard } from '../../../styles/motion.js'
import { tabsPanelContext } from '../context.js'
import type { TTabsContentProps } from '../types.js'
const panelTravel = 24

export const TabsContent = forwardRef<HTMLDivElement, TTabsContentProps>(function TabsContent(
  { className, value, ...props },
  ref,
) {
  const context = useContext(tabsPanelContext)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const animationToken = useRef(0)
  const animationControls = useRef<ReturnType<typeof animate> | null>(null)
  const isFirstRender = useRef(true)
  const reduceMotion = useReducedMotion()
  const active = context?.value === value
  const [exited, setIsExited] = useState(!active)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const panel = panelRef.current
    if (!context || !panel) {
      return
    }

    const tabValues = Array.from(
      panel
        .closest('.frontier-tabs')
        ?.querySelectorAll<HTMLElement>('[role="tab"][data-selector-value]') ?? [],
    ).map((tab) => tab.dataset.selectorValue)
    const forward =
      tabValues.indexOf(context.value ?? undefined) >
      tabValues.indexOf(context.previousValue.current ?? undefined)
    const property = context.orientation === 'vertical' ? 'y' : 'x'
    const travel = reduceMotion ? 0 : panelTravel
    const offset = (forward ? 1 : -1) * travel
    const token = ++animationToken.current
    animationControls.current?.stop()
    const options = {
      duration: reduceMotion ? 0 : durationBase,
      ease: easingStandard,
    }

    if (active) {
      setIsExited(false)
      animationControls.current = animate(
        panel,
        {
          opacity: exited ? [0, 1] : [null, 1],
          [property]: exited ? [offset, 0] : [null, 0],
        },
        options,
      )
      return
    }

    const controls = animate(panel, { opacity: 0, [property]: -offset }, options)
    animationControls.current = controls
    controls.then(
      () => {
        if (token === animationToken.current) {
          setIsExited(true)
        }
      },
      () => undefined,
    )
  }, [active])
  useEffect(
    () => () => {
      animationControls.current?.stop()
    },
    [],
  )

  return (
    <BaseTabs.Panel
      {...props}
      ref={(node) => {
        panelRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      keepMounted
      value={value}
      hidden={!active && exited}
      data-exiting={!active && !exited ? '' : undefined}
      className={['frontier-tabs__content', className].filter(Boolean).join(' ')}
    />
  )
})
