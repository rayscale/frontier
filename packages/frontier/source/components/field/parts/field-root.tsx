import { forwardRef, useId } from 'react'

import { fieldContext } from '../context.js'
import type { TFieldRootProps } from '../types.js'

export const FieldRoot = forwardRef<HTMLDivElement, TFieldRootProps>(
  function FieldRoot(props, ref) {
    const {
      children,
      className,
      disabled = false,
      id,
      invalid = false,
      required = false,
      ...rest
    } = props

    const generatedId = useId()
    const descriptionId = useId()
    const errorId = useId()
    const controlId = id ?? generatedId
    const classes = ['frontier-field', className].filter(Boolean).join(' ')
    const context = {
      controlId,
      descriptionId,
      disabled,
      errorId,
      invalid,
      required,
    }

    return (
      <fieldContext.Provider value={context}>
        <div
          {...rest}
          ref={ref}
          className={classes}
          data-disabled={disabled ? true : undefined}
          data-invalid={invalid ? true : undefined}
        >
          {children}
        </div>
      </fieldContext.Provider>
    )
  },
)
