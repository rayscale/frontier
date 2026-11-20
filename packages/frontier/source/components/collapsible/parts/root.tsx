import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { forwardRef } from 'react'

import type { TCollapsibleProps } from '../types.js'

export const CollapsibleRoot = forwardRef<HTMLDivElement, TCollapsibleProps>(
  function CollapsibleRoot(
    { className, open, defaultOpen, onOpenChange, disabled = false, ...props },
    ref,
  ) {
    const classes = ['frontier-collapsible', className].filter(Boolean).join(' ')

    return (
      <BaseCollapsible.Root
        {...props}
        ref={ref}
        className={classes}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
        disabled={disabled}
      />
    )
  },
)
