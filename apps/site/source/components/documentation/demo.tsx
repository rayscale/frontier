import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { ReactElement } from 'react'

import { demoLocation } from '#/documentation/demos.js'
import { contentDirectory } from '#/documentation/pages.js'
import type { TDocumentationPage } from '#/documentation/types.js'

import { DemoView } from './demo-view.js'

/**
 * A live example with its source. `name` is the camelCase name of a file in the page's `demos`
 * folder. The source is read while the site is built; the example loads in the browser.
 */
export async function Demo({
  page,
  name,
}: {
  page: TDocumentationPage
  name: string
}): Promise<ReactElement> {
  const { directory, file } = demoLocation(page, name)
  const source = await readFile(join(contentDirectory, directory, 'demos', file), 'utf8')

  return <DemoView directory={directory} file={file} name={name} source={source.trim()} />
}
