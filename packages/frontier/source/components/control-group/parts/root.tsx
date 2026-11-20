import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { controlGroupOrientationContext } from '../context.js'
import type { TControlGroupProps } from '../types.js'

export const ControlGroupRoot = forwardRef<HTMLDivElement, TControlGroupProps>(
  function ControlGroupRoot({ orientation = 'horizontal', className, ...props }, ref) {
    return (
      <controlGroupOrientationContext.Provider value={orientation}>
        <div
          {...props}
          ref={ref}
          role="group"
          data-orientation={orientation}
          className={classNames('frontier-control-group', className)}
        />
      </controlGroupOrientationContext.Provider>
    )
  },
)
