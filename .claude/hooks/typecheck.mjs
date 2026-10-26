// PostToolUse hook: run tsc on .ts/.tsx writes.
//
// Why: when Claude changes a function signature, it often updates the
// definition file but misses call sites elsewhere. Lint won't catch a stale
// caller — tsc will. Emitting a PostToolUse `decision: "block"` surfaces the
// errors in Claude's next turn so they get fixed immediately rather than
// silently landing in a commit.
//
// Pre-existing errors from Next.js's generated `.next/dev/types/` files are
// filtered out — they're build artifacts, not actionable for the model.

import { spawnSync } from 'node:child_process'

let input = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (d) => (input += d))
process.stdin.on('end', () => {
  let payload
  try {
    payload = JSON.parse(input)
  } catch {
    process.exit(0)
  }

  // Handle Write/Edit (single file_path) and MultiEdit (edits[].file_path array)
  const singleFile = payload?.tool_input?.file_path || ''
  const multiFiles = payload?.tool_input?.edits?.map((e) => e.file_path) || []
  const allFiles = singleFile ? [singleFile] : multiFiles

  const tsFiles = allFiles.filter((f) => /\.tsx?$/.test(f))
  if (tsFiles.length === 0) {
    process.exit(0)
  }

  const result = spawnSync('bunx', ['tsc'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    timeout: 90_000,
  })

  if (result.error) {
    process.exit(0)
  }

  const raw = ((result.stdout || '') + (result.stderr || '')).trim()
  if (!raw) {
    process.exit(0)
  }

  // Keep only error blocks whose source file is not under .next/.
  // An error block starts with `path(line,col): error TSnnnn:` and continues
  // with indented detail lines until the next non-indented line.
  const errorHeader = /^(\S[^(]+)\((\d+),(\d+)\): error TS\d+:/
  const lines = raw.split('\n')
  const kept = []
  let include = false
  for (const line of lines) {
    const m = errorHeader.exec(line)
    if (m) include = !m[1].startsWith('.next/')
    if (include) kept.push(line)
  }

  const errorCount = kept.filter((l) => errorHeader.test(l)).length
  if (errorCount === 0) {
    process.exit(0)
  }

  const body = kept.join('\n')
  const truncated = body.length > 4000 ? body.slice(0, 4000) + '\n…(truncated)' : body
  const fileDesc = tsFiles.length === 1 ? tsFiles[0] : `${tsFiles.length} files`
  console.log(
    JSON.stringify({
      decision: 'block',
      reason: `tsc found ${errorCount} type error${errorCount === 1 ? '' : 's'} after editing ${fileDesc}. Fix before continuing:\n\n${truncated}`,
    }),
  )
  process.exit(0)
})
