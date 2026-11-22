import { Progress } from '@rayscale/frontier'

export default function Default() {
  return (
    <div style={{ width: '100%' }}>
      <Progress value={60} aria-label="Upload progress" />
    </div>
  )
}
