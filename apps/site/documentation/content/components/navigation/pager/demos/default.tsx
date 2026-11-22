import { Pager } from '@rayscale/frontier'

export default function Default() {
  return (
    <Pager
      previous={{ href: '#', label: 'Installation' }}
      next={{ href: '#', label: 'Components' }}
    />
  )
}
