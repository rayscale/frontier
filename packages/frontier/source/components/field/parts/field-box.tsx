import { forwardRef } from 'react'

import { useFieldContext } from '../context.js'
import type { TFieldBoxProps } from '../types.js'

export const FieldBox = forwardRef<HTMLSpanElement, TFieldBoxProps>(function FieldBox(props, ref) {
  const field = useFieldContext()
  const { className, ...rest } = props
  const classes = ['frontier-field__box', className].filter(Boolean).join(' ')

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
