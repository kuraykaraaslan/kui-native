# 00 · Executive summary: KuiReact ↔ KuiNative parity audit

> Audit date 2026-09-22, updated through commit `3d2d0f9` on `feature/wave1-parity`. Reference: `kui-react` (registry v0.1.0 snapshot 2026-09-18, package 1.0.1). Every finding is derived from source code in both repositories.

## Scope

**KuiNative development is scoped to KuiReact's core ui-layer atoms, molecules and organisms** — the registry's own `Atom`/`Molecule`/`Organism` categories, all living under `modules/ui/`. **App-layer components** (`modules/app/` — app shells, navigation chrome, forms/flows, providers), **domain verticals** (`modules/domains/*`, 217 industry-specific components across 18 verticals) and **theme demos** (`app/theme/*`) are explicitly **out of scope** for the backlog, roadmap and coverage numbers below. They are still listed for reference in the full KuiReact inventory, clearly marked out of scope. Details and rationale: [phase-2-gap-analysis/missing-components.md#scope](phase-2-gap-analysis/missing-components.md#scope).

## Verdict

**In-scope parity: 77 / 100** (first pass 34, then 56, 66, 71, previous 75), re-scored 2026-09-22 through commit `3d2d0f9`.

- **Shared components:** all 61 match KuiReact's class lists, prop names and showcase demos. Fifty-three are fully at parity; ten have only minor gaps, mostly platform-driven (Chart and MapView among them).
- **What remains:** packaging and CI. The only in-scope component without a counterpart is SkipLink + LiveRegion, a web-only utility that should be recorded as an exception. Full verdict: [09-final-verdict.md](09-final-verdict.md).

## Key numbers

| | |
| --- | --- |
| KuiReact in scope (ui-layer Atom/Molecule/Organism) | 62 |
| KuiNative components with a KuiReact counterpart | 61 (plus native-only `Text`) |
| Missing (in scope) | **1** (SkipLink + LiveRegion, web-only) — see [03](03-missing-components.md) |
| Coverage | 98.4 % by count · 96.6 % by usage |
| Status | 53 complete · 10 minor gaps · 0 major gaps · 0 rewrites |
| Prop-name parity on shared components | 549 / 552 (99.5 %) |
| Showcase demos reproduced verbatim | 217 / 220 |
| Tests | 62 suites · 569 tests at `3d2d0f9`, all passing (includes `libs/brand/geometry.test.ts`, 7 tests, from the web-branding commit) |

## Scores

| Coverage | API | Visual | Tokens | A11y | Docs | Testing | DX | Architecture | **Overall** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 92 | 95 | 87 | 90 | 82 | 63 | 61 | 42 | 65 | **77** |

## What changed since the first pass

1. **Pixel-perfect pass (`048ebed`).** Every original component was re-measured against KuiReact's source and fixed.
2. **New components:** Label, Separator, AlertBanner, RadioGroup, Textarea, TabGroup, Progress, Select, Drawer and the Toast suite; then Popover, DropdownMenu, Tooltip, Accordion, ButtonGroup, CheckboxGroup, SearchBar, Pagination, Stepper, Breadcrumb, PageHeader, MultiSelect and RangeSlider; then the DatePicker suite, TimePicker, BrandLogo, Popconfirm, StarRating, StatCard, Statistic, TabButton, Timeline, TagInput, ComboBox, FileInput, Table, Slider, ContentScoreBar, ViewToggle and ScrollArea; then TreeView, ColorPicker, DataTable, BulkActionTable, AdvancedDataTable, DiffViewer, Chart, MapView and VideoPlayer. Each has KuiReact's showcase demos.
3. **API parity** on every original component. Deprecated aliases keep old call sites working.
   - Button and Badge take `children`.
   - Values use `danger` and `neutral`.
   - Components use KuiReact's names `Input` and `Toggle`.
   - Every missing prop was added.
   - AvatarGroup was rewritten to KuiReact's data-driven API.
4. **Shared overlay core** (`Overlays/shared`), as in KuiReact; Modal and Drawer use its presence / backdrop / focus layer, and Popover, DropdownMenu, Popconfirm, MultiSelect and the date / time pickers its anchored-panel layer (`useAnchor`, `computePosition`, `AnchoredPanel`, `useTrigger`). KuiReact's `ComboBox/hooks` are ported and shared by ComboBox and MultiSelect; the DatePicker suite keeps KuiReact's folder layout and date helpers. The Wave 3 components reuse KuiReact's logic unchanged: `useTreeState`, the ColorPicker colour maths and `useColorState`, `useTable` / `useServerTable`, `useDiff`, the chart `_helpers` and theme, `useAutoMarkers`, `useControlsVisibility`.
5. **Every accessibility defect from the first audit is fixed.** That includes form errors, which are now announced to screen readers.
6. **Test harness plus 569 tests,** with KuiReact's own cases ported wherever KuiReact has them. The README was also corrected.

## Still open

1. **SkipLink + LiveRegion:** record it as a parity exception (or ship a small announce helper and except only `SkipLink`).
2. **Packaging:** exports map, build, `KuiProvider`, Font Awesome v7.
3. **Typography:** Geist isn't bundled.
4. **Verification:** CI, visual regression, and on-device checks.
5. **Minor gaps:** focus move / restore for Popover; Chart `img` role on the radial charts; MapView's web fallback; Select outside-tap close. Spinner ring, `SkeletonTableRow`, Label rest props and Modal `ref` landed in `fcc2af9`, after this refresh's cutoff.

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
| Per component | [feature-matrix/](feature-matrix/README.md) (61 shared + Text) · [component-backlog/](component-backlog/README.md) (1 in-scope missing) |
| Re-running | [tooling/](tooling/README.md): the extraction and generator scripts that produced the data-driven files |

## Limitations

- The refresh pins the KuiNative side to `3d2d0f9` (`KN_REV`, with component sources read from a snapshot of that commit via `KN_SRC`). One full Jest run passed (62 suites); it ran on a checkout that already held `fcc2af9` and uncommitted work, so that commit's 9 extra tests are left out of the 569. `fcc2af9` itself is not counted yet. `libs/brand/geometry.test.ts` (from `a76db94`) passes under Jest but does not type-check (missing Node types); it is outside the component library and not scored.
- Pixel parity is checked by comparing class lists against KuiReact's source in unit tests, not by screenshots. Behaviour on devices (VoiceOver, TalkBack, Android status bar) is inferred from RN semantics and tests; it has not been observed on hardware.
- Usage frequency counts importing files, not render sites.
- Out-of-scope entries (app layer, domain, hooks, library) are still catalogued in the Phase 1 inventory for reference, but carry no priority, complexity or backlog file.
