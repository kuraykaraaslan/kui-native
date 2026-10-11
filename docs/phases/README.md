# Phases (docs/phases)

Planned work for KUInative. The shared plan for the KUI repositories lives in kui-react (`$KUIREACT_ROOT/docs/phases/`); KUInative has no development phases of its own for phases 0-9, and the parity audit under `docs/audits/` remains the record of the 2026-09 parity work (its waves are audit output, not phases). This folder holds the KUInative share of every phase that adds work specific to KUInative, starting with phase 10.

Path keys resolve through `internal-ai-rules/LOCAL_PATHS.json`. Never hardcode absolute paths in these docs.

## Phases

| # | File | Goal | Canonical plan |
|---|---|---|---|
| 10 | [10-ecosystem-gap-closure.md](10-ecosystem-gap-closure.md) | The KUInative share of the gaps found against five reference libraries: palette presets and a few ui-layer primitives | `$KUIREACT_ROOT/docs/phases/10-ecosystem-gap-closure.md` |

## Rules for every phase here

1. The canonical spec for a shared item is the kui-react phase file. If the two disagree, kui-react wins; fix this file.
2. **Scope is the ui layer.** KUInative follows kui-react's atoms, molecules and organisms (`docs/audits/2026-09-22-kui-react-parity/00-executive-summary.md`). No app-layer components, domains, marketing blocks or site themes. A component that does not exist here is not created unless its section says so; its absence is recorded in kui-react's `parity.exceptions.json`.
3. **Pixel-perfect.** Same classes, same prop names and defaults, same token names and values as the kui-react component; showcase demos reproduce kui-react's variant titles, order, sample copy and sidebar abbreviations (`PROGRESS.md` standing rules).
4. **Everything added shows in the demo shell.** A native demo entry in `modules/showcase/registry.tsx`, then `npm run showcase:sync` (needs `KUI_REACT` pointing at kui-react) to regenerate `modules/showcase/data/showcase.generated.ts`; the sync test fails when the source block drifts from the component file.
5. Every change ships with tests (Jest + `@testing-library/react-native`, `await render` and `await fireEvent`) and the accessibility mapping from `docs/audits/2026-09-22-kui-react-parity` (roles, labels, `accessible` only on leaf elements).
6. Tick a checkbox only when the task is merged on `main`; append the short commit hash. If a task proves wrong, strike it through with one line of reasoning.

Status legend: `[ ]` not started · `[~]` in progress · `[x]` merged on `main`.
