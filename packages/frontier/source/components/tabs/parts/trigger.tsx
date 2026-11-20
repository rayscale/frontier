import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { forwardRef, useContext } from 'react'

import { tabsHighlightContext } from '../context.js'
import type { TTabsTriggerProps } from '../types.js'

export const TabsTrigger = forwardRef<HTMLElement, TTabsTriggerProps>(function TabsTrigger(
  { children, className, type = 'button', ...props },
  ref,
) {
  const highlightedValue = useContext(tabsHighlightContext)
  const highlightedState = !props.disabled && highlightedValue === props.value

  return (
    <BaseTabs.Tab
      {...props}
      ref={ref}
      type={type}
      data-selector-value={props.value}
      data-highlighted={highlightedState || undefined}
      data-selector-item
      className={['frontier-tabs__trigger', className].filter(Boolean).join(' ')}
    >
      <span className="frontier-tabs__trigger-label">{children}</span>
    </BaseTabs.Tab>
  )
})
