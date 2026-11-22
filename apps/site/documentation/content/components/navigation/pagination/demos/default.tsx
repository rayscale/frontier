import { Pagination } from '@rayscale/frontier'
import { useState } from 'react'

export default function Default() {
  const [page, setPage] = useState(5)

  return <Pagination page={page} pageCount={20} onPageChange={setPage} aria-label="Results pages" />
}
