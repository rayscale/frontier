import { Pager } from '@rayscale/frontier'

export default function Labels() {
  return (
    <Pager
      label="Guide pages"
      previousLabel="Back"
      nextLabel="Continue"
      previous={{ href: '#', label: 'Getting started' }}
      next={{ href: '#', label: 'Your first component' }}
    />
  )
}
