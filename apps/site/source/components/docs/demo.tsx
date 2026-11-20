import { Tabs } from '@rayscale/frontier'
import { lazy, type ReactElement, Suspense, useEffect, useMemo, useState } from 'react'

import { loadDemo, loadDemoSource } from '#/docs/demos.js'

import { HighlightedCode } from './docs-code-block.js'
import { useDocsPage } from './docs-context.js'

/** A live example with its source. `name` is the camelCase name of a file in the page's `demos` folder. */
export function Demo({ name }: { name: string }): ReactElement {
  const page = useDocsPage()
  const [source, setSource] = useState<string | null>(null)
  const Example = useMemo(
    () => lazy(async () => ({ default: await loadDemo(page, name) })),
    [page, name],
  )

  useEffect(() => {
    let active = true

    loadDemoSource(page, name)
      .then((text) => {
        if (active) {
          setSource(text.trim())
        }
      })
      .catch(() => {
        if (active) {
          setSource('')
        }
      })

    return () => {
      active = false
    }
  }, [page, name])

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
        {source ? <HighlightedCode code={source} language="tsx" title={`${name}.tsx`} /> : null}
      </Tabs.Content>
    </Tabs>
  )
}
