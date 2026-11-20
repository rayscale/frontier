import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { forwardRef } from 'react'

import type { TCollapsibleTriggerProps } from '../types.js'

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, TCollapsibleTriggerProps>(
  function CollapsibleTrigger({ className, type = 'button', ...props }, ref) {
    const classes = ['frontier-collapsible__trigger', className].filter(Boolean).join(' ')

    return <BaseCollapsible.Trigger {...props} ref={ref} type={type} className={classes} />
  },
)
