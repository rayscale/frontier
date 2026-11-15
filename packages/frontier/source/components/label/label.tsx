import { forwardRef } from 'react'

import type { TLabelProps } from './types.js'

import './label.css'

export const Label = forwardRef<HTMLLabelElement, TLabelProps>(function Label(props, ref) {
  const { className, ...rest } = props
  const classes = ['frontier-label', className].filter(Boolean).join(' ')

  return <label {...rest} ref={ref} className={classes} />
})
