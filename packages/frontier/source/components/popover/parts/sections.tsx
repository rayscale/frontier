import { Popover as BasePopover } from '@base-ui/react/popover'
import type { ReactElement } from 'react'

import type { TPopoverDescriptionProps, TPopoverHeaderProps, TPopoverTitleProps } from '../types.js'

export function PopoverHeader({ className, ...props }: TPopoverHeaderProps): ReactElement {
  return (
    <div {...props} className={['frontier-popover__header', className].filter(Boolean).join(' ')} />
  )
}

export function PopoverTitle({ className, ...props }: TPopoverTitleProps): ReactElement {
  return (
    <BasePopover.Title
      {...props}
      className={['frontier-popover__title', className].filter(Boolean).join(' ')}
    />
  )
}

export function PopoverDescription({
  className,
  ...props
}: TPopoverDescriptionProps): ReactElement {
  return (
    <BasePopover.Description
      {...props}
      className={['frontier-popover__description', className].filter(Boolean).join(' ')}
    />
  )
}
