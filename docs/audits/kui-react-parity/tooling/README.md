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
node extract.js     # ~2 min over the WSL UNC path
node generate.js
```

The paths at the top of `extract.js` (`KR`, `KN`) and `generate.js` (`OUT`) are absolute for the audit machine; adjust them for yours. When a component is added to KuiNative, add it to the `SHARED` map in `extract.js`, write its feature matrix, update `component-status-matrix.md`, re-score, and delete its backlog file. Re-running `generate.js` does not remove stale backlog files.
