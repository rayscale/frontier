import { forwardRef, useId } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useFieldContext } from '../context.js'
import type { TFieldDescriptionProps } from '../types.js'

export const FieldDescription = forwardRef<HTMLSpanElement, TFieldDescriptionProps>(
  function FieldDescription(props, ref) {
    const field = useFieldContext()
    const generatedId = useId()
    const { className, id, ...rest } = props
    const descriptionId = field?.descriptionId ?? id ?? generatedId
    const classes = classNames('frontier-field__description', className)

    return <span {...rest} ref={ref} id={descriptionId} className={classes} />
  },
)
