import { Field as BaseField } from '@base-ui/react/field'
import type { ReactElement } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TFieldBoxProps,
  TFieldControlProps,
  TFieldDescriptionProps,
  TFieldErrorProps,
  TFieldLabelProps,
  TFieldRootProps,
} from '../types.js'

export function FieldRoot({ className, ...props }: TFieldRootProps): ReactElement {
  return <BaseField.Root {...props} className={classNames('frontier-field', className)} />
}

export function FieldLabel({ className, ...props }: TFieldLabelProps): ReactElement {
  return <BaseField.Label {...props} className={classNames('frontier-field__label', className)} />
}

export function FieldControl({ className, ...props }: TFieldControlProps): ReactElement {
  return (
    <BaseField.Control {...props} className={classNames('frontier-field__control', className)} />
  )
}

export function FieldDescription({ className, ...props }: TFieldDescriptionProps): ReactElement {
  return (
    <BaseField.Description
      {...props}
      className={classNames('frontier-field__description', className)}
    />
  )
}

export function FieldError({ className, ...props }: TFieldErrorProps): ReactElement {
  return <BaseField.Error {...props} className={classNames('frontier-field__error', className)} />
}

export function FieldBox({ className, ...props }: TFieldBoxProps): ReactElement {
  return <span {...props} className={classNames('frontier-field__box', className)} />
}
