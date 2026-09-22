# 08 · Roadmap

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Detail: [wave-1-critical.md](phase-5-roadmap/wave-1-critical.md) · [wave-2-core-completion.md](phase-5-roadmap/wave-2-core-completion.md) · [wave-3-advanced.md](phase-5-roadmap/wave-3-advanced.md) · [implementation-order.md](phase-5-roadmap/implementation-order.md)

## Summary

| Wave | Goal | Items | Effort (engineer-days) |
| --- | --- | --- | --- |
| 1 — Critical | Installable, themed, tested library; Button/Input/Modal at parity; baseline form, feedback, overlay and navigation primitives | 11 | 16–26 |
| 2 — Core completion | All shared components at parity; parity contract in CI; remaining ui-layer primitives | 36 | 46.5–77 |
| 3 — Advanced | Heavy organisms, desktop-web patterns (mostly exceptions) | 15 | 65–121 |

Estimates assume one engineer familiar with both codebases, Small 0.5–1 d · Medium 2–3 d · Large 5–8 d · Very Large 10–20 d, including tests and a showcase entry. Scope is KuiReact's ui-layer atoms, molecules and organisms only — app-layer components, domain verticals and theme demos are excluded by decision (see [missing-components.md](phase-2-gap-analysis/missing-components.md#scope)).

## Wave 1 in order

1. **R-infra-test** — Test harness: Jest + @testing-library/react-native + CI (Critical, Medium)
2. **R-infra-package** — Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) (Critical, Large)
3. **R-infra-lint** — ESLint (expo + a11y), token/raw-hex audit, convention rules (High, Small)
4. **R-button** — Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) (Critical, Small)
5. **R-field-shell** — Extract FieldShell (Label, hint, error, success, count) shared by all form controls (Critical, Small; after label)
6. **R-theme-provider** — Export a `KuiProvider` (token `vars()` + scheme resolution) from the library (Critical, Small; after R-infra-package)
7. **R-typography** — Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage (Critical, Small)
8. **R-input** — Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) (Critical, Medium; after R-field-shell)
9. **R-overlay-core** — Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` (Critical, Medium)
10. **R-modal** — Modal rewrite (see rewrite-candidates.md) (Critical, Medium; after R-overlay-core)
11. **R-fa-version** — Align Font Awesome to v7 (KuiReact peer range `>=7`) (High, Small)

## Wave 2 in order

12. **R-infra-parity** — Parity contract: `parity.exceptions.json`, generated parity matrix, component registry (High, Medium)
13. [Accordion](component-backlog/accordion.md) (High, Small)
14. [ButtonGroup](component-backlog/button-group.md) (High, Small)
15. [CheckboxGroup](component-backlog/checkbox-group.md) (High, Small)
16. [PageHeader](component-backlog/page-header.md) (High, Small)
17. **R-avatar** — Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite (High, Small)
18. **R-badge** — Badge parity (children, `neutral`, sizes, dot, dismissible) (High, Small)
19. **R-shadow** — Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) (Medium, Small)
20. **R-card** — Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) (High, Small)
21. **R-checkbox** — Checkbox parity (hint, error, uncontrolled `defaultChecked`) (High, Small)
22. **R-skeleton** — Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion (High, Small)
23. **R-toggle** — Switch → Toggle parity (name, checked/onChange, description, size, label press) (High, Small)
24. [SearchBar](component-backlog/search-bar.md) (High, Small)
25. [Stepper](component-backlog/stepper.md) (High, Small)
26. [Popover](component-backlog/popover.md) (Medium, Medium)
27. [DropdownMenu](component-backlog/dropdown-menu.md) (High, Medium)
28. [MultiSelect](component-backlog/multi-select.md) (High, Medium)
29. [RangeSlider](component-backlog/range-slider.md) (High, Medium)
30. [DatePicker](component-backlog/date-picker.md) (High, Large)
31. [BrandLogo](component-backlog/brand-logo.md) (Medium, Small)
32. [Pagination](component-backlog/pagination.md) (Medium, Small)
33. [Popconfirm](component-backlog/popconfirm.md) (Medium, Small)
34. **R-empty-state** — EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) (Medium, Small)
35. **R-spinner** — Spinner parity (xs–xl, two-tone ring, md ≠ sm) (Medium, Small)
36. [StarRating](component-backlog/star-rating.md) (Medium, Small)
37. [StatCard](component-backlog/stat-card.md) (Medium, Small)
38. [Statistic](component-backlog/statistic.md) (Medium, Small)
39. [TabButton](component-backlog/tab-button.md) (Medium, Small)
40. [Timeline](component-backlog/timeline.md) (Medium, Small)
41. [FileInput](component-backlog/file-input.md) (Medium, Medium)
42. [Slider](component-backlog/slider.md) (Medium, Medium)
43. [Table](component-backlog/table.md) (Medium, Medium)
44. [TagInput](component-backlog/tag-input.md) (Medium, Medium)
45. [TimePicker](component-backlog/time-picker.md) (Medium, Medium)
46. [ComboBox](component-backlog/combo-box.md) (Medium, Large)
47. [DateRangePicker](component-backlog/date-range-picker.md) (Medium, Large)

## Wave 3

[Chart](component-backlog/chart.md) · [Breadcrumb](component-backlog/breadcrumb.md) · [ContentScoreBar](component-backlog/content-score-bar.md) · [ScrollArea](component-backlog/scroll-area.md) · [SkipLink + LiveRegion](component-backlog/skip-link.md) _(exception)_ · [Tooltip](component-backlog/tooltip.md) · [ViewToggle](component-backlog/view-toggle.md) · [BulkActionTable](component-backlog/bulk-action-table.md) · [ColorPicker](component-backlog/color-picker.md) · [DataTable](component-backlog/data-table.md) · [DiffViewer](component-backlog/diff-viewer.md) · [TreeView](component-backlog/tree-view.md) · [AdvancedDataTable](component-backlog/advanced-data-table.md) · [MapView](component-backlog/map-view.md) · [VideoPlayer](component-backlog/video-player.md)
