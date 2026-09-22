# 08 · Roadmap

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Detail: [wave-1-critical.md](phase-5-roadmap/wave-1-critical.md) · [wave-2-core-completion.md](phase-5-roadmap/wave-2-core-completion.md) · [wave-3-advanced.md](phase-5-roadmap/wave-3-advanced.md) · [implementation-order.md](phase-5-roadmap/implementation-order.md)

## Summary

| Wave | Goal | Items | Effort (engineer-days) | Remaining items | Remaining effort |
| --- | --- | --- | --- | --- | --- |
| 1 — Critical | Installable, themed, tested library; Button/Input/Modal at parity; baseline form, feedback, overlay and navigation primitives | 11 | 16–26 | 7 | 9.5–16 |
| 2 — Core completion | All shared components at parity; parity contract in CI; remaining ui-layer primitives | 25 | 35–58 | 18 | 31.5–51 |
| 3 — Advanced | Heavy organisms, desktop-web patterns (mostly exceptions) | 13 | 64–119 | 13 | 64–119 |

New components leave the roadmap once they land (their backlog file is deleted); remediation items stay listed and are marked ✓ done or partial.

Estimates assume one engineer familiar with both codebases, Small 0.5–1 d · Medium 2–3 d · Large 5–8 d · Very Large 10–20 d, including tests and a showcase entry. Scope is KuiReact's ui-layer atoms, molecules and organisms only — app-layer components, domain verticals and theme demos are excluded by decision (see [missing-components.md](phase-2-gap-analysis/missing-components.md#scope)).

## Wave 1 in order

1. **R-infra-test** — Test harness: Jest + @testing-library/react-native + CI — partial: Jest + RNTL harness since `4ebda43`; CI still missing (Critical, Medium)
2. **R-infra-package** — Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) (Critical, Large)
3. **R-infra-lint** — ESLint (expo + a11y), token/raw-hex audit, convention rules (High, Small)
4. **R-button** — Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) — ✓ done (`2866e66`) (Critical, Small)
5. **R-field-shell** — Extract FieldShell (Label, hint, error, success, count) shared by all form controls (Critical, Small; after label)
6. **R-theme-provider** — Export a `KuiProvider` (token `vars()` + scheme resolution) from the library (Critical, Small; after R-infra-package)
7. **R-typography** — Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage — partial: weights fixed (`048ebed`, `2866e66`); Geist not bundled (Critical, Small)
8. **R-input** — Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) — ✓ done (`92af9a3`) (Critical, Medium; after R-field-shell)
9. **R-overlay-core** — Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` — ✓ done (`27def3b`, anchored panels `68ce86d`) (Critical, Medium)
10. **R-modal** — Modal rewrite (see rewrite-candidates.md) — ✓ done (`27def3b`) (Critical, Medium; after R-overlay-core)
11. **R-fa-version** — Align Font Awesome to v7 (KuiReact peer range `>=7`) (High, Small)

## Wave 2 in order

12. **R-infra-parity** — Parity contract: `parity.exceptions.json`, generated parity matrix, component registry (High, Medium)
13. **R-avatar** — Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite — ✓ done (`599c8a1`) (High, Small)
14. **R-badge** — Badge parity (children, `neutral`, sizes, dot, dismissible) — ✓ done (`3e48fad`) (High, Small)
15. **R-shadow** — Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) — ✓ done (`048ebed`: shadow classes + Android elevation) (Medium, Small)
16. **R-card** — Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) — ✓ done (`dbdbdbd`) (High, Small)
17. **R-checkbox** — Checkbox parity (hint, error, uncontrolled `defaultChecked`) — ✓ done (`75edb0c`) (High, Small)
18. **R-skeleton** — Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion — partial: Line / Avatar / Text since `048ebed`; SkeletonTableRow waits for Table (High, Small)
19. **R-toggle** — Switch → Toggle parity (name, checked/onChange, description, size, label press) — ✓ done (`5f484a8`) (High, Small)
20. [DatePicker](component-backlog/date-picker.md) (High, Large)
21. [BrandLogo](component-backlog/brand-logo.md) (Medium, Small)
22. [Popconfirm](component-backlog/popconfirm.md) (Medium, Small)
23. **R-empty-state** — EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) — ✓ done (`7ca2284`) (Medium, Small)
24. **R-spinner** — Spinner parity (xs–xl, two-tone ring, md ≠ sm) — partial: sizes fixed in `4ebda43`; two-tone ring still missing (Medium, Small)
25. [StarRating](component-backlog/star-rating.md) (Medium, Small)
26. [StatCard](component-backlog/stat-card.md) (Medium, Small)
27. [Statistic](component-backlog/statistic.md) (Medium, Small)
28. [TabButton](component-backlog/tab-button.md) (Medium, Small)
29. [Timeline](component-backlog/timeline.md) (Medium, Small)
30. [FileInput](component-backlog/file-input.md) (Medium, Medium)
31. [Slider](component-backlog/slider.md) (Medium, Medium)
32. [Table](component-backlog/table.md) (Medium, Medium)
33. [TagInput](component-backlog/tag-input.md) (Medium, Medium)
34. [TimePicker](component-backlog/time-picker.md) (Medium, Medium)
35. [ComboBox](component-backlog/combo-box.md) (Medium, Large)
36. [DateRangePicker](component-backlog/date-range-picker.md) (Medium, Large)

## Wave 3

[Chart](component-backlog/chart.md) · [ContentScoreBar](component-backlog/content-score-bar.md) · [ScrollArea](component-backlog/scroll-area.md) · [SkipLink + LiveRegion](component-backlog/skip-link.md) _(exception)_ · [ViewToggle](component-backlog/view-toggle.md) · [BulkActionTable](component-backlog/bulk-action-table.md) · [ColorPicker](component-backlog/color-picker.md) · [DataTable](component-backlog/data-table.md) · [DiffViewer](component-backlog/diff-viewer.md) · [TreeView](component-backlog/tree-view.md) · [AdvancedDataTable](component-backlog/advanced-data-table.md) · [MapView](component-backlog/map-view.md) · [VideoPlayer](component-backlog/video-player.md)
