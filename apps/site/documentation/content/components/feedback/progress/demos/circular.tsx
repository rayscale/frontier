import { Progress } from '@rayscale/frontier'

export default function Circular() {
  return (
    <>
      <Progress variant="circular" size="small" value={30} aria-label="Small" />
      <Progress variant="circular" size="medium" value={60} aria-label="Medium" />
      <Progress variant="circular" size="large" value={90} aria-label="Large" />
    </>
  )
}
