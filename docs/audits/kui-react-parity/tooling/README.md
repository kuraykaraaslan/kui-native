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
KN_REV=HEAD node extract.js     # ~2 min over the WSL UNC path; KN_REV pins the KuiNative commit (default HEAD)
node generate.js
```

The paths at the top of `extract.js` (`KR`, `KN`) and `generate.js` (`OUT`) are absolute for the audit machine; adjust them for yours. When a component is added to KuiNative, add it to the `SHARED` map in `extract.js`, write its feature matrix, update `component-status-matrix.md`, re-score, and delete its backlog file. Re-running `generate.js` does not remove stale backlog files. Remediation progress (`R-*` done / partial) is recorded in `REM_STATUS` in `generate.js`.

`KN_REV` makes a refresh reproducible while work keeps landing: the barrel, the test-file list, the test counts and the showcase entry count are read from that commit with `git show` / `git ls-tree` (component sources are read from the checkout). The 2026-09-22 refresh was run with `KN_REV=0770214`.
