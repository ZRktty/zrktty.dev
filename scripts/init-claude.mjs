#!/usr/bin/env node
// Materialize .claude/settings.local.json from .claude/settings.example.json.
// Replaces $PWD with the absolute project path so hook commands satisfy
// Anthropic's "use absolute paths" guidance without committing machine paths.
// Idempotent: re-running replaces hook entries that share a matcher rather
// than duplicating them, and leaves unrelated keys in settings.local.json alone.

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const examplePath = resolve(root, '.claude/settings.example.json')
const localPath = resolve(root, '.claude/settings.local.json')

if (!existsSync(examplePath)) {
  console.error(`Missing ${examplePath}`)
  process.exit(1)
}

const expanded = JSON.parse(readFileSync(examplePath, 'utf8').replaceAll('$PWD', root))

const local = existsSync(localPath) ? JSON.parse(readFileSync(localPath, 'utf8')) : {}

for (const [key, value] of Object.entries(expanded)) {
  if (key !== 'hooks') {
    local[key] = value
    continue
  }
  local.hooks ??= {}
  for (const [event, entries] of Object.entries(value)) {
    local.hooks[event] ??= []
    for (const entry of entries) {
      const idx = local.hooks[event].findIndex((e) => e.matcher === entry.matcher)
      if (idx >= 0) local.hooks[event][idx] = entry
      else local.hooks[event].push(entry)
    }
  }
}

writeFileSync(localPath, `${JSON.stringify(local, null, 2)}\n`)
console.log(`Wrote ${localPath}`)
