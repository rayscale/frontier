import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { forwardRef } from 'react'

import type { TCollapsibleContentProps } from '../types.js'

export const CollapsibleContent = forwardRef<HTMLDivElement, TCollapsibleContentProps>(
  function CollapsibleContent({ className, children, ...props }, ref) {
    const classes = ['frontier-collapsible__content-inner', className].filter(Boolean).join(' ')

    return (
      <BaseCollapsible.Panel className="frontier-collapsible__content" keepMounted>
        <div {...props} ref={ref} className={classes}>
          {children}
        </div>
      </BaseCollapsible.Panel>
    )
  },
)
