import { forwardRef, useId, useState } from 'react'

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
    const [descriptionId, setDescriptionId] = useState<string>()
    const [errorId, setErrorId] = useState<string>()
    const controlId = id ?? generatedId
    const invalidValue = invalid || Boolean(errorId)
    const classes = ['frontier-field', className].filter(Boolean).join(' ')
    const context = {
      controlId,
      descriptionId,
      disabled,
      errorId,
      invalid: invalidValue,
      registerDescription: setDescriptionId,
      registerError: setErrorId,
      required,
    }

    return (
      <fieldContext.Provider value={context}>
        <div
          {...rest}
          ref={ref}
          className={classes}
          data-disabled={disabled ? true : undefined}
          data-invalid={invalidValue ? true : undefined}
        >
          {children}
        </div>
      </fieldContext.Provider>
    )
  },
)
