import { Switch } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <Switch label="Sync" disabled />
      <Switch label="Backups" disabled defaultChecked />
    </>
  )
}
