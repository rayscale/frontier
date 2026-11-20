import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TCommandEmptyProps,
  TCommandGroupLabelProps,
  TCommandGroupProps,
  TCommandSeparatorProps,
} from '../types.js'

export const CommandEmpty = forwardRef<HTMLDivElement, TCommandEmptyProps>(function CommandEmpty(
  { className, children = 'No results found', ...props },
  ref,
) {
  return (
    <BaseAutocomplete.Empty
      ref={ref}
      className={classNames('frontier-command__empty', className)}
      {...props}
    >
      {children}
    </BaseAutocomplete.Empty>
  )
})

export const CommandGroupPart = forwardRef<HTMLDivElement, TCommandGroupProps>(
  function CommandGroupPart({ className, ...props }, ref) {
    return (
      <BaseAutocomplete.Group
        ref={ref}
        className={classNames('frontier-command__group', className)}
        {...props}
      />
    )
  },
)

export const CommandGroupLabel = forwardRef<HTMLDivElement, TCommandGroupLabelProps>(
  function CommandGroupLabel({ className, ...props }, ref) {
    return (
      <BaseAutocomplete.GroupLabel
        ref={ref}
        className={classNames('frontier-command__group-label', className)}
        {...props}
      />
    )
  },
)

export const CommandSeparator = forwardRef<HTMLDivElement, TCommandSeparatorProps>(
  function CommandSeparator({ className, ...props }, ref) {
    return (
      <BaseAutocomplete.Separator
        ref={ref}
        className={classNames('frontier-command__separator', className)}
        {...props}
      />
    )
  },
)
