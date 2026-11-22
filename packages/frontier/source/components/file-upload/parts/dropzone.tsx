import type { ComponentProps, MouseEvent, ReactElement } from 'react'

import { Paperclip, Upload } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { Button } from '../../button/button.js'
import { useFileUploadContext } from '../context.js'
import type {
  TFileUploadDropzoneProps,
  TFileUploadIconProps,
  TFileUploadTriggerProps,
} from '../types.js'

export function FileUploadDropzone({
  children,
  className,
  ...props
}: TFileUploadDropzoneProps): ReactElement {
  const { select, constraintSummary, openPicker } = useFileUploadContext()

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest('button, a, input, label')) {
      return
    }

    openPicker()
  }

  return (
    <div
      className={classNames('frontier-file-upload__dropzone', className)}
      onClick={select ? handleClick : undefined}
      {...props}
    >
      {children ?? (
        <>
          <FileUploadIcon />
          <FileUploadTitle>Drop files here</FileUploadTitle>
          {constraintSummary && <FileUploadDescription>{constraintSummary}</FileUploadDescription>}
          <FileUploadTrigger />
        </>
      )}
    </div>
  )
}

export function FileUploadIcon({
  children,
  className,
  ...props
}: TFileUploadIconProps): ReactElement {
  return (
    <span
      className={classNames('frontier-file-upload__icon', className)}
      {...props}
      aria-hidden="true"
    >
      {children ?? <Upload size={20} />}
    </span>
  )
}

export function FileUploadTitle({ className, ...props }: ComponentProps<'div'>): ReactElement {
  return <div className={classNames('frontier-file-upload__title', className)} {...props} />
}

export function FileUploadDescription({
  className,
  ...props
}: ComponentProps<'div'>): ReactElement {
  return <div className={classNames('frontier-file-upload__description', className)} {...props} />
}

export function FileUploadHelper({ className, ...props }: ComponentProps<'div'>): ReactElement {
  return <div className={classNames('frontier-file-upload__helper', className)} {...props} />
}

export function FileUploadTrigger({
  children,
  onClick,
  size,
  variant,
  ...props
}: TFileUploadTriggerProps): ReactElement {
  const { select, mode, openPicker } = useFileUploadContext()
  const inlineState = mode === 'inline'

  return (
    <Button
      type="button"
      className="frontier-file-upload__trigger"
      variant={variant ?? (inlineState ? 'ghost' : 'secondary')}
      size={size ?? (inlineState ? 'icon-small' : 'small')}
      disabled={!select}
      aria-label={inlineState && !children ? 'Attach files' : undefined}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          openPicker()
        }
      }}
      {...props}
    >
      {children ?? (inlineState ? <Paperclip size={16} aria-hidden="true" /> : 'Browse files')}
    </Button>
  )
}
