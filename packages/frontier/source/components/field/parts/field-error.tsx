import { forwardRef, useId } from 'react'

import { useFieldContext } from '../context.js'
import type { TFieldErrorProps } from '../types.js'

export const FieldError = forwardRef<HTMLSpanElement, TFieldErrorProps>(
  function FieldError(props, ref) {
    const field = useFieldContext()
    const generatedId = useId()
    const { className, id, ...rest } = props
    const errorId = field?.errorId ?? id ?? generatedId
    const classes = ['frontier-field__error', className].filter(Boolean).join(' ')

    return <span {...rest} ref={ref} id={errorId} role="alert" className={classes} />
  },
)
