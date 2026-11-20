import { Tabs } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { HighlightedCode } from './docs-code-block.js'

interface TPackageManagerTabsProps {
  pnpm: string
  npm: string
  yarn: string
  bun: string
}

const managers = ['pnpm', 'npm', 'yarn', 'bun'] as const

/** A command shown for each package manager. */
export function PackageManagerTabs(props: TPackageManagerTabsProps): ReactElement {
  return (
    <Tabs defaultValue="pnpm" className="docs-package-manager-tabs">
      <Tabs.List aria-label="Package manager">
        {managers.map((manager) => (
          <Tabs.Trigger key={manager} value={manager}>
            {manager}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {managers.map((manager) => (
        <Tabs.Content key={manager} value={manager}>
          <HighlightedCode code={props[manager]} language="bash" />
        </Tabs.Content>
      ))}
    </Tabs>
  )
}
