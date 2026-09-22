# Wave 2 — Core completion

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Required for strong parity. Finishes the remaining shared-component remediation (Badge, Card, Avatar/AvatarGroup, Checkbox, Toggle, Skeleton, Spinner, EmptyState, shadows), adds the parity contract tooling, and ports the remaining commonly-used ui/app primitives.

**Exit criteria:** every shared component is PARITY_COMPLETE; every KuiReact ui-layer component with fit `direct`/`adapt` and priority ≥ Medium exists; `parity.exceptions.json` lists every deliberate gap and CI fails on an unexplained one.

## Totals

| | |
| --- | --- |
| Items | 54 (8 remediation of shared components/infra, 46 new components) |
| Estimated effort | 74–126 engineer-days (14.8–25.2 engineer-weeks) |
| By priority | Critical 0 · High 22 · Medium 30 · Low 2 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 29 | **R-infra-parity** Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | Medium | R-infra-test | 2–3 d | Makes this audit repeatable and CI-enforced (mirrors KuiReact ADR 0003). |
| 30 | [Accordion](../component-backlog/accordion.md) | High | Small | — | 0.5–1 d | Collapsible sections (FAQ, settings); common on mobile. |
| 31 | [ButtonGroup](../component-backlog/button-group.md) | High | Small | — | 0.5–1 d | Segmented control pattern (options/selected/onChange); very common on mobile. |
| 32 | [CheckboxGroup](../component-backlog/checkbox-group.md) | High | Small | R-field-shell | 0.5–1 d | Composes Checkbox; needed for multi-choice forms and filter panels. |
| 33 | [Form](../component-backlog/form.md) | High | Small | alert-banner | 0.5–1 d | Form layout shell: title, description, error banner, grid, actions. |
| 34 | [FormField](../component-backlog/form-field.md) | High | Small | — | 0.5–1 d | react-hook-form bridge (render-prop) — exported but not in registry. |
| 35 | [InlineAlert](../component-backlog/inline-alert.md) | High | Small | — | 0.5–1 d | Compact inline alert used inside forms/cards. |
| 36 | [PageHeader](../component-backlog/page-header.md) | High | Small | — | 0.5–1 d | Screen title + subtitle + actions; every screen uses one. |
| 37 | **R-avatar** Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | High | Small | — | 0.5–1 d | AvatarGroup uses a children API; KuiReact uses data-driven `avatars/max/size` with overflow chip. |
| 38 | **R-badge** Badge parity (children, `neutral`, sizes, dot, dismissible) | High | Small | — | 0.5–1 d | Second most-imported KuiReact component (109 production imports); 60+ domain status badges wrap it. |
| 39 | **R-shadow** Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | Medium | Small | — | 0.5–1 d | No KuiNative component renders a shadow; KuiReact Card/Modal/Toggle do. |
| 40 | **R-card** Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | High | Small | R-shadow | 0.5–1 d | Layout differs (single padded box vs header/body/footer sections). |
| 41 | **R-checkbox** Checkbox parity (hint, error, uncontrolled `defaultChecked`) | High | Small | R-field-shell | 0.5–1 d | Error/hint states missing. |
| 42 | **R-skeleton** Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | High | Small | — | 0.5–1 d | 4 of 5 KuiReact skeleton exports missing. |
| 43 | **R-toggle** Switch → Toggle parity (name, checked/onChange, description, size, label press) | High | Small | — | 0.5–1 d | Different name and prop names; label is not pressable. |
| 44 | [SearchBar](../component-backlog/search-bar.md) | High | Small | R-field-shell | 0.5–1 d | Search is ubiquitous on mobile lists; KuiReact exposes value/onChange/onClear. |
| 45 | [SectionCard](../component-backlog/section-card.md) | High | Small | — | 0.5–1 d | Titled card section for grouping form/content blocks — the settings-screen building block. |
| 46 | [Stepper](../component-backlog/stepper.md) | High | Small | — | 0.5–1 d | Step indicator used by wizards/checkout. |
| 47 | [Popover](../component-backlog/popover.md) | Medium | Medium | R-overlay-core | 2–3 d | Anchored floating panel; basis for Tooltip, DropdownMenu, Popconfirm. |
| 48 | [DropdownMenu](../component-backlog/dropdown-menu.md) | High | Medium | R-overlay-core, popover, drawer | 2–3 d | Action menus (items/danger/disabled/separator) are needed for list rows and headers. |
| 49 | [ThemeSwitcher](../component-backlog/theme-switcher.md) | High | Small | dropdown-menu, R-button, R-theme-provider | 0.5–1 d | KuiReact ships ThemeSwitcher in the library; KuiNative keeps its ThemeToggle in the showcase only, so consumers get no theme control. |
| 50 | [MultiSelect](../component-backlog/multi-select.md) | High | Medium | R-overlay-core, R-field-shell | 2–3 d | Multi-value selection used by filters and forms. |
| 51 | [RangeSlider](../component-backlog/range-slider.md) | High | Medium | — | 2–3 d | Numeric range input used by filters and settings. |
| 52 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | Small | — | 0.5–1 d | Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibilit… _(pulled into this wave because calendar depends on it)_ |
| 53 | [Calendar](../component-backlog/calendar.md) | Low | Very Large | event-card, skip-link | 10–20 d | Month/week/day calendar (3.1k LOC). _(pulled into this wave because date-picker depends on it)_ |
| 54 | [DatePicker](../component-backlog/date-picker.md) | High | Large | calendar, R-overlay-core, R-field-shell | 5–8 d | Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover. |
| 55 | [AppDrawer](../component-backlog/app-drawer.md) | Medium | Small | drawer, search-bar, R-badge, R-button | 0.5–1 d | Exported by KuiReact app layer (not in registry). KuiNative has a same-named showcase-only AppDrawer — name collision without API parity. |
| 56 | [AppTopBar](../component-backlog/app-top-bar.md) | Medium | Small | — | 0.5–1 d | Header wrapper; KuiNative showcase has a private Header. |
| 57 | [BrandLogo](../component-backlog/brand-logo.md) | Medium | Small | — | 0.5–1 d | Used by AppShell/AppFooter/SplashScreen; blocks those ports. |
| 58 | [DetailHeader](../component-backlog/detail-header.md) | Medium | Small | R-badge, page-header, tab-group | 0.5–1 d | Entity header with tabs. |
| 59 | [NoAccessState](../component-backlog/no-access-state.md) | Medium | Small | alert-banner, R-button, R-empty-state | 0.5–1 d | Exported from KuiReact app layer (EmptyErrorState.tsx) but absent from the registry; permission-denied state. |
| 60 | [NotFoundState](../component-backlog/not-found-state.md) | Medium | Small | alert-banner, R-button, R-empty-state | 0.5–1 d | 404 state inside a screen. |
| 61 | [Pagination](../component-backlog/pagination.md) | Medium | Small | — | 0.5–1 d | Page controls; mobile lists usually use infinite scroll, but tables/search results still need it. |
| 62 | [Popconfirm](../component-backlog/popconfirm.md) | Medium | Small | R-overlay-core, R-button, popover | 0.5–1 d | Inline confirmation for destructive actions. |
| 63 | [SplashScreen](../component-backlog/splash-screen.md) | Medium | Small | R-spinner | 0.5–1 d | Branded launch screen; on native this is split between `expo-splash-screen` (OS level) and an in-app animated screen. |
| 64 | [StarRating](../component-backlog/star-rating.md) | Medium | Small | — | 0.5–1 d | Rating display/input; used by reviews domain and 3 KuiReact components. |
| 65 | [StatCard](../component-backlog/stat-card.md) | Medium | Small | — | 0.5–1 d | Card-wrapped KPI. |
| 66 | [Statistic](../component-backlog/statistic.md) | Medium | Small | — | 0.5–1 d | Numeric KPI with trend/prefix/suffix; used in dashboards. |
| 67 | [StepShell](../component-backlog/step-shell.md) | Medium | Small | R-button | 0.5–1 d | Per-step layout wrapper used by StepFlow. |
| 68 | [TabButton](../component-backlog/tab-button.md) | Medium | Small | — | 0.5–1 d | Single tab button with count badge; building block of TabGroup. |
| 69 | [Timeline](../component-backlog/timeline.md) | Medium | Small | — | 0.5–1 d | Activity timeline grouped by day; used by domain feeds. |
| 70 | [AppShell](../component-backlog/app-shell.md) | Medium | Medium | drawer | 2–3 d | Root layout (sidebar + top bar + content). On native this maps to navigator layouts. |
| 71 | [AppSidebar](../component-backlog/app-sidebar.md) | Medium | Medium | R-badge | 2–3 d | Grouped nav with badges and footer slot; KuiNative showcase already has a private Sidebar that should be promoted. |
| 72 | [FileInput](../component-backlog/file-input.md) | Medium | Medium | R-field-shell | 2–3 d | File selection; RN has no `<input type=file>`. |
| 73 | [DateRangePicker](../component-backlog/date-range-picker.md) | Medium | Large | calendar, date-picker, R-overlay-core, R-field-shell | 5–8 d | Range selection for filters/bookings; shares DatePicker internals. |
| 74 | [TagInput](../component-backlog/tag-input.md) | Medium | Medium | R-field-shell | 2–3 d | Chip entry with suggestions; composes Badge(dismissible). |
| 75 | [FilterBar](../component-backlog/filter-bar.md) | Medium | Medium | date-range-picker, multi-select, select, tag-input, R-button, date-picker | 2–3 d | Multi-field filter UI. |
| 76 | [GlobalSearch](../component-backlog/global-search.md) | Medium | Medium | search-bar | 2–3 d | Global search with previews. |
| 77 | [OnboardingWizard](../component-backlog/onboarding-wizard.md) | Medium | Medium | R-button, R-modal, stepper | 2–3 d | First-run onboarding; very common in mobile apps. |
| 78 | [Slider](../component-backlog/slider.md) | Medium | Medium | — | 2–3 d | Accessible carousel (autoPlay, dots, arrows, loop). |
| 79 | [StepFlow](../component-backlog/step-flow.md) | Medium | Medium | alert-banner, stepper, R-button, step-shell | 2–3 d | Exported multi-step wizard (not in registry). |
| 80 | [Table](../component-backlog/table.md) | Medium | Medium | — | 2–3 d | Static data table; on phones tables need horizontal scroll or card fallback. |
| 81 | [TimePicker](../component-backlog/time-picker.md) | Medium | Medium | R-overlay-core, R-field-shell | 2–3 d | Time entry companion to DatePicker. |
| 82 | [ComboBox](../component-backlog/combo-box.md) | Medium | Large | R-overlay-core, R-field-shell | 5–8 d | Async-searchable single select; needed for large option sets. |