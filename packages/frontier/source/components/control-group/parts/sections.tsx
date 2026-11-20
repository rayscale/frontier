import { cloneElement, type ReactElement } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { omitUndefined } from '../../../internal/helpers/omit-undefined.js'
import { Separator } from '../../separator/separator.js'
import { useControlGroupOrientation } from '../context.js'
import type { TControlGroupSeparatorProps, TControlGroupTextProps } from '../types.js'

export function ControlGroupSeparator({
  className,
  orientation,
  ...props
}: TControlGroupSeparatorProps): ReactElement {
  const groupOrientation = useControlGroupOrientation()
  const resolvedOrientation =
    orientation ?? (groupOrientation === 'vertical' ? 'horizontal' : 'vertical')

  return (
    <Separator {...props} orientation={resolvedOrientation} {...omitUndefined({ className })} />
  )
}

export function ControlGroupText({
  children,
  className,
  render,
  ...props
}: TControlGroupTextProps): ReactElement {
  const classes = classNames('frontier-control-group__text', className)

  if (render) {
    return cloneElement(render, {
      ...props,
      className: classNames(render.props.className, classes),
      children,
    })
  }

  return (
    <span {...props} className={classes}>
      {children}
    </span>
  )
}
