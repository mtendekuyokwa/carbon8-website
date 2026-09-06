# Clean-State Checklist

A session is complete only when all five pass (`make clean-check`).

1. Build passes: `npm run build` exits 0.
2. Tests pass: `npm test` exits 0 (no `.only`).
3. Feature list updated: touched feature has correct `state`; `passing` only via `verify-feature` with `evidence` stamped.
4. No debug artifacts: no `console.log`, `debugger`, `.only`, stray files (`git status` clean except intended).
5. Startup path works: `npm run build` output exists (`build/server/index.js`); smoke note in `PROGRESS.md` when boundaries crossed.
