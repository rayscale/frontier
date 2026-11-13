import { cp, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(packageRoot, 'source/styles')
const target = join(packageRoot, 'dist/styles')

await rm(target, { force: true, recursive: true })
await cp(source, target, {
  filter: (entry) => !entry.endsWith('.stories.tsx'),
  recursive: true,
})
