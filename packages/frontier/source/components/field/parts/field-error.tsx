import { forwardRef, useId } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useFieldContext } from '../context.js'
import type { TFieldErrorProps } from '../types.js'

export const FieldError = forwardRef<HTMLSpanElement, TFieldErrorProps>(
  function FieldError(props, ref) {
    const field = useFieldContext()
    const generatedId = useId()
    const { className, id, ...rest } = props
    const errorId = field?.errorId ?? id ?? generatedId
    const classes = classNames('frontier-field__error', className)

    return <span {...rest} ref={ref} id={errorId} role="alert" className={classes} />
  },
)
