import { forwardRef, useEffect, useId } from 'react'

import { useFieldContext } from '../context.js'
import type { TFieldDescriptionProps } from '../types.js'

export const FieldDescription = forwardRef<HTMLSpanElement, TFieldDescriptionProps>(
  function FieldDescription(props, ref) {
    const field = useFieldContext()
    const generatedId = useId()
    const { className, id, ...rest } = props
    const descriptionId = id ?? generatedId
    const register = field?.registerDescription
    const classes = ['frontier-field__description', className].filter(Boolean).join(' ')

    useEffect(() => {
      register?.(descriptionId)

      return () => {
        register?.(undefined)
      }
    }, [descriptionId, register])

    return <span {...rest} ref={ref} id={descriptionId} className={classes} />
  },
)
