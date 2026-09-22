# 00 · Executive summary: KuiReact ↔ KuiNative parity audit

> Audit date 2026-09-22, updated through commit `599c8a1` on `feature/wave1-parity`. Reference: `kui-react` (registry v0.1.0 snapshot 2026-09-18, package 1.0.1). Every finding is derived from source code in both repositories.

## Scope

**KuiNative development is scoped to KuiReact's core ui-layer atoms, molecules and organisms** — the registry's own `Atom`/`Molecule`/`Organism` categories, all living under `modules/ui/`. **App-layer components** (`modules/app/` — app shells, navigation chrome, forms/flows, providers), **domain verticals** (`modules/domains/*`, 217 industry-specific components across 18 verticals) and **theme demos** (`app/theme/*`) are explicitly **out of scope** for the backlog, roadmap and coverage numbers below. They are still listed for reference in the full KuiReact inventory, clearly marked out of scope. Details and rationale: [phase-2-gap-analysis/missing-components.md#scope](phase-2-gap-analysis/missing-components.md#scope).

## Verdict

**In-scope parity: 66 / 100** (first pass 34, previous 56), re-scored 2026-09-22 through commit `599c8a1`.

- **Shared components:** all 21 match KuiReact's classes, prop names and showcase demos. Sixteen are fully at parity; seven have only minor, platform-driven gaps.
- **What remains:** coverage (41 in-scope components to build) and packaging. Full verdict: [09-final-verdict.md](09-final-verdict.md).

## Key numbers

| | |
| --- | --- |
| KuiReact in scope (ui-layer Atom/Molecule/Organism) | 62 |
| KuiNative components with a KuiReact counterpart | 21 (plus native-only `Text`) |
| Missing (in scope) | **41** — see [03](03-missing-components.md) |
| Coverage | 33.9 % by count · 77.7 % by usage |
| Status | 16 complete · 7 minor gaps · 0 major gaps · 0 rewrites |
| Prop-name parity on shared components | 143 / 146 (97.9 %) |
| Showcase demos reproduced verbatim | 102 / 104 |
| Tests | 22 suites · 278 tests · `tsc --noEmit` clean |

## Scores

| Coverage | API | Visual | Tokens | A11y | Docs | Testing | DX | Architecture | **Overall** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 45 | 95 | 85 | 90 | 80 | 63 | 55 | 42 | 60 | **66** |

## What changed since the first pass

1. **Pixel-perfect pass (`048ebed`).** Every original component was re-measured against KuiReact's source and fixed.
2. **New components:** Label, Separator, AlertBanner, RadioGroup, Textarea, TabGroup, Progress, Select, Drawer and the Toast suite, each with KuiReact's showcase demos.
3. **API parity** on every original component. Deprecated aliases keep old call sites working.
   - Button and Badge take `children`.
   - Values use `danger` and `neutral`.
   - Components use KuiReact's names `Input` and `Toggle`.
   - Every missing prop was added.
   - AvatarGroup was rewritten to KuiReact's data-driven API.
4. **Shared overlay core** (`Overlays/shared`), as in KuiReact; Modal and Drawer both use it.
5. **Every accessibility defect from the first audit is fixed.** That includes form errors, which are now announced to screen readers.
6. **Test harness plus 278 tests.** The README was also corrected.

## Still open

1. **41 components to build.** Next: DropdownMenu, Popover, Tooltip, Accordion, ButtonGroup.
2. **Packaging:** exports map, build, `KuiProvider`, Font Awesome v7.
3. **Typography:** Geist isn't bundled.
4. **Verification:** CI, visual regression, and on-device checks.

Progress log and standing rules: [PROGRESS.md](PROGRESS.md).

## Workspace map

| Phase | Files |
| --- | --- |
| Summary | [00](00-executive-summary.md) · [01 KuiReact inventory](01-kui-react-inventory.md) · [02 KuiNative inventory](02-kui-native-inventory.md) · [03 missing](03-missing-components.md) · [04 API](04-api-differences.md) · [05 design](05-design-differences.md) · [06 behaviour](06-behavior-differences.md) · [07 scores](07-consistency-scores.md) · [08 roadmap](08-roadmap.md) · [09 verdict](09-final-verdict.md) |
| 1 Inventory | [kui-react-components](phase-1-inventory/kui-react-components.md) · [kui-native-components](phase-1-inventory/kui-native-components.md) · [public-exports](phase-1-inventory/public-exports.md) · [inventory-summary](phase-1-inventory/inventory-summary.md) |
| 2 Gap analysis | [missing-components](phase-2-gap-analysis/missing-components.md) (scope statement here) · [priority-matrix](phase-2-gap-analysis/priority-matrix.md) · [dependency-analysis](phase-2-gap-analysis/dependency-analysis.md) · [implementation-order](phase-2-gap-analysis/implementation-order.md) |
| 3 Parity review | [api](phase-3-parity-review/api-differences.md) · [design](phase-3-parity-review/design-differences.md) · [behaviour](phase-3-parity-review/behavior-differences.md) · [a11y](phase-3-parity-review/accessibility-differences.md) · [testing](phase-3-parity-review/testing-differences.md) · [quality](phase-3-parity-review/implementation-quality.md) · [status matrix](phase-3-parity-review/component-status-matrix.md) · [rewrites](phase-3-parity-review/rewrite-candidates.md) · [parity matrix](phase-3-parity-review/component-parity-matrix.md) |
| 4 Scoring | [scoring](phase-4-scoring/scoring.md) · [rationale](phase-4-scoring/scoring-rationale.md) |
| 5 Roadmap | [wave 1](phase-5-roadmap/wave-1-critical.md) · [wave 2](phase-5-roadmap/wave-2-core-completion.md) · [wave 3](phase-5-roadmap/wave-3-advanced.md) · [order](phase-5-roadmap/implementation-order.md) |
| Per component | [feature-matrix/](feature-matrix/README.md) (21 shared + Text) · [component-backlog/](component-backlog/README.md) (41 in-scope missing) |
| Re-running | [tooling/](tooling/README.md): the extraction and generator scripts that produced the data-driven files |

## Limitations

- `npx tsc --noEmit` and the full Jest suite pass at `599c8a1`.
- Pixel parity is checked by comparing class lists against KuiReact's source in unit tests, not by screenshots. Behaviour on devices (VoiceOver, TalkBack, Android status bar) is inferred from RN semantics and tests; it has not been observed on hardware.
- Usage frequency counts importing files, not render sites.
- Out-of-scope entries (app layer, domain, hooks, library) are still catalogued in the Phase 1 inventory for reference, but carry no priority, complexity or backlog file.
