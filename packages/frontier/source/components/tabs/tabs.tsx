import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { forwardRef, useLayoutEffect, useRef, useState } from 'react'

import { AutoSize } from '../../internal/primitives/auto-size/auto-size.js'

import { tabsPanelContext } from './context.js'
import { TabsContent } from './parts/content.js'
import { TabsList } from './parts/list.js'
import { TabsTrigger } from './parts/trigger.js'
import type { TTabsProps } from './types.js'

import './tabs.css'

export type {
  TTabsContentProps,
  TTabsListProps,
  TTabsOrientation,
  TTabsProps,
  TTabsTriggerProps,
} from './types.js'

const TabsRoot = forwardRef<HTMLDivElement, TTabsProps>(function Tabs(
  { children, className, defaultValue, onValueChange, orientation = 'horizontal', value, ...props },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? null)
  const selectedValue = value === undefined ? uncontrolledValue : value
  const previousValue = useRef(selectedValue)
  useLayoutEffect(() => {
    previousValue.current = selectedValue
  }, [selectedValue])

  return (
    <tabsPanelContext.Provider value={{ orientation, previousValue, value: selectedValue }}>
      <BaseTabs.Root
        {...props}
        ref={ref}
        className={['frontier-tabs', className].filter(Boolean).join(' ')}
        orientation={orientation}
        data-orientation={orientation}
        defaultValue={defaultValue}
        value={value}
        onValueChange={(nextValue: string | null) => {
          setUncontrolledValue(nextValue)
          onValueChange?.(nextValue)
        }}
      >
        <AutoSize axis="vertical" className="frontier-tabs__container">
          {children}
        </AutoSize>
      </BaseTabs.Root>
    </tabsPanelContext.Provider>
  )
})

/**
 * Compound tabs with automatic keyboard activation. Inactive content panels
 * remain mounted but hidden, preserving their state between tab changes.
 */
export interface TTabsComponent extends ForwardRefExoticComponent<
  TTabsProps & RefAttributes<HTMLDivElement>
> {
  /** Renders the list of tab triggers. */
  List: typeof TabsList
  /** Renders a button that activates its corresponding tab panel. */
  Trigger: typeof TabsTrigger
  /** Renders the content panel associated with a tab. */
  Content: typeof TabsContent
}

export const Tabs: TTabsComponent = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})
