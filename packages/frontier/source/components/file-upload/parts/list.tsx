import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ElementType, ReactElement } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AutoSize } from '../../../internal/primitives/auto-size/auto-size.js'
import { durationBase, easingStandard } from '../../../styles/motion.js'
import {
  FileAudio,
  FileImage,
  File as FileSymbol,
  FileText,
  FileVideo,
  Plus,
  X,
} from '../../../symbols/index.js'
import { Button } from '../../button/button.js'
import { fileItemContext, useFileItem, useFileUploadContext } from '../context.js'
import { formatFileSize } from '../helpers/validation.js'
import { useObjectUrl } from '../hooks/use-object-url.js'
import type {
  TFileUploadClearProps,
  TFileUploadItemProps,
  TFileUploadListProps,
  TFileUploadNameProps,
  TFileUploadPreviewProps,
  TFileUploadRemoveProps,
  TFileUploadSizeProps,
} from '../types.js'

export function FileUploadList({
  children,
  className,
  ...props
}: TFileUploadListProps): ReactElement {
  const { select, files, full, multiple, mode, openPicker } = useFileUploadContext()
  const showAddTile = mode === 'media' && select && !(multiple && full)
  let addLabel = 'Add file'

  if (multiple) {
    addLabel = 'Add files'
  } else if (files.length > 0) {
    addLabel = 'Replace file'
  }

  return (
    <AutoSize axis="vertical" className="frontier-file-upload__list-container">
      <ul className={classNames('frontier-file-upload__list', className)} {...props}>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
        {showAddTile && (
          <li className="frontier-file-upload__add-item">
            <button
              type="button"
              className="frontier-file-upload__add"
              aria-label={addLabel}
              onClick={openPicker}
            >
              <Plus size={22} aria-hidden="true" />
            </button>
          </li>
        )}
      </ul>
    </AutoSize>
  )
}

export function FileUploadItem({
  children,
  className,
  file,
  ...props
}: TFileUploadItemProps): ReactElement {
  const reduceMotion = useReducedMotion()

  return (
    <fileItemContext.Provider value={file}>
      <motion.li
        className={classNames('frontier-file-upload__item', className)}
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: durationBase, ease: easingStandard }
        }
        {...props}
      >
        {children ?? (
          <>
            <FileUploadPreview />
            <FileUploadName />
            <FileUploadSize />
            <FileUploadRemove />
          </>
        )}
      </motion.li>
    </fileItemContext.Provider>
  )
}

function getFileSymbol(file: File): ElementType {
  if (file.type.startsWith('image/')) {
    return FileImage
  }

  if (file.type.startsWith('video/')) {
    return FileVideo
  }

  if (file.type.startsWith('audio/')) {
    return FileAudio
  }

  if (file.type.startsWith('text/') || file.type === 'application/pdf') {
    return FileText
  }

  return FileSymbol
}

export function FileUploadPreview({ className, ...props }: TFileUploadPreviewProps): ReactElement {
  const file = useFileItem()
  const imageState = file.type.startsWith('image/')
  const imageUrl = useObjectUrl(imageState ? file : null)
  const Symbol = getFileSymbol(file)

  return (
    <span
      className={classNames('frontier-file-upload__preview', className)}
      {...props}
      aria-hidden="true"
    >
      {imageUrl ? (
        <img className="frontier-file-upload__image" src={imageUrl} alt="" />
      ) : (
        <Symbol size={18} aria-hidden="true" />
      )}
    </span>
  )
}

export function FileUploadName({
  className,
  children,
  ...props
}: TFileUploadNameProps): ReactElement {
  const file = useFileItem()

  return (
    <span
      className={classNames('frontier-file-upload__name', className)}
      title={file.name}
      {...props}
    >
      {children ?? file.name}
    </span>
  )
}

export function FileUploadSize({
  className,
  children,
  ...props
}: TFileUploadSizeProps): ReactElement {
  const file = useFileItem()

  return (
    <span className={classNames('frontier-file-upload__size', className)} {...props}>
      {children ?? formatFileSize(file.size)}
    </span>
  )
}

export function FileUploadRemove({
  children,
  className,
  onClick,
  ...props
}: TFileUploadRemoveProps): ReactElement {
  const file = useFileItem()
  const { select, removeFile } = useFileUploadContext()

  return (
    <Button
      type="button"
      variant="ghost"
      size="symbol-small"
      className={classNames('frontier-file-upload__remove', className)}
      aria-label={`Remove ${file.name}`}
      disabled={!select}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          removeFile(file)
        }
      }}
      {...props}
    >
      {children ?? <X size={16} aria-hidden="true" />}
    </Button>
  )
}

export function FileUploadClear({
  children,
  className,
  onClick,
  ...props
}: TFileUploadClearProps): ReactElement {
  const { select, clearFiles, files } = useFileUploadContext()

  return (
    <Button
      type="button"
      variant="ghost"
      size="small"
      className={classNames('frontier-file-upload__clear', className)}
      disabled={!select || files.length === 0}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          clearFiles()
        }
      }}
      {...props}
    >
      {children ?? 'Clear all'}
    </Button>
  )
}
