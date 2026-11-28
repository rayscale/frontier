import { forwardRef, useState } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { stepperContext } from '../context.js'
import type { TStepperRootProps } from '../types.js'

export const StepperRoot = forwardRef<HTMLDivElement, TStepperRootProps>(function StepperRoot(
  {
    className,
    completedLabel = 'Completed',
    defaultValue = 1,
    onValueChange,
    orientation = 'horizontal',
    value,
    ...props
  },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const current = value ?? uncontrolledValue

  function select(next: number) {
    if (value === undefined) {
      setUncontrolledValue(next)
    }

    onValueChange?.(next)
  }

  return (
    <stepperContext.Provider
      value={{
        completedLabel,
        current,
        interactive: onValueChange !== undefined,
        orientation,
        select,
      }}
    >
      <div
        {...props}
        ref={ref}
        data-orientation={orientation}
        className={classNames('frontier-stepper', className)}
      />
    </stepperContext.Provider>
  )
})
