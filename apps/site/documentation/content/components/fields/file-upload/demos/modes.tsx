import { FileUpload } from '@rayscale/frontier'
import { useState } from 'react'

function Uploader({
  mode,
  multiple,
  accept,
  maxFiles,
  maxFileSize,
}: {
  mode: 'dropzone' | 'compact' | 'inline' | 'media'
  multiple?: boolean
  accept?: string
  maxFiles?: number
  maxFileSize?: number
}) {
  const [files, setFiles] = useState<File[]>([])

  return (
    <FileUpload
      mode={mode}
      multiple={multiple}
      accept={accept}
      maxFiles={maxFiles}
      maxFileSize={maxFileSize}
      value={files}
      onFilesChange={setFiles}
    >
      {mode === 'dropzone' || mode === 'media' ? <FileUpload.Dropzone /> : <FileUpload.Trigger />}
      <FileUpload.List>
        {files.map((file) => (
          <FileUpload.Item key={`${file.name}-${String(file.size)}`} file={file}>
            <FileUpload.Preview />
            <FileUpload.Name />
            <FileUpload.Size />
            <FileUpload.Remove />
          </FileUpload.Item>
        ))}
      </FileUpload.List>
      <FileUpload.Rejections />
      {multiple ? <FileUpload.Clear /> : null}
    </FileUpload>
  )
}

export default function Modes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-6)', width: '100%' }}>
      <Uploader mode="dropzone" multiple />
      <Uploader mode="compact" multiple />
      <Uploader mode="inline" multiple />
      <Uploader mode="media" multiple accept="image/*" />
    </div>
  )
}
