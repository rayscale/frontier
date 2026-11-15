import { forwardRef } from 'react'

import { Label } from '../../label/index.js'
import { useFieldContext } from '../context.js'
import type { TFieldLabelProps } from '../types.js'

export const FieldLabel = forwardRef<HTMLLabelElement, TFieldLabelProps>(
  function FieldLabel(props, ref) {
    const field = useFieldContext()
    const { children, className, htmlFor, ...rest } = props
    const classes = ['frontier-field__label', className].filter(Boolean).join(' ')

    return (
      <Label {...rest} ref={ref} htmlFor={field?.controlId ?? htmlFor} className={classes}>
        {children}
        {field?.required ? (
          <span className="frontier-field__required" aria-hidden="true">
            Required
          </span>
        ) : null}
      </Label>
    )
  },
)
