import { createContext, type RefObject, useContext } from 'react'

import type { TFileUploadRejection } from './helpers/validation.js'
import type { TFileUploadMode } from './types.js'

export interface TFileUploadContextValue {
  mode: TFileUploadMode
  multiple: boolean
  select: boolean
  disabled: boolean
  readOnly: boolean
  invalid: boolean
  files: File[]
  rejections: TFileUploadRejection[]
  dragging: boolean
  dragRejected: boolean
  full: boolean
  constraintSummary: string
  inputRef: RefObject<HTMLInputElement | null>
  openPicker: () => void
  removeFile: (file: File) => void
  clearFiles: () => void
  accept?: string | undefined
}

export const fileUploadContext = createContext<TFileUploadContextValue | null>(null)

export const fileItemContext = createContext<File | null>(null)

export function useFileUploadContext(): TFileUploadContextValue {
  const context = useContext(fileUploadContext)
  if (!context) {
    throw new Error('FileUpload parts must be rendered inside FileUpload.Root.')
  }

  return context
}

export function useFileItem(): File {
  const file = useContext(fileItemContext)
  if (!file) {
    throw new Error('FileUpload item parts must be rendered inside FileUpload.Item.')
  }

  return file
}
