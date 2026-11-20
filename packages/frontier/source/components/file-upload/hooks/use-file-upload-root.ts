import { type ChangeEvent, type DragEvent, useRef, useState } from 'react'

import type { TFileUploadContextValue } from '../context.js'
import { hasFileData } from '../helpers/drop.js'
import {
  describeFileConstraints,
  mightAcceptDraggedType,
  resolveFileSelection,
  type TFileUploadRejection,
} from '../helpers/validation.js'
import type { TFileUploadMode } from '../types.js'

import { useStrayFileDropGuard } from './use-stray-file-drop-guard.js'

interface TUseFileUploadRootOptions {
  accept: string | undefined
  defaultValue: File[] | undefined
  disabled: boolean
  invalid: boolean
  maxFileSize: number | undefined
  maxFiles: number | undefined
  minFileSize: number | undefined
  mode: TFileUploadMode
  multiple: boolean
  onFilesChange: ((files: File[]) => void) | undefined
  onFilesRejected: ((rejections: TFileUploadRejection[]) => void) | undefined
  readOnly: boolean
  value: File[] | undefined
}

type TFileUploadRootResult = TFileUploadContextValue & {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDragEnter: (event: DragEvent<HTMLDivElement>) => void
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void
  handleDragLeave: (event: DragEvent<HTMLDivElement>) => void
  handleDrop: (event: DragEvent<HTMLDivElement>) => void
}

export function useFileUploadRoot({
  accept,
  defaultValue,
  disabled,
  invalid,
  maxFileSize,
  maxFiles,
  minFileSize,
  mode,
  multiple,
  onFilesChange,
  onFilesRejected,
  readOnly,
  value,
}: TUseFileUploadRootOptions): TFileUploadRootResult {
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue ?? [])
  const [rejections, setRejections] = useState<TFileUploadRejection[]>([])
  const [dragging, setIsDragging] = useState(false)
  const [dragRejected, setIsDragRejected] = useState(false)
  const dragDepth = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useStrayFileDropGuard()

  const controlled = value !== undefined
  const files = value ?? internalFiles
  const select = !disabled && !readOnly
  const full = multiple && maxFiles !== undefined && files.length >= maxFiles
  const constraintSummary = describeFileConstraints({
    accept,
    maxFileSize,
    maxFiles,
    multiple,
  })

  const commitFiles = (next: File[]) => {
    const unchanged =
      next.length === files.length && next.every((file, index) => file === files[index])
    if (unchanged) {
      return
    }

    if (!controlled) {
      setInternalFiles(next)
    }

    onFilesChange?.(next)
  }

  const addFiles = (incoming: File[]) => {
    if (!select || incoming.length === 0) {
      return
    }

    const result = resolveFileSelection(files, incoming, {
      accept,
      maxFileSize,
      maxFiles,
      minFileSize,
      multiple,
    })
    setRejections(result.rejections)
    if (result.rejections.length > 0) {
      onFilesRejected?.(result.rejections)
    }

    commitFiles(result.files)
  }

  const removeFile = (file: File) => {
    if (!select) {
      return
    }

    commitFiles(files.filter((current) => current !== file))
  }

  const clearFiles = () => {
    if (!select) {
      return
    }

    setRejections([])
    commitFiles([])
  }

  const openPicker = () => {
    if (select) {
      inputRef.current?.click()
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.currentTarget.files ?? [])
    event.currentTarget.value = ''
    addFiles(selected)
  }

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (!select || !hasFileData(event.dataTransfer)) {
      return
    }

    event.preventDefault()
    dragDepth.current += 1
    setIsDragging(true)
    const items = Array.from(event.dataTransfer.items).filter((item) => item.kind === 'file')
    setIsDragRejected(
      items.length > 0 && !items.some((item) => mightAcceptDraggedType(item.type, accept)),
    )
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!select || !hasFileData(event.dataTransfer)) {
      return
    }

    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  const resetDragState = () => {
    dragDepth.current = 0
    setIsDragging(false)
    setIsDragRejected(false)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!hasFileData(event.dataTransfer)) {
      return
    }

    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) {
      setIsDragging(false)
      setIsDragRejected(false)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!select || !hasFileData(event.dataTransfer)) {
      return
    }

    event.preventDefault()
    resetDragState()
    addFiles(Array.from(event.dataTransfer.files))
  }

  return {
    mode,
    accept,
    multiple,
    select,
    disabled,
    readOnly,
    invalid,
    files,
    rejections,
    dragging,
    dragRejected,
    full,
    constraintSummary,
    inputRef,
    openPicker,
    removeFile,
    clearFiles,
    handleInputChange,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
