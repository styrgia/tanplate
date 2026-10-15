import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const output = 'src/api/generated'

async function snapshot() {
    const entries = await readdir(output, { recursive: true, withFileTypes: true })
    const files = entries.filter((entry) => entry.isFile())
    return new Map(
        await Promise.all(
            files.map(async (entry) => {
                const path = join(entry.parentPath, entry.name)
                const hash = createHash('sha256')
                    .update(await readFile(path))
                    .digest('hex')
                return [path, hash] as const
            }),
        ),
    )
}

const before = await snapshot()
execFileSync(process.execPath, ['run', 'api:generate'], { stdio: 'inherit' })
const after = await snapshot()
const changed = [...new Set([...before.keys(), ...after.keys()])].filter(
    (path) => before.get(path) !== after.get(path),
)

if (changed.length > 0) {
    console.error(
        `Generated API files changed. Review and save the regenerated output:\n${changed.join('\n')}`,
    )
    process.exitCode = 1
} else {
    console.log(`Generated API output is reproducible (${after.size} files).`)
}
