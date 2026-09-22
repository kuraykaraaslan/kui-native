# Implementation order (dependency-driven)

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Topologically sorted by wave → priority → dependency. Domain components follow once their primitives exist and are not listed individually.

| # | Item | Kind | Priority | Complexity | Wave | Blocked by |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | R-infra-test: Test harness: Jest + @testing-library/react-native + CI — partial: Jest + RNTL harness since `4ebda43`; CI still missing | remediation | Critical | Medium | W1 | — |
| 2 | R-infra-package: Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | remediation | Critical | Large | W1 | — |
| 3 | R-infra-lint: ESLint (expo + a11y), token/raw-hex audit, convention rules | remediation | High | Small | W1 | — |
| 4 | R-button: Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) — ✓ done (`2866e66`) | remediation | Critical | Small | W1 | — |
| 5 | R-field-shell: Extract FieldShell (Label, hint, error, success, count) shared by all form controls | remediation | Critical | Small | W1 | label |
| 6 | R-theme-provider: Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | remediation | Critical | Small | W1 | R-infra-package |
| 7 | R-typography: Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage — partial: weights fixed (`048ebed`, `2866e66`); Geist not bundled | remediation | Critical | Small | W1 | — |
| 8 | R-input: Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) — ✓ done (`92af9a3`) | remediation | Critical | Medium | W1 | R-field-shell |
| 9 | R-overlay-core: Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` — ✓ done (`27def3b`, anchored panels `68ce86d`) | remediation | Critical | Medium | W1 | — |
| 10 | R-modal: Modal rewrite (see rewrite-candidates.md) — ✓ done (`27def3b`) | remediation | Critical | Medium | W1 | R-overlay-core |
| 11 | R-fa-version: Align Font Awesome to v7 (KuiReact peer range `>=7`) | remediation | High | Small | W1 | — |
| 12 | R-infra-parity: Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | remediation | High | Medium | W2 | R-infra-test |
| 13 | R-avatar: Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite — ✓ done (`599c8a1`) | remediation | High | Small | W2 | — |
| 14 | R-badge: Badge parity (children, `neutral`, sizes, dot, dismissible) — ✓ done (`3e48fad`) | remediation | High | Small | W2 | — |
| 15 | R-shadow: Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) — ✓ done (`048ebed`: shadow classes + Android elevation) | remediation | Medium | Small | W2 | — |
| 16 | R-card: Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) — ✓ done (`dbdbdbd`) | remediation | High | Small | W2 | R-shadow |
| 17 | R-checkbox: Checkbox parity (hint, error, uncontrolled `defaultChecked`) — ✓ done (`75edb0c`) | remediation | High | Small | W2 | R-field-shell |
| 18 | R-skeleton: Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion — partial: Line / Avatar / Text since `048ebed`; SkeletonTableRow waits for Table | remediation | High | Small | W2 | — |
| 19 | R-toggle: Switch → Toggle parity (name, checked/onChange, description, size, label press) — ✓ done (`5f484a8`) | remediation | High | Small | W2 | — |
| 20 | [DatePicker](../component-backlog/date-picker.md) | new component | High | Large | W2 | R-overlay-core, R-field-shell |
| 21 | [BrandLogo](../component-backlog/brand-logo.md) | new component | Medium | Small | W2 | — |
| 22 | [Popconfirm](../component-backlog/popconfirm.md) | new component | Medium | Small | W2 | R-overlay-core, R-button |
| 23 | R-empty-state: EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) — ✓ done (`7ca2284`) | remediation | Medium | Small | W2 | — |
| 24 | R-spinner: Spinner parity (xs–xl, two-tone ring, md ≠ sm) — partial: sizes fixed in `4ebda43`; two-tone ring still missing | remediation | Medium | Small | W2 | — |
| 25 | [StarRating](../component-backlog/star-rating.md) | new component | Medium | Small | W2 | — |
| 26 | [StatCard](../component-backlog/stat-card.md) | new component | Medium | Small | W2 | — |
| 27 | [Statistic](../component-backlog/statistic.md) | new component | Medium | Small | W2 | — |
| 28 | [TabButton](../component-backlog/tab-button.md) | new component | Medium | Small | W2 | — |
| 29 | [Timeline](../component-backlog/timeline.md) | new component | Medium | Small | W2 | — |
| 30 | [FileInput](../component-backlog/file-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 31 | [Slider](../component-backlog/slider.md) | new component | Medium | Medium | W2 | — |
| 32 | [Table](../component-backlog/table.md) | new component | Medium | Medium | W2 | — |
| 33 | [TagInput](../component-backlog/tag-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 34 | [TimePicker](../component-backlog/time-picker.md) | new component | Medium | Medium | W2 | R-overlay-core, R-field-shell |
| 35 | [ComboBox](../component-backlog/combo-box.md) | new component | Medium | Large | W2 | R-overlay-core, R-field-shell |
| 36 | [DateRangePicker](../component-backlog/date-range-picker.md) | new component | Medium | Large | W2 | date-picker, R-overlay-core, R-field-shell |
| 37 | [Chart](../component-backlog/chart.md) | new component | Medium | Very Large | W3 | — |
| 38 | [ContentScoreBar](../component-backlog/content-score-bar.md) | new component | Low | Small | W3 | — |
| 39 | [ScrollArea](../component-backlog/scroll-area.md) | new component | Low | Small | W3 | — |
| 40 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | new component | Low | Small | W3 | — |
| 41 | [ViewToggle](../component-backlog/view-toggle.md) | new component | Low | Small | W3 | — |
| 42 | [BulkActionTable](../component-backlog/bulk-action-table.md) | new component | Low | Medium | W3 | table |
| 43 | [ColorPicker](../component-backlog/color-picker.md) | new component | Low | Large | W3 | — |
| 44 | [DataTable](../component-backlog/data-table.md) | new component | Low | Large | W3 | table |
| 45 | [DiffViewer](../component-backlog/diff-viewer.md) | new component | Low | Large | W3 | — |
| 46 | [TreeView](../component-backlog/tree-view.md) | new component | Low | Large | W3 | — |
| 47 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | new component | Low | Very Large | W3 | data-table, R-spinner |
| 48 | [MapView](../component-backlog/map-view.md) | new component | Low | Very Large | W3 | R-button, R-card |
| 49 | [VideoPlayer](../component-backlog/video-player.md) | new component | Low | Very Large | W3 | — |