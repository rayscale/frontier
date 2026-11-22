import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

import { describe, expect, it } from 'vitest'

import { examples } from '#/components/guideline-examples/registry.js'

import { guidelineExamples } from './guideline-examples.js'

const guidelines = join(process.cwd(), '../../guidelines')

function markdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return markdownFiles(path)
    }

    return entry.name.endsWith('.md') ? [path] : []
  })
}

/** The number of rows of each Do and Don't table of a guideline, in order. */
function doDontTables(source: string): number[] {
  const lines = source.split('\n')
  const tables: number[] = []

  lines.forEach((line, index) => {
    if (!/^\|\s*Do\s*\|\s*Don't\s*\|\s*$/.test(line)) {
      return
    }

    let rows = 0
    for (let next = index + 2; lines[next]?.startsWith('|'); next += 1) {
      rows += 1
    }

    tables.push(rows)
  })

  return tables
}

const files = markdownFiles(guidelines).map((path) => ({
  file: relative(guidelines, path).replaceAll('\\', '/'),
  tables: doDontTables(readFileSync(path, 'utf8')),
}))

describe('guideline examples', () => {
  it.each(files.filter(({ tables }) => tables.length > 0))(
    "draws every Do and Don't row of $file",
    ({ file, tables }) => {
      const named = guidelineExamples.get(file) ?? []

      expect(named.map((ids) => ids.length)).toEqual(tables)
    },
  )

  it("names a guideline that has Do and Don't tables", () => {
    const withTables = new Set(files.filter(({ tables }) => tables.length > 0).map((f) => f.file))

    expect([...guidelineExamples.keys()].filter((file) => !withTables.has(file))).toEqual([])
  })

  it('has an example for every name, and uses every example', () => {
    const named = [...guidelineExamples.values()].flat(2)

    expect(named.filter((id) => !examples.has(id))).toEqual([])
    expect([...examples.keys()].filter((id) => !named.includes(id))).toEqual([])
  })
})
