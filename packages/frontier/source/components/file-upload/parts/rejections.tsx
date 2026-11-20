import type { ReactElement } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useFileUploadContext } from '../context.js'
import {
  fileUploadRejectionMessages,
  getStableFileKey,
  type TFileUploadRejection,
} from '../helpers/validation.js'
import type { TFileUploadRejectionsProps } from '../types.js'

function describeRejections(rejections: TFileUploadRejection[]): string {
  const names = rejections.map((rejection) => rejection.file.name).join(', ')
  return `${String(rejections.length)} ${rejections.length === 1 ? 'file was' : 'files were'} rejected: ${names}`
}

export function FileUploadRejections({
  className,
  ...props
}: TFileUploadRejectionsProps): ReactElement {
  const { rejections } = useFileUploadContext()

  return (
    <div className={classNames('frontier-file-upload__rejections', className)} {...props}>
      <span className="frontier-file-upload__status" role="status">
        {rejections.length > 0 ? describeRejections(rejections) : ''}
      </span>
      {rejections.length > 0 && (
        <ul className="frontier-file-upload__rejection-list">
          {rejections.map((rejection, index) => (
            <li
              key={`${String(index)}-${getStableFileKey(rejection.file)}-${rejection.code}`}
              className="frontier-file-upload__rejection"
            >
              <span className="frontier-file-upload__name">{rejection.file.name}</span>
              <span className="frontier-file-upload__rejection-reason">
                {fileUploadRejectionMessages[rejection.code]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
