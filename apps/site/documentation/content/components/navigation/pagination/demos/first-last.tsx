import { Pagination } from '@rayscale/frontier'
import { useState } from 'react'

export default function FirstLast() {
  const [page, setPage] = useState(8)

  return (
    <Pagination
      page={page}
      pageCount={20}
      onPageChange={setPage}
      showFirstLast
      aria-label="Results pages"
    />
  )
}
