import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TFieldIconProps } from '../types.js'

export const FieldIcon = forwardRef<HTMLSpanElement, TFieldIconProps>(
  function FieldIcon(props, ref) {
    const { className, interactive = false, ...rest } = props

    return (
      <span
        {...rest}
        ref={ref}
        className={classNames('frontier-field__icon', className)}
        aria-hidden={interactive ? undefined : true}
      />
    )
  },
)
