import type { HTMLMotionProps } from 'motion/react'
import type { ComponentProps } from 'react'

import type { TButtonProps } from '../button/button.js'

import type { TFileUploadRejection } from './helpers/validation.js'

/** Presentation of the file upload. Behavior is identical across modes. */
export type TFileUploadMode = 'dropzone' | 'compact' | 'inline' | 'media'

/** Props for {@link FileUpload.Root}, in addition to native `div` attributes. */
export type TFileUploadRootProps = Omit<
  ComponentProps<'div'>,
  'defaultValue' | 'onChange' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'
> & {
  /** Presentation mode. Defaults to `dropzone`. */
  mode?: TFileUploadMode | undefined
  /** Accepted MIME types, wildcards (`image/*`), and extensions (`.pdf`). */
  accept?: string | undefined
  /** Allows selecting more than one file. Defaults to `false`. */
  multiple?: boolean | undefined
  /** Maximum number of files when `multiple` is set. */
  maxFiles?: number | undefined
  /** Minimum file size in bytes. */
  minFileSize?: number | undefined
  /** Maximum file size in bytes. */
  maxFileSize?: number | undefined
  /** Selected files for controlled usage. */
  value?: File[] | undefined
  /** Initially selected files for uncontrolled usage. */
  defaultValue?: File[] | undefined
  /** Called with the complete next selection whenever it changes. */
  onFilesChange?: ((files: File[]) => void) | undefined
  /** Called with the rejected files and their reasons after a selection attempt. */
  onFilesRejected?: ((rejections: TFileUploadRejection[]) => void) | undefined
  /** Prevents selection and removal. */
  disabled?: boolean | undefined
  /** Prevents selection and removal while keeping the files visible. */
  readOnly?: boolean | undefined
  /** Marks the native input as required. */
  required?: boolean | undefined
  /** Marks the component as invalid for styling. Pair with an error message. */
  invalid?: boolean | undefined
  /** Name of the native file input, used in form submission. */
  name?: string | undefined
  /** Id of the native file input. */
  id?: string | undefined
}

/** Props for {@link FileUpload.Dropzone}. */
export type TFileUploadDropzoneProps = Omit<ComponentProps<'div'>, 'onClick'>

/** Props for {@link FileUpload.Icon}. */
export type TFileUploadIconProps = ComponentProps<'span'>

/** Props for {@link FileUpload.Trigger}, in addition to Button props. */
export type TFileUploadTriggerProps = TButtonProps

/** Props for {@link FileUpload.List}, in addition to native `ul` attributes. */
export type TFileUploadListProps = ComponentProps<'ul'>

/** Props for {@link FileUpload.Item}. */
export type TFileUploadItemProps = HTMLMotionProps<'li'> & {
  /** The selected file this item displays. */
  file: File
}

/** Props for {@link FileUpload.Preview}. */
export type TFileUploadPreviewProps = ComponentProps<'span'>

/** Props for {@link FileUpload.Name}. */
export type TFileUploadNameProps = ComponentProps<'span'>

/** Props for {@link FileUpload.Size}. */
export type TFileUploadSizeProps = ComponentProps<'span'>

/** Props for {@link FileUpload.Remove}, in addition to Button props. */
export type TFileUploadRemoveProps = TButtonProps

/** Props for {@link FileUpload.Clear}, in addition to Button props. */
export type TFileUploadClearProps = TButtonProps

/** Props for {@link FileUpload.Rejections}, in addition to native `div` attributes. */
export type TFileUploadRejectionsProps = ComponentProps<'div'>
