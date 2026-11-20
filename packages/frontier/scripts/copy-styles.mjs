import { cp, mkdir, readdir, rm } from 'node:fs/promises'
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

await rm(join(targetRoot, 'styles'), { force: true, recursive: true })
await copyCss(join(sourceRoot, 'styles'), join(targetRoot, 'styles'))
await copyCss(join(sourceRoot, 'components'), join(targetRoot, 'components'))
await copyCss(join(sourceRoot, 'icons'), join(targetRoot, 'icons'))

const fontsSource = join(sourceRoot, 'typography', 'fonts')
const fonts = (await readdir(fontsSource).catch(() => [])).filter((name) => name.endsWith('.woff2'))

await rm(join(targetRoot, 'typography'), { force: true, recursive: true })

if (fonts.length === 0) {
  console.warn(
    'Frontier Sans is not built; run `pnpm typography:build`. Text falls back to Outfit.',
  )
} else {
  await mkdir(join(targetRoot, 'typography', 'fonts'), { recursive: true })
  await Promise.all(
    fonts.map((name) => cp(join(fontsSource, name), join(targetRoot, 'typography', 'fonts', name))),
  )
}
