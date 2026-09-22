# Audit tooling

These scripts produced the data-driven files in this audit. Re-run them after any change in either repository.

| Script | Role |
| --- | --- |
| `extract.js` | Reads KuiReact (`public/registry/components.json`, barrels, component sources, tests, `globals.css`) and KuiNative (`modules/ui`, `libs/theme.ts`), and writes `facts.json`: parsed props and defaults, dependency edges, import-frequency counts, ARIA attributes/roles, tokens, test cases, and a token diff. |
| `curated.js` | Reviewer judgement per missing component: category, priority, complexity, wave, platform fit, reason, RN porting notes. **Edit this** to re-prioritise. |
| `generate.js` | Joins facts and curation, then writes `01`–`03`, `08`, `phase-1-inventory/*`, `phase-2-gap-analysis/*`, `phase-5-roadmap/*` and every `component-backlog/**` file. |

Hand-written files, which the scripts do not touch: `00`, `04`–`07`, `09`, `phase-3-parity-review/*`, `phase-4-scoring/*`, `feature-matrix/*`.

## Run

```bash
cd docs/audits/kui-react-parity/tooling
# optional: snapshot the pinned commit's sources so they match KN_REV even if the checkout has moved on
git -C ../../../.. archive <rev> modules libs app | tar -x -C /tmp/kn-snapshot
KN_REV=<rev> KN_SRC=/tmp/kn-snapshot node extract.js   # ~2–6 min over the WSL UNC path; both default to HEAD / the checkout
KN_SRC=/tmp/kn-snapshot node generate.js
```

The paths at the top of `extract.js` (`KR`, `KN`) and `generate.js` (`OUT`) are absolute for the audit machine; adjust them for yours. When a component is added to KuiNative, add it to the `SHARED` map in `extract.js`, write its feature matrix, update `component-status-matrix.md`, re-score, and delete its backlog file. Re-running `generate.js` does not remove stale backlog files. Remediation progress (`R-*` done / partial) is recorded in `REM_STATUS` in `generate.js`.

`KN_REV` makes a refresh reproducible while work keeps landing: the barrel, the test-file list, the test counts and the showcase entry count are read from that commit with `git show` / `git ls-tree`. Component sources (props, LOC, ARIA, internal users, `libs/theme.ts`) are read from `KN_SRC`, which defaults to the checkout; point it at a `git archive` snapshot of `KN_REV` when the checkout is ahead of the pin. The 2026-09-22 refreshes were run with `KN_REV=0770214`, then `KN_REV=08c1c32`, then `KN_REV=3d2d0f9` with `KN_SRC` set to a snapshot of that commit (the checkout had already moved to `fcc2af9`). Barrel entries may point at `Name.tsx`, `Name/index.tsx` or `Name/index.ts`, and multi-line `export { … }` lists are supported. `extract.js` counts static `it` / `test` blocks; the test totals quoted in the hand-written files come from a Jest `--json` run filtered to the pinned test files (Jest expands `it.each`). `generate.js` also reads the barrel's type-export names (`knMeta.typeNames`) for the public-exports table.
