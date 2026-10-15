import { spawn, type ChildProcess } from 'node:child_process'
import { watch } from 'node:fs'

let child: ChildProcess | undefined
let pending = false
let stopped = false
let timer: ReturnType<typeof setTimeout> | undefined

function generate() {
    if (stopped) return
    pending = true
    if (child) return
    pending = false
    child = spawn(process.execPath, ['run', 'api:generate'], { stdio: 'inherit' })
    child.on('error', (error) => console.error(error))
    child.on('close', (code) => {
        child = undefined
        if (code !== 0 && !stopped)
            console.error('API generation failed; watching for corrections.')
        if (pending) generate()
    })
}

function schedule() {
    clearTimeout(timer)
    timer = setTimeout(generate, 150)
}

// Kubb's built-in watch only observes entrypoints, not the split contract's $ref files.
const contracts = watch('src/api/openapi', { recursive: true }, (_event, filename) => {
    if (filename && !filename.startsWith('dist/') && /\.ya?ml$/.test(filename)) schedule()
})
const config = watch('src/api/kubb.config.ts', schedule)

function stop() {
    stopped = true
    clearTimeout(timer)
    contracts.close()
    config.close()
    child?.kill('SIGTERM')
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
generate()
