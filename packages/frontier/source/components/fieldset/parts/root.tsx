import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TFieldsetLegendProps, TFieldsetRootProps } from '../types.js'

export const FieldsetRoot = forwardRef<HTMLFieldSetElement, TFieldsetRootProps>(
  function FieldsetRoot({ className, ...props }, ref) {
    return (
      <BaseFieldset.Root
        {...props}
        ref={ref}
        className={classNames('frontier-fieldset', className)}
      />
    )
  },
)

export const FieldsetLegend = forwardRef<HTMLLegendElement, TFieldsetLegendProps>(
  function FieldsetLegend({ className, ...props }, ref) {
    return (
      <legend {...props} ref={ref} className={classNames('frontier-fieldset__legend', className)} />
    )
  },
)
