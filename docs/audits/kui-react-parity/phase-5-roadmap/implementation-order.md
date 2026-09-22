# Implementation order

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Single ordered list across all waves (dependencies always precede dependants; a dependency is pulled into an earlier wave when needed).

| # | Wave | Item | Priority | Complexity | Blocked by | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | **R-infra-test** Test harness: Jest + @testing-library/react-native + CI | Critical | Medium | — | 2–3 d |
| 2 | 1 | **R-infra-package** Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | Critical | Large | — | 5–8 d |
| 3 | 1 | **R-infra-lint** ESLint (expo + a11y), token/raw-hex audit, convention rules | High | Small | — | 0.5–1 d |
| 4 | 1 | **R-button** Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) | Critical | Small | — | 0.5–1 d |
| 5 | 1 | **R-field-shell** Extract FieldShell (Label, hint, error, success, count) shared by all form controls | Critical | Small | label | 0.5–1 d |
| 6 | 1 | **R-theme-provider** Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | Critical | Small | R-infra-package | 0.5–1 d |
| 7 | 1 | **R-typography** Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage | Critical | Small | — | 0.5–1 d |
| 8 | 1 | **R-overlay-core** Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` | Critical | Medium | — | 2–3 d |
| 9 | 1 | [Drawer](../component-backlog/drawer.md) | Critical | Medium | R-overlay-core | 2–3 d |
| 10 | 1 | **R-input** Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) | Critical | Medium | R-field-shell | 2–3 d |
| 11 | 1 | **R-modal** Modal rewrite (see rewrite-candidates.md) | Critical | Medium | R-overlay-core | 2–3 d |
| 12 | 1 | [Select](../component-backlog/select.md) | Critical | Medium | R-overlay-core, R-field-shell | 2–3 d |
| 13 | 1 | [Toast](../component-backlog/toast.md) | Critical | Medium | — | 2–3 d |
| 14 | 1 | **R-fa-version** Align Font Awesome to v7 (KuiReact peer range `>=7`) | High | Small | — | 0.5–1 d |
| 15 | 2 | **R-infra-parity** Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | Medium | R-infra-test | 2–3 d |
| 16 | 2 | [Accordion](../component-backlog/accordion.md) | High | Small | — | 0.5–1 d |
| 17 | 2 | [ButtonGroup](../component-backlog/button-group.md) | High | Small | — | 0.5–1 d |
| 18 | 2 | [CheckboxGroup](../component-backlog/checkbox-group.md) | High | Small | R-field-shell | 0.5–1 d |
| 19 | 2 | [PageHeader](../component-backlog/page-header.md) | High | Small | — | 0.5–1 d |
| 20 | 2 | **R-avatar** Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | High | Small | — | 0.5–1 d |
| 21 | 2 | **R-badge** Badge parity (children, `neutral`, sizes, dot, dismissible) | High | Small | — | 0.5–1 d |
| 22 | 2 | **R-shadow** Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | Medium | Small | — | 0.5–1 d |
| 23 | 2 | **R-card** Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | High | Small | R-shadow | 0.5–1 d |
| 24 | 2 | **R-checkbox** Checkbox parity (hint, error, uncontrolled `defaultChecked`) | High | Small | R-field-shell | 0.5–1 d |
| 25 | 2 | **R-skeleton** Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | High | Small | — | 0.5–1 d |
| 26 | 2 | **R-toggle** Switch → Toggle parity (name, checked/onChange, description, size, label press) | High | Small | — | 0.5–1 d |
| 27 | 2 | [SearchBar](../component-backlog/search-bar.md) | High | Small | R-field-shell | 0.5–1 d |
| 28 | 2 | [Stepper](../component-backlog/stepper.md) | High | Small | — | 0.5–1 d |
| 29 | 2 | [Popover](../component-backlog/popover.md) | Medium | Medium | R-overlay-core | 2–3 d |
| 30 | 2 | [DropdownMenu](../component-backlog/dropdown-menu.md) | High | Medium | R-overlay-core, popover, drawer | 2–3 d |
| 31 | 2 | [MultiSelect](../component-backlog/multi-select.md) | High | Medium | R-overlay-core, R-field-shell | 2–3 d |
| 32 | 2 | [RangeSlider](../component-backlog/range-slider.md) | High | Medium | — | 2–3 d |
| 33 | 2 | [DatePicker](../component-backlog/date-picker.md) | High | Large | R-overlay-core, R-field-shell | 5–8 d |
| 34 | 2 | [BrandLogo](../component-backlog/brand-logo.md) | Medium | Small | — | 0.5–1 d |
| 35 | 2 | [Pagination](../component-backlog/pagination.md) | Medium | Small | — | 0.5–1 d |
| 36 | 2 | [Popconfirm](../component-backlog/popconfirm.md) | Medium | Small | R-overlay-core, R-button, popover | 0.5–1 d |
| 37 | 2 | **R-empty-state** EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | Medium | Small | — | 0.5–1 d |
| 38 | 2 | **R-spinner** Spinner parity (xs–xl, two-tone ring, md ≠ sm) | Medium | Small | — | 0.5–1 d |
| 39 | 2 | [StarRating](../component-backlog/star-rating.md) | Medium | Small | — | 0.5–1 d |
| 40 | 2 | [StatCard](../component-backlog/stat-card.md) | Medium | Small | — | 0.5–1 d |
| 41 | 2 | [Statistic](../component-backlog/statistic.md) | Medium | Small | — | 0.5–1 d |
| 42 | 2 | [TabButton](../component-backlog/tab-button.md) | Medium | Small | — | 0.5–1 d |
| 43 | 2 | [Timeline](../component-backlog/timeline.md) | Medium | Small | — | 0.5–1 d |
| 44 | 2 | [FileInput](../component-backlog/file-input.md) | Medium | Medium | R-field-shell | 2–3 d |
| 45 | 2 | [Slider](../component-backlog/slider.md) | Medium | Medium | — | 2–3 d |
| 46 | 2 | [Table](../component-backlog/table.md) | Medium | Medium | — | 2–3 d |
| 47 | 2 | [TagInput](../component-backlog/tag-input.md) | Medium | Medium | R-field-shell | 2–3 d |
| 48 | 2 | [TimePicker](../component-backlog/time-picker.md) | Medium | Medium | R-overlay-core, R-field-shell | 2–3 d |
| 49 | 2 | [ComboBox](../component-backlog/combo-box.md) | Medium | Large | R-overlay-core, R-field-shell | 5–8 d |
| 50 | 2 | [DateRangePicker](../component-backlog/date-range-picker.md) | Medium | Large | date-picker, R-overlay-core, R-field-shell | 5–8 d |
| 51 | 3 | [Chart](../component-backlog/chart.md) | Medium | Very Large | — | 10–20 d |
| 52 | 3 | [Breadcrumb](../component-backlog/breadcrumb.md) | Low | Small | — | 0.5–1 d |
| 53 | 3 | [ContentScoreBar](../component-backlog/content-score-bar.md) | Low | Small | — | 0.5–1 d |
| 54 | 3 | [ScrollArea](../component-backlog/scroll-area.md) | Low | Small | — | 0.5–1 d |
| 55 | 3 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | Small | — | 0.5–1 d |
| 56 | 3 | [Tooltip](../component-backlog/tooltip.md) | Low | Small | popover, R-overlay-core | 0.5–1 d |
| 57 | 3 | [ViewToggle](../component-backlog/view-toggle.md) | Low | Small | — | 0.5–1 d |
| 58 | 3 | [BulkActionTable](../component-backlog/bulk-action-table.md) | Low | Medium | table | 2–3 d |
| 59 | 3 | [ColorPicker](../component-backlog/color-picker.md) | Low | Large | — | 5–8 d |
| 60 | 3 | [DataTable](../component-backlog/data-table.md) | Low | Large | pagination, table, search-bar | 5–8 d |
| 61 | 3 | [DiffViewer](../component-backlog/diff-viewer.md) | Low | Large | — | 5–8 d |
| 62 | 3 | [TreeView](../component-backlog/tree-view.md) | Low | Large | — | 5–8 d |
| 63 | 3 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Low | Very Large | data-table, pagination, search-bar, R-spinner, dropdown-menu | 10–20 d |
| 64 | 3 | [MapView](../component-backlog/map-view.md) | Low | Very Large | R-button, R-card | 10–20 d |
| 65 | 3 | [VideoPlayer](../component-backlog/video-player.md) | Low | Very Large | — | 10–20 d |

After #65: domain verticals per [wave-3-advanced.md](wave-3-advanced.md).
