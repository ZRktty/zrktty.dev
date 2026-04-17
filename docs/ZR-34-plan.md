# Plan: ZR-34 — Add Gitleaks Secret Scanning to Git Commit Hook (Frontend)

## Ticket
https://zoltanrakottyai.atlassian.net/browse/ZR-34

## Summary
Add gitleaks secret scanning to local git pre-commit and pre-push hooks via Husky. No CI/GitHub Actions — purely local protection.

## Current state
- Husky is **not installed** (no `.husky/` dir, no `prepare` script, not in `package.json`). Must be set up as part of this ticket.
- `lint-staged` is also **not installed** — the `.husky/pre-commit` in the ticket calls `bunx lint-staged`, so it must be added too.
- No `.gitleaks.toml` exists.

## Files to create
- `.husky/pre-commit` — runs gitleaks hook + lint-staged
- `.husky/pre-commit-gitleaks` — executable script: checks gitleaks availability, runs `gitleaks protect --staged`
- `.husky/pre-push` — full repo scan before push
- `.gitleaks.toml` — gitleaks config with custom rules & allowlist
- `gitleaks-baseline.json` — generated baseline (committed to repo)

## Files to modify
- `package.json` — add `prepare: "husky"`, `security:scan`, `security:baseline` scripts; add `husky` and `lint-staged` as devDependencies

## Implementation steps
1. Install `husky` and `lint-staged` as dev dependencies via `bun add -d husky lint-staged`
2. Add `"prepare": "husky"` script to `package.json`
3. Run `bunx husky init` (or `bun run prepare`) to initialise `.husky/` directory
4. Add `security:scan` and `security:baseline` scripts to `package.json`
5. Create `.gitleaks.toml` at project root with custom rules and allowlist from ticket spec
6. Generate baseline: `gitleaks detect --source . --report-path gitleaks-baseline.json --verbose` (requires gitleaks installed locally)
7. Create `.husky/pre-commit-gitleaks` with gitleaks protect logic; `chmod +x`
8. Update `.husky/pre-commit` to call `pre-commit-gitleaks` then `bunx lint-staged`
9. Create `.husky/pre-push` with full repo scan
10. Verify hook fires correctly: stage a test file and run `git commit --dry-run` or manually call `./.husky/pre-commit-gitleaks`

## Notes
- `gitleaks detect` for baseline generation requires gitleaks installed locally (`brew install gitleaks`). If not installed, baseline step will be skipped and noted.
- Baseline file `.gitleaks-baseline.json` vs `gitleaks-baseline.json`: ticket uses both names in different places — will use `gitleaks-baseline.json` (no leading dot, to match the generate command in the ticket).
- The `.gitleaks.toml` allowlist includes `.env.example` so placeholder values there don't trigger false positives.

## Questions / blockers
- Is `lint-staged` needed (no lint-staged config exists yet)? Will add minimal config running `bun run lint` on staged `.ts/.tsx` files unless told otherwise.
- Baseline generation requires `gitleaks` to be installed locally on this machine — will attempt and report outcome.
