import { Pagination } from '@rayscale/frontier'
import { useState } from 'react'

export default function Small() {
  const [page, setPage] = useState(2)

  return (
    <Pagination
      page={page}
      pageCount={6}
      onPageChange={setPage}
      size="small"
      aria-label="Results pages"
    />
  )
}
