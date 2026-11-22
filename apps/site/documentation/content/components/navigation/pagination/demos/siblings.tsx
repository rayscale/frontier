import { Pagination } from '@rayscale/frontier'
import { useState } from 'react'

export default function Siblings() {
  const [page, setPage] = useState(10)

  return (
    <Pagination
      page={page}
      pageCount={30}
      onPageChange={setPage}
      siblingCount={2}
      aria-label="Results pages"
    />
  )
}
