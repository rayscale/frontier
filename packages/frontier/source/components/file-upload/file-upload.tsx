import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  FileUploadDescription,
  FileUploadDropzone,
  FileUploadHelper,
  FileUploadSymbol,
  FileUploadTitle,
  FileUploadTrigger,
} from './parts/dropzone.js'
import {
  FileUploadClear,
  FileUploadItem,
  FileUploadList,
  FileUploadName,
  FileUploadPreview,
  FileUploadRemove,
  FileUploadSize,
} from './parts/list.js'
import { FileUploadRejections } from './parts/rejections.js'
import { FileUploadRoot } from './parts/root.js'
import type { TFileUploadRootProps } from './types.js'

import './file-upload.css'

export type { TFileUploadRejection, TFileUploadRejectionCode } from './helpers/validation.js'
export type {
  TFileUploadClearProps,
  TFileUploadDropzoneProps,
  TFileUploadItemProps,
  TFileUploadListProps,
  TFileUploadMode,
  TFileUploadNameProps,
  TFileUploadPreviewProps,
  TFileUploadRejectionsProps,
  TFileUploadRemoveProps,
  TFileUploadRootProps,
  TFileUploadSizeProps,
  TFileUploadSymbolProps,
  TFileUploadTriggerProps,
} from './types.js'

export interface TFileUploadComponent extends ForwardRefExoticComponent<
  TFileUploadRootProps & RefAttributes<HTMLDivElement>
> {
  /** Renders the drag-and-drop zone that accepts files. */
  Dropzone: typeof FileUploadDropzone
  /** Renders the leading symbol of a dropzone. */
  Symbol: typeof FileUploadSymbol
  /** Renders the title of a dropzone. */
  Title: typeof FileUploadTitle
  /** Renders the description of a dropzone. */
  Description: typeof FileUploadDescription
  /** Renders supplementary help text for the file upload. */
  Helper: typeof FileUploadHelper
  /** Renders a button that opens the file picker. */
  Trigger: typeof FileUploadTrigger
  /** Renders the list of selected files. */
  List: typeof FileUploadList
  /** Renders a single selected file. */
  Item: typeof FileUploadItem
  /** Renders a preview of a selected image or video file. */
  Preview: typeof FileUploadPreview
  /** Renders the name of a selected file. */
  Name: typeof FileUploadName
  /** Renders the size of a selected file. */
  Size: typeof FileUploadSize
  /** Renders a button that removes a single selected file. */
  Remove: typeof FileUploadRemove
  /** Renders a button that clears all selected files. */
  Clear: typeof FileUploadClear
  /** Renders the rejection messages after files are filtered. */
  Rejections: typeof FileUploadRejections
}

export const FileUpload: TFileUploadComponent = Object.assign(FileUploadRoot, {
  Dropzone: FileUploadDropzone,
  Symbol: FileUploadSymbol,
  Title: FileUploadTitle,
  Description: FileUploadDescription,
  Helper: FileUploadHelper,
  Trigger: FileUploadTrigger,
  List: FileUploadList,
  Item: FileUploadItem,
  Preview: FileUploadPreview,
  Name: FileUploadName,
  Size: FileUploadSize,
  Remove: FileUploadRemove,
  Clear: FileUploadClear,
  Rejections: FileUploadRejections,
})
