# Implementation order (dependency-driven)

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Topologically sorted by wave → priority → dependency. Domain components follow once their primitives exist and are not listed individually.

| # | Item | Kind | Priority | Complexity | Wave | Blocked by |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | R-infra-test: Test harness: Jest + @testing-library/react-native + CI | remediation | Critical | Medium | W1 | — |
| 2 | R-infra-package: Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | remediation | Critical | Large | W1 | — |
| 3 | R-infra-lint: ESLint (expo + a11y), token/raw-hex audit, convention rules | remediation | High | Small | W1 | — |
| 4 | R-button: Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) | remediation | Critical | Small | W1 | — |
| 5 | R-field-shell: Extract FieldShell (Label, hint, error, success, count) shared by all form controls | remediation | Critical | Small | W1 | label |
| 6 | R-theme-provider: Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | remediation | Critical | Small | W1 | R-infra-package |
| 7 | R-typography: Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage | remediation | Critical | Small | W1 | — |
| 8 | R-input: Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) | remediation | Critical | Medium | W1 | R-field-shell |
| 9 | R-overlay-core: Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` | remediation | Critical | Medium | W1 | — |
| 10 | R-modal: Modal rewrite (see rewrite-candidates.md) | remediation | Critical | Medium | W1 | R-overlay-core |
| 11 | R-fa-version: Align Font Awesome to v7 (KuiReact peer range `>=7`) | remediation | High | Small | W1 | — |
| 12 | R-infra-parity: Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | remediation | High | Medium | W2 | R-infra-test |
| 13 | [Accordion](../component-backlog/accordion.md) | new component | High | Small | W2 | — |
| 14 | [ButtonGroup](../component-backlog/button-group.md) | new component | High | Small | W2 | — |
| 15 | [CheckboxGroup](../component-backlog/checkbox-group.md) | new component | High | Small | W2 | R-field-shell |
| 16 | [PageHeader](../component-backlog/page-header.md) | new component | High | Small | W2 | — |
| 17 | R-avatar: Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | remediation | High | Small | W2 | — |
| 18 | R-badge: Badge parity (children, `neutral`, sizes, dot, dismissible) | remediation | High | Small | W2 | — |
| 19 | R-shadow: Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | remediation | Medium | Small | W2 | — |
| 20 | R-card: Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | remediation | High | Small | W2 | R-shadow |
| 21 | R-checkbox: Checkbox parity (hint, error, uncontrolled `defaultChecked`) | remediation | High | Small | W2 | R-field-shell |
| 22 | R-skeleton: Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | remediation | High | Small | W2 | — |
| 23 | R-toggle: Switch → Toggle parity (name, checked/onChange, description, size, label press) | remediation | High | Small | W2 | — |
| 24 | [SearchBar](../component-backlog/search-bar.md) | new component | High | Small | W2 | R-field-shell |
| 25 | [Stepper](../component-backlog/stepper.md) | new component | High | Small | W2 | — |
| 26 | [Popover](../component-backlog/popover.md) | new component | Medium | Medium | W2 | R-overlay-core |
| 27 | [DropdownMenu](../component-backlog/dropdown-menu.md) | new component | High | Medium | W2 | R-overlay-core, popover |
| 28 | [MultiSelect](../component-backlog/multi-select.md) | new component | High | Medium | W2 | R-overlay-core, R-field-shell |
| 29 | [RangeSlider](../component-backlog/range-slider.md) | new component | High | Medium | W2 | — |
| 30 | [DatePicker](../component-backlog/date-picker.md) | new component | High | Large | W2 | R-overlay-core, R-field-shell |
| 31 | [BrandLogo](../component-backlog/brand-logo.md) | new component | Medium | Small | W2 | — |
| 32 | [Pagination](../component-backlog/pagination.md) | new component | Medium | Small | W2 | — |
| 33 | [Popconfirm](../component-backlog/popconfirm.md) | new component | Medium | Small | W2 | R-overlay-core, R-button, popover |
| 34 | R-empty-state: EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | remediation | Medium | Small | W2 | — |
| 35 | R-spinner: Spinner parity (xs–xl, two-tone ring, md ≠ sm) | remediation | Medium | Small | W2 | — |
| 36 | [StarRating](../component-backlog/star-rating.md) | new component | Medium | Small | W2 | — |
| 37 | [StatCard](../component-backlog/stat-card.md) | new component | Medium | Small | W2 | — |
| 38 | [Statistic](../component-backlog/statistic.md) | new component | Medium | Small | W2 | — |
| 39 | [TabButton](../component-backlog/tab-button.md) | new component | Medium | Small | W2 | — |
| 40 | [Timeline](../component-backlog/timeline.md) | new component | Medium | Small | W2 | — |
| 41 | [FileInput](../component-backlog/file-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 42 | [Slider](../component-backlog/slider.md) | new component | Medium | Medium | W2 | — |
| 43 | [Table](../component-backlog/table.md) | new component | Medium | Medium | W2 | — |
| 44 | [TagInput](../component-backlog/tag-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 45 | [TimePicker](../component-backlog/time-picker.md) | new component | Medium | Medium | W2 | R-overlay-core, R-field-shell |
| 46 | [ComboBox](../component-backlog/combo-box.md) | new component | Medium | Large | W2 | R-overlay-core, R-field-shell |
| 47 | [DateRangePicker](../component-backlog/date-range-picker.md) | new component | Medium | Large | W2 | date-picker, R-overlay-core, R-field-shell |
| 48 | [Chart](../component-backlog/chart.md) | new component | Medium | Very Large | W3 | — |
| 49 | [Breadcrumb](../component-backlog/breadcrumb.md) | new component | Low | Small | W3 | — |
| 50 | [ContentScoreBar](../component-backlog/content-score-bar.md) | new component | Low | Small | W3 | — |
| 51 | [ScrollArea](../component-backlog/scroll-area.md) | new component | Low | Small | W3 | — |
| 52 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | new component | Low | Small | W3 | — |
| 53 | [Tooltip](../component-backlog/tooltip.md) | new component | Low | Small | W3 | popover, R-overlay-core |
| 54 | [ViewToggle](../component-backlog/view-toggle.md) | new component | Low | Small | W3 | — |
| 55 | [BulkActionTable](../component-backlog/bulk-action-table.md) | new component | Low | Medium | W3 | table |
| 56 | [ColorPicker](../component-backlog/color-picker.md) | new component | Low | Large | W3 | — |
| 57 | [DataTable](../component-backlog/data-table.md) | new component | Low | Large | W3 | pagination, table, search-bar |
| 58 | [DiffViewer](../component-backlog/diff-viewer.md) | new component | Low | Large | W3 | — |
| 59 | [TreeView](../component-backlog/tree-view.md) | new component | Low | Large | W3 | — |
| 60 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | new component | Low | Very Large | W3 | data-table, pagination, search-bar, R-spinner, dropdown-menu |
| 61 | [MapView](../component-backlog/map-view.md) | new component | Low | Very Large | W3 | R-button, R-card |
| 62 | [VideoPlayer](../component-backlog/video-player.md) | new component | Low | Very Large | W3 | — |