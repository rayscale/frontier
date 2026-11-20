import { cp, mkdir, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = join(packageRoot, 'source')
const targetRoot = join(packageRoot, 'dist')

async function copyCss(source, target) {
  const entries = await readdir(source, { withFileTypes: true })

  await Promise.all(
    entries.map(async (entry) => {
      const from = join(source, entry.name)
      const to = join(target, entry.name)

      if (entry.isDirectory()) {
        await copyCss(from, to)
      } else if (entry.name.endsWith('.css')) {
        await mkdir(target, { recursive: true })
        await cp(from, to)
      }
    }),
  )
}

await copyCss(join(sourceRoot, 'styles'), join(targetRoot, 'styles'))
await copyCss(join(sourceRoot, 'components'), join(targetRoot, 'components'))
await copyCss(join(sourceRoot, 'internal'), join(targetRoot, 'internal'))
await copyCss(join(sourceRoot, 'symbols'), join(targetRoot, 'symbols'))
