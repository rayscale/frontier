import { forwardRef, useId } from 'react'

import { useFieldContext } from '../context.js'
import type { TFieldDescriptionProps } from '../types.js'

export const FieldDescription = forwardRef<HTMLSpanElement, TFieldDescriptionProps>(
  function FieldDescription(props, ref) {
    const field = useFieldContext()
    const generatedId = useId()
    const { className, id, ...rest } = props
    const descriptionId = field?.descriptionId ?? id ?? generatedId
    const classes = ['frontier-field__description', className].filter(Boolean).join(' ')

    return <span {...rest} ref={ref} id={descriptionId} className={classes} />
  },
)
