import { Select as BaseSelect } from '@base-ui/react/select'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { FloatingPopup } from '../../../internal/primitives/floating-popup/floating-popup.js'
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
    <FloatingPopup
      Portal={BaseSelect.Portal}
      Positioner={BaseSelect.Positioner}
      Popup={BaseSelect.Popup}
      placement={{ side, align, sideOffset, alignOffset }}
      positionerClassName="frontier-select__positioner"
      positionerProps={{ alignItemWithTrigger: false }}
      popupProps={{
        ...props,
        ref,
        className: classNames(
          'frontier-select__popup frontier-option-popup frontier-floating-surface',
          className,
        ),
        onKeyDownCapture: (event) => {
          focusLastEnabledOptionOnEnd(event)
          onKeyDownCapture?.(event)
        },
        children: (
          <>
            <AnimatedHighlight />
            {children}
          </>
        ),
      }}
    />
  )
})

export const SelectList = forwardRef<HTMLDivElement, TSelectListProps>(function SelectList(
  { className, ...props },
  ref,
) {
  return (
    <BaseSelect.List
      ref={ref}
      className={classNames('frontier-select__list frontier-option-list', className)}
      {...props}
    />
  )
})
