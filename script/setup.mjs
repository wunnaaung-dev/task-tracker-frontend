// Task Tracker client — one-command setup.
// Usage: npm run setup            (install, create .env, check the API, start Vite)
//        npm run setup -- --no-dev (install and create .env only)
import { spawn, spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, readFileSync } from 'node:fs'

const MIN_NODE = 22
const isWindows = process.platform === 'win32'
const skipDev = process.argv.includes('--no-dev')

const step = (n, text) => console.log(`\n[${n}/5] ${text}`)
const fail = (message) => {
  console.error(`\n✖ ${message}`)
  process.exit(1)
}

console.log('Setting up Task Tracker client…')

step(1, 'Checking Node.js version')
const major = Number(process.versions.node.split('.')[0])
if (major < MIN_NODE) fail(`Node.js ${MIN_NODE}+ is required (found ${process.versions.node}).`)
console.log(`✔ Node.js ${process.versions.node}`)

step(2, 'Installing dependencies')
const install = spawnSync('npm', ['ci'], { stdio: 'inherit', shell: isWindows })
if (install.status !== 0) fail('Dependency install failed.')
console.log('✔ Dependencies installed')

step(3, 'Creating .env')
if (existsSync('.env')) {
  console.log('✔ .env already exists, leaving it untouched')
} else {
  copyFileSync('.env.example', '.env')
  console.log('✔ .env created from .env.example')
}

if (skipDev) {
  console.log('\n✔ Setup complete. Start the client with: npm run dev')
  process.exit(0)
}


step(4, 'Checking the API is running')
const apiUrl = readFileSync('.env', 'utf8').match(/^VITE_API_BASE_URL=(.+)$/m)?.[1]?.trim()
  ?? 'http://localhost:3000/api/v1'
const healthUrl = `${new URL(apiUrl).origin}/health`
try {
  const res = await fetch(healthUrl, { signal: AbortSignal.timeout(3000) })
  if (!res.ok) throw new Error(`status ${res.status}`)
  console.log(`✔ API is up at ${new URL(apiUrl).origin}`)
} catch {
  console.warn(`⚠ Can't reach the API at ${healthUrl}.`)
  console.warn('  Start the backend first (npm run setup in task-tracker-backend), then reload the page.')
}

step(5, 'Starting the client (Ctrl+C to stop)')
console.log('  App: http://localhost:5173\n')
const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: isWindows })
dev.on('exit', (code) => process.exit(code ?? 0))