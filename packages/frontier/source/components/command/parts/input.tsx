import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { forwardRef } from 'react'

import { Search } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { Input } from '../../input/input.js'
import type { TCommandInputProps } from '../types.js'

export const CommandInput = forwardRef<HTMLInputElement, TCommandInputProps>(function CommandInput(
  { className, ...props },
  ref,
) {
  return (
    <div className={classNames('frontier-command__input', className)}>
      <BaseAutocomplete.Input
        ref={ref}
        aria-label="Search commands"
        placeholder="Search commands"
        render={<Input leadingIcon={<Search size={16} aria-hidden="true" />} />}
        {...props}
      />
    </div>
  )
})
