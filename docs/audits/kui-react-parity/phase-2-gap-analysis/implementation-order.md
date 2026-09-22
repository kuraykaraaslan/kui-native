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
| 8 | R-overlay-core: Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` | remediation | Critical | Medium | W1 | — |
| 9 | [Drawer](../component-backlog/drawer.md) | new component | Critical | Medium | W1 | R-overlay-core |
| 10 | R-input: Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) | remediation | Critical | Medium | W1 | R-field-shell |
| 11 | R-modal: Modal rewrite (see rewrite-candidates.md) | remediation | Critical | Medium | W1 | R-overlay-core |
| 12 | [Select](../component-backlog/select.md) | new component | Critical | Medium | W1 | R-overlay-core, R-field-shell |
| 13 | [Toast](../component-backlog/toast.md) | new component | Critical | Medium | W1 | — |
| 14 | R-fa-version: Align Font Awesome to v7 (KuiReact peer range `>=7`) | remediation | High | Small | W1 | — |
| 15 | R-infra-parity: Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | remediation | High | Medium | W2 | R-infra-test |
| 16 | [Accordion](../component-backlog/accordion.md) | new component | High | Small | W2 | — |
| 17 | [ButtonGroup](../component-backlog/button-group.md) | new component | High | Small | W2 | — |
| 18 | [CheckboxGroup](../component-backlog/checkbox-group.md) | new component | High | Small | W2 | R-field-shell |
| 19 | [PageHeader](../component-backlog/page-header.md) | new component | High | Small | W2 | — |
| 20 | R-avatar: Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | remediation | High | Small | W2 | — |
| 21 | R-badge: Badge parity (children, `neutral`, sizes, dot, dismissible) | remediation | High | Small | W2 | — |
| 22 | R-shadow: Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | remediation | Medium | Small | W2 | — |
| 23 | R-card: Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | remediation | High | Small | W2 | R-shadow |
| 24 | R-checkbox: Checkbox parity (hint, error, uncontrolled `defaultChecked`) | remediation | High | Small | W2 | R-field-shell |
| 25 | R-skeleton: Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | remediation | High | Small | W2 | — |
| 26 | R-toggle: Switch → Toggle parity (name, checked/onChange, description, size, label press) | remediation | High | Small | W2 | — |
| 27 | [SearchBar](../component-backlog/search-bar.md) | new component | High | Small | W2 | R-field-shell |
| 28 | [Stepper](../component-backlog/stepper.md) | new component | High | Small | W2 | — |
| 29 | [Popover](../component-backlog/popover.md) | new component | Medium | Medium | W2 | R-overlay-core |
| 30 | [DropdownMenu](../component-backlog/dropdown-menu.md) | new component | High | Medium | W2 | R-overlay-core, popover, drawer |
| 31 | [MultiSelect](../component-backlog/multi-select.md) | new component | High | Medium | W2 | R-overlay-core, R-field-shell |
| 32 | [RangeSlider](../component-backlog/range-slider.md) | new component | High | Medium | W2 | — |
| 33 | [DatePicker](../component-backlog/date-picker.md) | new component | High | Large | W2 | R-overlay-core, R-field-shell |
| 34 | [BrandLogo](../component-backlog/brand-logo.md) | new component | Medium | Small | W2 | — |
| 35 | [Pagination](../component-backlog/pagination.md) | new component | Medium | Small | W2 | — |
| 36 | [Popconfirm](../component-backlog/popconfirm.md) | new component | Medium | Small | W2 | R-overlay-core, R-button, popover |
| 37 | R-empty-state: EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | remediation | Medium | Small | W2 | — |
| 38 | R-spinner: Spinner parity (xs–xl, two-tone ring, md ≠ sm) | remediation | Medium | Small | W2 | — |
| 39 | [StarRating](../component-backlog/star-rating.md) | new component | Medium | Small | W2 | — |
| 40 | [StatCard](../component-backlog/stat-card.md) | new component | Medium | Small | W2 | — |
| 41 | [Statistic](../component-backlog/statistic.md) | new component | Medium | Small | W2 | — |
| 42 | [TabButton](../component-backlog/tab-button.md) | new component | Medium | Small | W2 | — |
| 43 | [Timeline](../component-backlog/timeline.md) | new component | Medium | Small | W2 | — |
| 44 | [FileInput](../component-backlog/file-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 45 | [Slider](../component-backlog/slider.md) | new component | Medium | Medium | W2 | — |
| 46 | [Table](../component-backlog/table.md) | new component | Medium | Medium | W2 | — |
| 47 | [TagInput](../component-backlog/tag-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 48 | [TimePicker](../component-backlog/time-picker.md) | new component | Medium | Medium | W2 | R-overlay-core, R-field-shell |
| 49 | [ComboBox](../component-backlog/combo-box.md) | new component | Medium | Large | W2 | R-overlay-core, R-field-shell |
| 50 | [DateRangePicker](../component-backlog/date-range-picker.md) | new component | Medium | Large | W2 | date-picker, R-overlay-core, R-field-shell |
| 51 | [Chart](../component-backlog/chart.md) | new component | Medium | Very Large | W3 | — |
| 52 | [Breadcrumb](../component-backlog/breadcrumb.md) | new component | Low | Small | W3 | — |
| 53 | [ContentScoreBar](../component-backlog/content-score-bar.md) | new component | Low | Small | W3 | — |
| 54 | [ScrollArea](../component-backlog/scroll-area.md) | new component | Low | Small | W3 | — |
| 55 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | new component | Low | Small | W3 | — |
| 56 | [Tooltip](../component-backlog/tooltip.md) | new component | Low | Small | W3 | popover, R-overlay-core |
| 57 | [ViewToggle](../component-backlog/view-toggle.md) | new component | Low | Small | W3 | — |
| 58 | [BulkActionTable](../component-backlog/bulk-action-table.md) | new component | Low | Medium | W3 | table |
| 59 | [ColorPicker](../component-backlog/color-picker.md) | new component | Low | Large | W3 | — |
| 60 | [DataTable](../component-backlog/data-table.md) | new component | Low | Large | W3 | pagination, table, search-bar |
| 61 | [DiffViewer](../component-backlog/diff-viewer.md) | new component | Low | Large | W3 | — |
| 62 | [TreeView](../component-backlog/tree-view.md) | new component | Low | Large | W3 | — |
| 63 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | new component | Low | Very Large | W3 | data-table, pagination, search-bar, R-spinner, dropdown-menu |
| 64 | [MapView](../component-backlog/map-view.md) | new component | Low | Very Large | W3 | R-button, R-card |
| 65 | [VideoPlayer](../component-backlog/video-player.md) | new component | Low | Very Large | W3 | — |