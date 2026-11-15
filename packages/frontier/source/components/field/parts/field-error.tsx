import { forwardRef, useEffect, useId } from 'react'

import { useFieldContext } from '../context.js'
import type { TFieldErrorProps } from '../types.js'

export const FieldError = forwardRef<HTMLSpanElement, TFieldErrorProps>(
  function FieldError(props, ref) {
    const field = useFieldContext()
    const generatedId = useId()
    const { className, id, ...rest } = props
    const errorId = id ?? generatedId
    const register = field?.registerError
    const classes = ['frontier-field__error', className].filter(Boolean).join(' ')

    useEffect(() => {
      register?.(errorId)

      return () => {
        register?.(undefined)
      }
    }, [errorId, register])

    return <span {...rest} ref={ref} id={errorId} role="alert" className={classes} />
  },
)
