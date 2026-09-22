# Wave 2 — Core completion

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Required for strong parity. Finishes the remaining shared-component remediation (Badge, Card, Avatar/AvatarGroup, Checkbox, Toggle, Skeleton, Spinner, EmptyState, shadows), adds the parity contract tooling, and ports the remaining commonly-used ui-layer primitives.

**Exit criteria:** every shared component is PARITY_COMPLETE; every KuiReact ui-layer component with fit `direct`/`adapt` and priority ≥ Medium exists; `parity.exceptions.json` lists every deliberate gap and CI fails on an unexplained one.

## Totals

| | |
| --- | --- |
| Items | 36 (10 remediation of shared components/infra, 26 new components) |
| Estimated effort | 46.5–77 engineer-days (9.3–15.4 engineer-weeks) |
| By priority | Critical 0 · High 17 · Medium 19 · Low 0 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 15 | **R-infra-parity** Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | Medium | R-infra-test | 2–3 d | Makes this audit repeatable and CI-enforced (mirrors KuiReact ADR 0003). |
| 16 | [Accordion](../component-backlog/accordion.md) | High | Small | — | 0.5–1 d | Collapsible sections (FAQ, settings); common on mobile. |
| 17 | [ButtonGroup](../component-backlog/button-group.md) | High | Small | — | 0.5–1 d | Segmented control pattern (options/selected/onChange); very common on mobile. |
| 18 | [CheckboxGroup](../component-backlog/checkbox-group.md) | High | Small | R-field-shell | 0.5–1 d | Composes Checkbox; needed for multi-choice forms and filter panels. |
| 19 | [PageHeader](../component-backlog/page-header.md) | High | Small | — | 0.5–1 d | Screen title + subtitle + actions; every screen uses one. |
| 20 | **R-avatar** Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | High | Small | — | 0.5–1 d | AvatarGroup uses a children API; KuiReact uses data-driven `avatars/max/size` with overflow chip. |
| 21 | **R-badge** Badge parity (children, `neutral`, sizes, dot, dismissible) | High | Small | — | 0.5–1 d | Second most-imported KuiReact component (109 production imports); 60+ domain status badges wrap it. |
| 22 | **R-shadow** Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | Medium | Small | — | 0.5–1 d | No KuiNative component renders a shadow; KuiReact Card/Modal/Toggle do. |
| 23 | **R-card** Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | High | Small | R-shadow | 0.5–1 d | Layout differs (single padded box vs header/body/footer sections). |
| 24 | **R-checkbox** Checkbox parity (hint, error, uncontrolled `defaultChecked`) | High | Small | R-field-shell | 0.5–1 d | Error/hint states missing. |
| 25 | **R-skeleton** Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | High | Small | — | 0.5–1 d | 4 of 5 KuiReact skeleton exports missing. |
| 26 | **R-toggle** Switch → Toggle parity (name, checked/onChange, description, size, label press) | High | Small | — | 0.5–1 d | Different name and prop names; label is not pressable. |
| 27 | [SearchBar](../component-backlog/search-bar.md) | High | Small | R-field-shell | 0.5–1 d | Search is ubiquitous on mobile lists; KuiReact exposes value/onChange/onClear. |
| 28 | [Stepper](../component-backlog/stepper.md) | High | Small | — | 0.5–1 d | Step indicator used by wizards/checkout. |
| 29 | [Popover](../component-backlog/popover.md) | Medium | Medium | R-overlay-core | 2–3 d | Anchored floating panel; basis for Tooltip, DropdownMenu, Popconfirm. |
| 30 | [DropdownMenu](../component-backlog/dropdown-menu.md) | High | Medium | R-overlay-core, popover, drawer | 2–3 d | Action menus (items/danger/disabled/separator) are needed for list rows and headers. |
| 31 | [MultiSelect](../component-backlog/multi-select.md) | High | Medium | R-overlay-core, R-field-shell | 2–3 d | Multi-value selection used by filters and forms. |
| 32 | [RangeSlider](../component-backlog/range-slider.md) | High | Medium | — | 2–3 d | Numeric range input used by filters and settings. |
| 33 | [DatePicker](../component-backlog/date-picker.md) | High | Large | R-overlay-core, R-field-shell | 5–8 d | Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover. |
| 34 | [BrandLogo](../component-backlog/brand-logo.md) | Medium | Small | — | 0.5–1 d | Used by AppShell/AppFooter/SplashScreen; blocks those ports. |
| 35 | [Pagination](../component-backlog/pagination.md) | Medium | Small | — | 0.5–1 d | Page controls; mobile lists usually use infinite scroll, but tables/search results still need it. |
| 36 | [Popconfirm](../component-backlog/popconfirm.md) | Medium | Small | R-overlay-core, R-button, popover | 0.5–1 d | Inline confirmation for destructive actions. |
| 37 | **R-empty-state** EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | Medium | Small | — | 0.5–1 d | `actionLabel/onAction` cannot express KuiReact's arbitrary action node. |
| 38 | **R-spinner** Spinner parity (xs–xl, two-tone ring, md ≠ sm) | Medium | Small | — | 0.5–1 d | `sm` and `md` render identically; xs/xl missing. |
| 39 | [StarRating](../component-backlog/star-rating.md) | Medium | Small | — | 0.5–1 d | Rating display/input; used by reviews domain and 3 KuiReact components. |
| 40 | [StatCard](../component-backlog/stat-card.md) | Medium | Small | — | 0.5–1 d | Card-wrapped KPI. |
| 41 | [Statistic](../component-backlog/statistic.md) | Medium | Small | — | 0.5–1 d | Numeric KPI with trend/prefix/suffix; used in dashboards. |
| 42 | [TabButton](../component-backlog/tab-button.md) | Medium | Small | — | 0.5–1 d | Single tab button with count badge; building block of TabGroup. |
| 43 | [Timeline](../component-backlog/timeline.md) | Medium | Small | — | 0.5–1 d | Activity timeline grouped by day; used by domain feeds. |
| 44 | [FileInput](../component-backlog/file-input.md) | Medium | Medium | R-field-shell | 2–3 d | File selection; RN has no `<input type=file>`. |
| 45 | [Slider](../component-backlog/slider.md) | Medium | Medium | — | 2–3 d | Accessible carousel (autoPlay, dots, arrows, loop). |
| 46 | [Table](../component-backlog/table.md) | Medium | Medium | — | 2–3 d | Static data table; on phones tables need horizontal scroll or card fallback. |
| 47 | [TagInput](../component-backlog/tag-input.md) | Medium | Medium | R-field-shell | 2–3 d | Chip entry with suggestions; composes Badge(dismissible). |
| 48 | [TimePicker](../component-backlog/time-picker.md) | Medium | Medium | R-overlay-core, R-field-shell | 2–3 d | Time entry companion to DatePicker. |
| 49 | [ComboBox](../component-backlog/combo-box.md) | Medium | Large | R-overlay-core, R-field-shell | 5–8 d | Async-searchable single select; needed for large option sets. |
| 50 | [DateRangePicker](../component-backlog/date-range-picker.md) | Medium | Large | date-picker, R-overlay-core, R-field-shell | 5–8 d | Range selection for filters/bookings; shares DatePicker internals. |