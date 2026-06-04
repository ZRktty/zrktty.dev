// PreToolUse hook: block Read/Grep/Bash access to .env and .env.local files.
// Exit 2 with stderr message tells Claude Code to deny the tool call.

process.stdin.setEncoding('utf8')
let input = ''
process.stdin.on('data', (d) => (input += d))
process.stdin.on('end', () => {
  const payload = JSON.parse(input)
  const tool = payload.tool_name || ''
  const ti = payload.tool_input || {}

  const block = (msg) => {
    console.error(msg)
    process.exit(2)
  }

  if (tool === 'Read' && (ti.file_path || '').includes('.env')) {
    block('Blocked: reading .env files is not permitted.')
  }

  if (tool === 'Grep' && ((ti.path || '').includes('.env') || (ti.glob || '').includes('.env'))) {
    block('Blocked: searching .env files is not permitted.')
  }

  if (
    tool === 'Bash' &&
    /(^|[\s/=<>|;&"'`(])\.env(\.[\w-]+)?([\s<>|;&"'`)]|$)/.test(ti.command || '')
  ) {
    block('Blocked: bash commands referencing .env files are not permitted.')
  }

  process.exit(0)
})
