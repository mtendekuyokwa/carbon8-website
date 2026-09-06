# Evaluator Rubric

Score each completed sprint A/B/C/D per dimension. Ship only if every dimension ≥ B.

| Dimension | A | B (ship threshold) | C | D |
|---|---|---|---|---|
| Correctness | Behavior matches contract, edge cases handled | Main path works, minor gaps noted | Partial, main path broken | Wrong behavior |
| Arch compliance | Layers, `~/`, no new violations | No new violations | One minor violation | Cross-feature/barrel or purity break |
| Test coverage | New + regression tests, all green | Existing suite green | Suite green but no new tests | Red suite |
| Verification evidence | `verify-feature` log + commit hash in `evidence` | `make check` log pasted | Claims pass, no log | No verification run |

Record scores in `PROGRESS.md` or the commit message footer.
