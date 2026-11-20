import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useFieldContext } from '../context.js'
import type { TFieldBoxProps } from '../types.js'

export const FieldBox = forwardRef<HTMLSpanElement, TFieldBoxProps>(function FieldBox(props, ref) {
  const field = useFieldContext()
  const { className, ...rest } = props
  const classes = classNames('frontier-field__box', className)

  return (
    <span
      {...rest}
      ref={ref}
      className={classes}
      data-disabled={field?.disabled ? true : undefined}
      data-invalid={field?.invalid ? true : undefined}
    />
  )
})
