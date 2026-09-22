# 00 · Executive summary: KuiReact ↔ KuiNative parity audit

> Audit date 2026-09-22. Reference: `kui-react` (registry v0.1.0 snapshot 2026-09-18, package 1.0.1). Target: `KUInative` @ `feature/wave1-parity`. Every finding is derived from source code in both repositories.

## Scope

**KuiNative development is scoped to KuiReact's core ui-layer atoms, molecules and organisms** — the registry's own `Atom`/`Molecule`/`Organism` categories, all living under `modules/ui/`. **App-layer components** (`modules/app/` — app shells, navigation chrome, forms/flows, providers), **domain verticals** (`modules/domains/*`, 217 industry-specific components across 18 verticals) and **theme demos** (`app/theme/*`) are explicitly **out of scope** for the backlog, roadmap and coverage numbers below. They are still listed for reference in the full KuiReact inventory, clearly marked out of scope. Details and rationale: [phase-2-gap-analysis/missing-components.md#scope](phase-2-gap-analysis/missing-components.md#scope).

## Verdict

**In-scope parity: 32 / 100.** KuiNative's palette and authoring idioms match KuiReact, but it is not yet its React Native counterpart within the audited scope. It covers 11 of 62 in-scope KuiReact ui-layer components, and none of its 12 components is at full parity. It is not installable as a package and, as of this audit, has just started gaining test coverage.

## Key numbers

| | |
| --- | --- |
| KuiReact entries audited (all layers, for reference) | 325 |
| KuiReact **in-scope** (ui-layer Atom/Molecule/Organism) | 62 |
| KuiReact out of scope (app layer 40, domain 217, hooks 3, external library 1, other ui categories 2) | 263 |
| KuiNative library exports | 13 (12 components + AvatarGroup) |
| Shared components | 11 KuiReact ids ↔ 12 KuiNative exports; `Text` is native-only |
| Missing from KuiNative (in scope) | **51** |
| Missing by priority | Critical 10 · High 10 · Medium 17 · Low 14 |
| Count coverage (in scope) | 11 / 62 = **17.7 %** |
| Usage-weighted coverage (in scope, by KuiReact production imports) | 343 / 476 = **72.1 %** |
| Shared-component status | 0 complete · 3 minor gaps · 8 major gaps · 2 rewrite |
| Colour-token parity | 33 / 33 identical (light + dark) |
| Prop-name parity on shared components | 41 / 80 (51 %) |
| Roadmap effort (in-scope) | W1 27–44 d · W2 46.5–77 d · W3 65–121 d |

## Scores

| Coverage | API | Visual | Tokens | A11y | Docs | Testing | DX | Architecture | **Overall** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 33 | 44 | 45 | 71 | 40 | 18 | 10 | 25 | 40 | **34** |

Coverage and Testing move slightly from the first pass: Coverage because the denominator is now the correctly-scoped 62 (not 107), Testing because a Jest + `@testing-library/react-native` harness now exists and Spinner has a passing suite (see [phase-4-scoring/scoring-rationale.md](phase-4-scoring/scoring-rationale.md)).

## Five findings that matter most

1. **Naming diverges from KuiReact.** KuiNative uses `TextInput`, `Switch`, `visible`, `destructive`, `default`, `value/onValueChange` and `label: string` where KuiReact uses `Input`, `Toggle`, `open`, `danger`, `neutral`, `checked/onChange` and `children`. Button and Badge together account for 246 KuiReact production imports, and neither accepted `children` as of the initial audit pass. [04](04-api-differences.md)
2. **Modal needs a rewrite.** Nested accessible Pressables collapse it into one VoiceOver element. Long content overflows, the keyboard covers inputs, there is no close button, and 7 KuiReact props are missing. [rewrite-candidates](phase-3-parity-review/rewrite-candidates.md)
3. **Headings render regular weight on iOS and web.** `Text` sets only `fontFamily`, never a weight. KuiReact uses Geist, not Inter as KuiNative's README claims. [text](feature-matrix/text.md)
4. **A plain `View` with `accessibilityRole` but no `accessible={true}` is invisible to assistive tech and to role-based queries** — found while adding the first real test (Spinner) and fixed there; the same defect exists on SkeletonCard and EmptyState until they are touched.
5. **It cannot be consumed as a package.** `package.json` has `private: true` and `main: expo-router/entry`, and theme wiring lives in the showcase's `app/_layout.tsx`.

## What's good

- Tokens are an exact copy of KuiReact's.
- Raw colours are confined to documented exceptions.
- Components use the same `cn()` and variant-map idiom, and every component exports its `*Props` type.
- Avatar falls back to initials when an image fails, which KuiReact does not do.
- Button blocks presses while loading, which prevents double submits.

## Recommended next actions

1. Write an ADR adopting KuiReact names, with RN names kept as deprecated aliases, and create `parity.exceptions.json`.
2. ~~Set up jest-expo + @testing-library/react-native + CI~~ — jest-expo and @testing-library/react-native are installed and configured (`jest.config.js`); CI and a lint config remain.
3. Fix the Text weights, the Modal defects and silent form errors.
4. Make KuiNative an installable package: add an exports map and build, export a `KuiProvider`, and move to Font Awesome v7.
5. Execute [Wave 1](phase-5-roadmap/wave-1-critical.md) (21 items, 27–44 engineer-days), then re-run the audit.

## Workspace map

| Phase | Files |
| --- | --- |
| Summary | [00](00-executive-summary.md) · [01 KuiReact inventory](01-kui-react-inventory.md) · [02 KuiNative inventory](02-kui-native-inventory.md) · [03 missing](03-missing-components.md) · [04 API](04-api-differences.md) · [05 design](05-design-differences.md) · [06 behaviour](06-behavior-differences.md) · [07 scores](07-consistency-scores.md) · [08 roadmap](08-roadmap.md) · [09 verdict](09-final-verdict.md) |
| 1 Inventory | [kui-react-components](phase-1-inventory/kui-react-components.md) · [kui-native-components](phase-1-inventory/kui-native-components.md) · [public-exports](phase-1-inventory/public-exports.md) · [inventory-summary](phase-1-inventory/inventory-summary.md) |
| 2 Gap analysis | [missing-components](phase-2-gap-analysis/missing-components.md) (scope statement here) · [priority-matrix](phase-2-gap-analysis/priority-matrix.md) · [dependency-analysis](phase-2-gap-analysis/dependency-analysis.md) · [implementation-order](phase-2-gap-analysis/implementation-order.md) |
| 3 Parity review | [api](phase-3-parity-review/api-differences.md) · [design](phase-3-parity-review/design-differences.md) · [behaviour](phase-3-parity-review/behavior-differences.md) · [a11y](phase-3-parity-review/accessibility-differences.md) · [testing](phase-3-parity-review/testing-differences.md) · [quality](phase-3-parity-review/implementation-quality.md) · [status matrix](phase-3-parity-review/component-status-matrix.md) · [rewrites](phase-3-parity-review/rewrite-candidates.md) · [parity matrix](phase-3-parity-review/component-parity-matrix.md) |
| 4 Scoring | [scoring](phase-4-scoring/scoring.md) · [rationale](phase-4-scoring/scoring-rationale.md) |
| 5 Roadmap | [wave 1](phase-5-roadmap/wave-1-critical.md) · [wave 2](phase-5-roadmap/wave-2-core-completion.md) · [wave 3](phase-5-roadmap/wave-3-advanced.md) · [order](phase-5-roadmap/implementation-order.md) |
| Per component | [feature-matrix/](feature-matrix/README.md) (12 shared + Text) · [component-backlog/](component-backlog/README.md) (51 in-scope missing) |
| Re-running | [tooling/](tooling/README.md): the extraction and generator scripts that produced the data-driven files |

## Limitations

- KuiNative's typecheck was **not** re-verified after the scope change; `npm run typecheck` should be run before merging.
- Behaviour on devices (VoiceOver, TalkBack, Android status bar) is inferred from RN semantics and source code, plus one verified unit-test run (Spinner); not yet observed on hardware for the rest.
- Usage frequency counts importing files, not render sites.
- Out-of-scope entries (app layer, domain, hooks, library) are still catalogued in the Phase 1 inventory for reference, but carry no priority, complexity or backlog file.
