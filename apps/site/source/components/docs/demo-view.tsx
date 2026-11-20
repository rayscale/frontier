'use client'

import { Tabs } from '@rayscale/frontier'
import { lazy, type ReactElement, Suspense, useMemo } from 'react'

import { HighlightedCode } from './highlighted-code.js'

/** The tabs of a demo: the live example and its source. The example loads in the browser. */
export function DemoView({
  directory,
  file,
  name,
  source,
}: {
  directory: string
  file: string
  name: string
  source: string
}): ReactElement {
  const Example = useMemo(
    () => lazy(() => import(`../../../content/${directory}/demos/${file}`)),
    [directory, file],
  )

  return (
    <Tabs defaultValue="preview" className="docs-demo">
      <Tabs.List aria-label={`${name} example`}>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="preview">
        <div className="docs-demo__preview">
          <Suspense fallback={<p role="status">Loading example…</p>}>
            <Example />
          </Suspense>
        </div>
      </Tabs.Content>
      <Tabs.Content value="code">
        <HighlightedCode code={source} language="tsx" title={`${name}.tsx`} />
      </Tabs.Content>
    </Tabs>
  )
}
