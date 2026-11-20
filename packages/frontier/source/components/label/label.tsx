import { forwardRef } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'

import type { TLabelProps } from './types.js'

import './label.css'

export const Label = forwardRef<HTMLLabelElement, TLabelProps>(function Label(props, ref) {
  const { className, ...rest } = props
  const classes = classNames('frontier-label', className)

  return <label {...rest} ref={ref} className={classes} />
})
