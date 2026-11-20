import { Select as BaseSelect } from '@base-ui/react/select'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { focusLastEnabledOptionOnEnd } from '../helpers/keyboard.js'
import type { TSelectContentProps, TSelectListProps } from '../types.js'

export const SelectContent = forwardRef<HTMLDivElement, TSelectContentProps>(function SelectContent(
  {
    side = 'bottom',
    align = 'start',
    sideOffset = 4,
    alignOffset,
    className,
    children,
    onKeyDownCapture,
    ...props
  },
  ref,
) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        alignItemWithTrigger={false}
        className="frontier-select__positioner"
      >
        <BaseSelect.Popup
          ref={ref}
          className={classNames('frontier-select__popup frontier-floating-surface', className)}
          onKeyDownCapture={(event) => {
            focusLastEnabledOptionOnEnd(event)
            onKeyDownCapture?.(event)
          }}
          {...props}
        >
          <AnimatedHighlight />
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
})

export const SelectList = forwardRef<HTMLDivElement, TSelectListProps>(function SelectList(
  { className, ...props },
  ref,
) {
  return (
    <BaseSelect.List
      ref={ref}
      className={classNames('frontier-select__list', className)}
      {...props}
    />
  )
})
