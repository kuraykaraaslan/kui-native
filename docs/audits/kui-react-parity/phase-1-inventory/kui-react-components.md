# KuiReact component inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Every registry entry plus every barrel export missing from the registry. One row per component.

## Method

- **Source of truth:** `kui-react/public/registry/components.json` (315 entries: layers ui/app/domain/library) plus the explicit barrels `modules/ui/index.ts`, `modules/app/index.ts`, `index.ts`, `modules/domains/*/index.ts` and `libs/hooks`, `libs/a11y`.
- **Barrel exports not in the registry** were added by hand-verified path (10): `ServerDataTable`, `StepFlow`, `FormField`, `NoAccessState`, `NotificationProvider`, `FocusTrap`, `AppDrawer`, `useBreakpoint`, `useFocusTrap`, `useA11yCheck`. The registry claims to be the canonical catalog (KuiReact ADR 0002); these are catalog gaps in KuiReact itself.
- **Export path / public status** come from barrel parsing and `tsup.config.ts` entries (`index`, `ui`, `app`, `common`). Domain verticals other than `common` are *not* in the npm package; they are copy-from-source components.
- **LOC** counts the component file (or its whole directory for directory modules), excluding tests.
- **Composes** = KuiReact components imported by the component's own files (first-party dependency edges, parsed from `import` statements).
- **Used by** = registry `usedBy[]` count. **Imports (prod / showcase)** = number of distinct source files importing the component, split into production code (`modules/**`, `app/theme/**`) and showcase/docs code — the usage-frequency indicator.
- **Tests** = co-located `*.test.tsx` and number of `it()` cases.
- **KuiNative** = ✓ with the native export name when a counterpart exists; ✗ links to the backlog file.

## Foundation (2)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | `button` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 91 | — | 9 | 137 / 13 | ✓ (12) | ✓ Button |
| BrandLogo | `brand-logo` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 27 | — | 0 | 6 / 2 | — | ✗ [backlog](../component-backlog/brand-logo.md) |

## Typography (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Label | `label` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 31 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/label.md) |

## Layout (9)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Card | `card` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 84 | — | 0 | 9 / 1 | — | ✓ Card |
| AppShell | `app-shell` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 93 | drawer | 0 | 4 / 2 | — | ✗ [backlog](../component-backlog/app-shell.md) |
| PageHeader | `page-header` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 85 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/page-header.md) |
| SectionCard | `section-card` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 18 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/section-card.md) |
| AppFooter | `app-footer` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 68 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/app-footer.md) |
| StepShell | `step-shell` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 82 | button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/step-shell.md) |
| DetailHeader | `detail-header` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 92 | badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/detail-header.md) |
| ScrollArea | `scroll-area` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 36 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/scroll-area.md) |
| Separator | `separator` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 34 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/separator.md) |

## Navigation (13)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Breadcrumb | `breadcrumb` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 73 | — | 0 | 26 / 1 | — | ✗ [backlog](../component-backlog/breadcrumb.md) |
| NavDrawer | `nav-drawer` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 46 | drawer | 0 | 8 / 1 | — | ✗ [backlog](../component-backlog/nav-drawer.md) |
| AppSidebar | `app-sidebar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 251 | badge | 0 | 3 / 2 | — | ✗ [backlog](../component-backlog/app-sidebar.md) |
| AppCommandBar | `app-command-bar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 792 | alert-banner, badge, button, empty-state, modal | 0 | 2 / 1 | ✓ (3) | ✗ [backlog](../component-backlog/app-command-bar.md) |
| Pagination | `pagination` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 169 | — | 0 | 2 / 1 | ✓ (9) | ✗ [backlog](../component-backlog/pagination.md) |
| TabGroup | `tab-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 106 | — | 0 | 2 / 1 | ✓ (11) | ✗ [backlog](../component-backlog/tab-group.md) |
| Stepper | `stepper` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 127 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/stepper.md) |
| TabButton | `tab-button` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 39 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/tab-button.md) |
| AppBreadcrumbs | `app-breadcrumbs` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 99 | breadcrumb, button, dropdown-menu, tooltip | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/app-breadcrumbs.md) |
| AppDrawer | `app-drawer` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 139 | badge, button, drawer, search-bar | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/app-drawer.md) |
| AppNav | `app-nav` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 96 | button, nav-drawer | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/app-nav.md) |
| AppTopBar | `app-top-bar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 23 | — | 0 | 0 / 2 | — | ✗ [backlog](../component-backlog/app-top-bar.md) |
| GlobalSearch | `global-search` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 145 | search-bar | 0 | 0 / 2 | — | ✗ [backlog](../component-backlog/global-search.md) |

## Forms (26)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Input | `input` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 215 | — | 3 | 23 / 2 | ✓ (9) | ✓ TextInput |
| SearchBar | `search-bar` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 75 | — | 0 | 14 / 1 | — | ✗ [backlog](../component-backlog/search-bar.md) |
| Form | `form` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 56 | alert-banner | 0 | 11 / 1 | — | ✗ [backlog](../component-backlog/form.md) |
| Textarea | `textarea` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 69 | — | 2 | 9 / 3 | — | ✗ [backlog](../component-backlog/textarea.md) |
| Select | `select` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 226 | — | 1 | 5 / 2 | ✓ (10) | ✗ [backlog](../component-backlog/select.md) |
| StarRating | `star-rating` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 138 | — | 3 | 3 / 1 | — | ✗ [backlog](../component-backlog/star-rating.md) |
| TagInput | `tag-input` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 150 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/tag-input.md) |
| ColorPicker | `color-picker` | ui | `@/modules/ui/ColorPicker/index` | source-only (not exported from a barrel) | 1190 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/color-picker.md) |
| RadioGroup | `radio-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 121 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/radio-group.md) |
| Toggle | `toggle` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 81 | — | 0 | 2 / 2 | ✓ (6) | ✓ Switch |
| ButtonGroup | `button-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 96 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/button-group.md) |
| Checkbox | `checkbox` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 65 | — | 1 | 1 / 1 | ✓ (6) | ✓ Checkbox |
| DatePicker | `date-picker` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1421 | calendar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/date-picker.md) |
| DateRangePicker | `date-range-picker` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1421 | calendar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/date-range-picker.md) |
| MultiSelect | `multi-select` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 284 | — | 0 | 1 / 2 | — | ✗ [backlog](../component-backlog/multi-select.md) |
| ViewToggle | `view-toggle` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 52 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/view-toggle.md) |
| CheckboxGroup | `checkbox-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 67 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/checkbox-group.md) |
| ComboBox | `combo-box` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 738 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/combo-box.md) |
| FileInput | `file-input` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 391 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/file-input.md) |
| FileUploadSection | `file-upload-section` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 615 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/file-upload-section.md) |
| FilterBar | `filter-bar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 110 | button, date-range-picker, multi-select, select, tag-input | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/filter-bar.md) |
| FormField | `form-field` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 73 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/form-field.md) |
| MentionPicker | `mention-picker` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 162 | avatar | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/mention-picker.md) |
| RangeSlider | `range-slider` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 113 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/range-slider.md) |
| StepFlow | `step-flow` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 126 | alert-banner, button, stepper | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/step-flow.md) |
| TimePicker | `time-picker` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 80 | — | 0 | 0 / 2 | — | ✗ [backlog](../component-backlog/time-picker.md) |

## Feedback (14)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EmptyState | `empty-state` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 37 | — | 0 | 6 / 1 | — | ✓ EmptyState |
| AlertBanner | `alert-banner` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 93 | — | 0 | 5 / 2 | — | ✗ [backlog](../component-backlog/alert-banner.md) |
| InlineAlert | `inline-alert` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 42 | — | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/inline-alert.md) |
| Spinner | `spinner` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 33 | — | 0 | 4 / 2 | — | ✓ Spinner |
| NotFoundPage | `common-not-found-page` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 100 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/common-not-found-page.md) |
| ErrorState | `error-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 105 | alert-banner, button, empty-state | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/error-state.md) |
| LoadingState | `loading-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 129 | spinner | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/loading-state.md) |
| MaintenancePage | `maintenance-page` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 128 | badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/maintenance-page.md) |
| NoAccessState | `no-access-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 105 | alert-banner, button, empty-state | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/no-access-state.md) |
| NotFoundState | `not-found-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 105 | alert-banner, button, empty-state | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/not-found-state.md) |
| Progress | `progress` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 109 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/progress.md) |
| Skeleton | `skeleton` | ui | `@/modules/ui/Skeleton` | source-only (not exported from a barrel) | 60 | — | 0 | 0 / 0 | — | ✓ SkeletonCard |
| SplashScreen | `splash-screen` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 61 | spinner | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/splash-screen.md) |
| Toast | `toast` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 733 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/toast.md) |

## Overlay (8)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Modal | `modal` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 145 | use-focus-trap | 3 | 11 / 1 | ✓ (7) | ✓ Modal |
| DropdownMenu | `dropdown-menu` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 113 | use-focus-trap | 0 | 7 / 1 | ✓ (11) | ✗ [backlog](../component-backlog/dropdown-menu.md) |
| Drawer | `drawer` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 120 | use-focus-trap | 0 | 4 / 2 | ✓ (8) | ✗ [backlog](../component-backlog/drawer.md) |
| Tooltip | `tooltip` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 105 | — | 0 | 2 / 1 | ✓ (6) | ✗ [backlog](../component-backlog/tooltip.md) |
| ContextMenu | `context-menu` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 288 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/context-menu.md) |
| Popconfirm | `popconfirm` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 94 | button, use-focus-trap | 0 | 0 / 1 | ✓ (6) | ✗ [backlog](../component-backlog/popconfirm.md) |
| Popover | `popover` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 74 | use-focus-trap | 0 | 0 / 2 | ✓ (5) | ✗ [backlog](../component-backlog/popover.md) |
| ShareDialog | `share-dialog` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 267 | avatar, button, modal | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/share-dialog.md) |

## Data Display (8)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Badge | `badge` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 87 | — | 3 | 109 / 8 | — | ✓ Badge |
| Avatar | `avatar` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 124 | — | 5 | 41 / 2 | — | ✓ Avatar + AvatarGroup |
| StatCard | `stat-card` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 19 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/stat-card.md) |
| TreeView | `tree-view` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 849 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/tree-view.md) |
| Accordion | `accordion` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 85 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/accordion.md) |
| ContentScoreBar | `content-score-bar` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 107 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/content-score-bar.md) |
| Statistic | `statistic` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 66 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/statistic.md) |
| Timeline | `timeline` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 170 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/timeline.md) |

## Tables (5)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DataTable | `data-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 808 | pagination | 0 | 5 / 1 | — | ✗ [backlog](../component-backlog/data-table.md) |
| Table | `table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 158 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/table.md) |
| AdvancedDataTable | `advanced-data-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1999 | data-table, pagination, search-bar, spinner | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/advanced-data-table.md) |
| BulkActionTable | `bulk-action-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 236 | table | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/bulk-action-table.md) |
| ServerDataTable | `server-data-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1999 | data-table, pagination, search-bar, spinner | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/server-data-table.md) |

## Charts (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chart | `chart` | ui | `@/modules/ui/Chart/index` | source-only (not exported from a barrel) | 1824 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/chart.md) |

## Media (4)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Slider | `slider` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 644 | — | 0 | 3 / 2 | — | ✗ [backlog](../component-backlog/slider.md) |
| VideoPlayer | `video-player` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1487 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/video-player.md) |
| ImageGallery | `image-gallery` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 705 | context-menu | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/image-gallery.md) |
| MapView | `map-view` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 796 | button, card | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/map-view.md) |

## Advanced Components (9)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CodeEditor | `code-editor` | ui | `@/modules/ui/CodeEditor/index` | source-only (not exported from a barrel) | 642 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/code-editor.md) |
| Calendar | `calendar` | app | `@/modules/app/Calendar/index` | source-only (not exported from a barrel) | 3137 | event-card, skip-link | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/calendar.md) |
| CommentThread | `comment-thread` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 309 | avatar, button | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/comment-thread.md) |
| DiffViewer | `diff-viewer` | ui | `@/modules/ui/DiffViewer/index` | source-only (not exported from a barrel) | 841 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/diff-viewer.md) |
| FormBuilder | `form-builder` | app | `@/modules/app/FormBuilder/index` | source-only (not exported from a barrel) | 2005 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/form-builder.md) |
| Gantt | `gantt` | app | `@/modules/app/Gantt/index` | source-only (not exported from a barrel) | 2995 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/gantt.md) |
| KanbanBoard | `kanban-board` | app | `@/modules/app/KanbanBoard/index` | source-only (not exported from a barrel) | 775 | card | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/kanban-board.md) |
| OnboardingWizard | `onboarding-wizard` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 225 | button, modal | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/onboarding-wizard.md) |
| RichTextEditor | `rich-text-editor` | app | `@/modules/app/RichTextEditor/index` | source-only (not exported from a barrel) | 1972 | button, color-picker, input, modal | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/rich-text-editor.md) |

## Providers (2)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FocusTrap | `accessibility-kit` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 100 | use-focus-trap | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/accessibility-kit.md) |
| NotificationProvider | `notification-system` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 40 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/notification-system.md) |

## Hooks (3)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| useFocusTrap | `use-focus-trap` | hook | `@/libs/hooks/useFocusTrap` | internal (libs/, not in package exports) | 62 | — | 0 | 6 / 0 | — | ✗ [backlog](../component-backlog/use-focus-trap.md) |
| useA11yCheck | `use-a11y-check` | hook | `@/libs/hooks/useA11yCheck` | internal (libs/, not in package exports) | 30 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/use-a11y-check.md) |
| useBreakpoint | `use-breakpoint` | hook | `@/libs/hooks/useBreakpoint` | internal (libs/, not in package exports) | 43 | — | 0 | 0 / 0 | ✓ (5) | ✗ [backlog](../component-backlog/use-breakpoint.md) |

## Theme (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ThemeSwitcher | `theme-switcher` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 48 | button, dropdown-menu | 0 | 1 / 2 | — | ✗ [backlog](../component-backlog/theme-switcher.md) |

## Utility (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SkipLink + LiveRegion | `skip-link` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 60 | — | 0 | 16 / 1 | — | ✗ [backlog](../component-backlog/skip-link.md) |

## Other (external library) (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KUIViewer | `lib-kui-viewer` | library | `@kuraykaraaslan/kui-viewer` | external npm package (showcased only) | 284 | — | 0 | 0 / 0 | — | n/a |

## Domain — Common (42)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PriceDisplay | `common-price-display` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 48 | — | 0 | 6 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-price-display.md) |
| OrderTotalsCard | `common-order-totals-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 46 | common-price-display | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-order-totals-card.md) |
| PaymentStatusBadge | `common-payment-status-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 24 | badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-payment-status-badge.md) |
| AddressCard | `common-address-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 83 | button | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-address-card.md) |
| CouponInput | `common-coupon-input` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 105 | button, input | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-coupon-input.md) |
| CreditCardForm | `common-credit-card-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 210 | button, common-credit-card-visual, form, input | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-credit-card-form.md) |
| PaymentSummaryCard | `common-payment-summary-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 61 | common-payment-status-badge, common-price-display | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-payment-summary-card.md) |
| SavedCardSelector | `common-saved-card-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 132 | button | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-saved-card-selector.md) |
| UserProfileCard | `common-user-profile-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 49 | common-user-avatar, common-user-role-badge, common-user-status-badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-user-profile-card.md) |
| AddressForm | `common-address-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 113 | button, form, input | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-address-form.md) |
| AddressSelector | `common-address-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 77 | button, common-address-card | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-address-selector.md) |
| CountrySelector | `common-country-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 221 | button | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-country-selector.md) |
| CreditCardVisual | `common-credit-card-visual` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 133 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-credit-card-visual.md) |
| LanguageSwitcher | `common-language-switcher` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 91 | button, dropdown-menu | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-language-switcher.md) |
| OAuthButtons | `common-oauth-buttons` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 59 | button | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-oauth-buttons.md) |
| ChangePasswordForm | `common-change-password-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 87 | button, form, input | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-change-password-form.md) |
| CheckoutSuccessState | `common-checkout-success-state` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 56 | button, common-address-card, common-payment-summary-card | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-checkout-success-state.md) |
| CurrencySelector | `common-currency-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 176 | button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-currency-selector.md) |
| ForgotPasswordForm | `common-forgot-password-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 63 | button, form, input | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-forgot-password-form.md) |
| LoginForm | `common-login-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 83 | button, form, input | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-login-form.md) |
| PaymentMethodSelector | `common-payment-method-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 57 | dropdown-menu, radio-group | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-payment-method-selector.md) |
| RegisterForm | `common-register-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 88 | button, form, input | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-register-form.md) |
| SessionExpiredBanner | `common-session-expired-banner` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 42 | button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-session-expired-banner.md) |
| UserAvatar | `common-user-avatar` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 19 | avatar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-user-avatar.md) |
| UserMenu | `common-user-menu` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 58 | avatar, button, dropdown-menu | 0 | 1 / 4 | — | ✗ [backlog](../component-backlog/domains/common/common-user-menu.md) |
| UserPreferencesForm | `common-user-preferences-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 82 | button, common-language-switcher, form, theme-switcher, toggle | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-user-preferences-form.md) |
| UserProfileForm | `common-user-profile-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 104 | button, form, input, textarea | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-user-profile-form.md) |
| UserRoleBadge | `common-user-role-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 20 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-user-role-badge.md) |
| UserStatusBadge | `common-user-status-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 21 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-user-status-badge.md) |
| Charts | `common-charts` | domain | `@/modules/domains/common/charts/Charts` | source-only (not exported from a barrel) | 259 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/domains/common/common-charts.md) |
| ChatBox | `common-chat-box` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 295 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-chat-box.md) |
| DirectionProvider | `common-direction-provider` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 43 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-direction-provider.md) |
| DiscountBadge | `common-discount-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 43 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-discount-badge.md) |
| GeoPointDisplay | `common-geo-point-display` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 49 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-geo-point-display.md) |
| LocationPicker | `common-location-picker` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 110 | button, form, input, select | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-location-picker.md) |
| NotificationMenu | `common-notification-menu` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 164 | — | 0 | 0 / 2 | — | ✗ [backlog](../component-backlog/domains/common/common-notification-menu.md) |
| ProcessingStatusIndicator | `common-processing-status-indicator` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 79 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-processing-status-indicator.md) |
| PublishStatusBadge | `common-publish-status-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 34 | badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-publish-status-badge.md) |
| SeoForm | `common-seo-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 93 | button, form, input, tag-input, textarea | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-seo-form.md) |
| SeoPreview | `common-seo-preview` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 63 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-seo-preview.md) |
| SubscriptionPlanCard | `common-subscription-plan-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 122 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-subscription-plan-card.md) |
| VisibilityBadge | `common-visibility-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 34 | badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/common/common-visibility-badge.md) |

## Domain — AI (9)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ModelProviderBadge | `ai-model-provider-badge` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 29 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-model-provider-badge.md) |
| FeatureCheckCell | `ai-feature-check-cell` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 81 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-feature-check-cell.md) |
| ModelCard | `ai-model-card` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 115 | ai-model-provider-badge, ai-model-type-badge, badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-model-card.md) |
| ModelScoreSparkline | `ai-model-score-sparkline` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 64 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-model-score-sparkline.md) |
| ModelTypeBadge | `ai-model-type-badge` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-model-type-badge.md) |
| ChatMessage | `ai-chat-message` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 56 | avatar, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-chat-message.md) |
| ModelComparisonTable | `ai-model-comparison-table` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 116 | ai-feature-check-cell, ai-model-provider-badge, ai-model-score-sparkline | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-model-comparison-table.md) |
| UsageStatsCard | `ai-usage-stats-card` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 54 | stat-card | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-usage-stats-card.md) |
| AIJobStatusBadge | `ai-job-status-badge` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/ai/ai-job-status-badge.md) |

## Domain — API Doc (15)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SecuritySchemeBadge | `api-doc-security-scheme-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 33 | badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-security-scheme-badge.md) |
| CodeSamplePanel | `api-doc-code-sample-panel` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 82 | button, button-group | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-code-sample-panel.md) |
| HttpMethodBadge | `api-doc-http-method-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 44 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-http-method-badge.md) |
| SchemaViewer | `api-doc-schema-viewer` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 197 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-schema-viewer.md) |
| ApiKeyTokenCard | `api-doc-api-key-token-card` | domain | `@/modules/domains/api-doc/ApiKeyTokenCard` | source-only (not exported from a barrel) | 166 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-api-key-token-card.md) |
| ApiTagSection | `api-doc-api-tag-section` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 86 | api-doc-endpoint-row, badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-api-tag-section.md) |
| AuthSchemeCard | `api-doc-auth-scheme-card` | domain | `@/modules/domains/api-doc/AuthSchemeCard` | source-only (not exported from a barrel) | 102 | api-doc-security-scheme-badge, badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-auth-scheme-card.md) |
| EndpointRow | `api-doc-endpoint-row` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 64 | api-doc-http-method-badge, api-doc-operation-panel, badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-endpoint-row.md) |
| OAuthFlowDiagram | `api-doc-oauth-flow-diagram` | domain | `@/modules/domains/api-doc/OAuthFlowDiagram` | source-only (not exported from a barrel) | 170 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-oauth-flow-diagram.md) |
| OperationPanel | `api-doc-operation-panel` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 175 | api-doc-code-sample-panel, api-doc-parameter-table, api-doc-response-card, api-doc-schema-viewer, api-doc-security-scheme-badge, badge, empty-state, tab-group | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-operation-panel.md) |
| ParameterTable | `api-doc-parameter-table` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 91 | badge, tooltip | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-parameter-table.md) |
| ResponseCard | `api-doc-response-card` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 97 | api-doc-schema-viewer, badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-response-card.md) |
| ServerSelector | `api-doc-server-selector` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 105 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-server-selector.md) |
| StatusCodeBadge | `api-doc-status-code-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 45 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-status-code-badge.md) |
| SecurityBadge | `api-doc-security-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 56 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/api-doc/api-doc-security-badge.md) |

## Domain — Blog (11)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PostCard | `blog-post-card` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 74 | blog-category-badge, blog-post-meta, blog-post-status-badge | 0 | 6 / 2 | — | ✗ [backlog](../component-backlog/domains/blog/blog-post-card.md) |
| CategoryBadge | `blog-category-badge` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-category-badge.md) |
| CommentForm | `blog-comment-form` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 112 | button, input, textarea | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-comment-form.md) |
| PostStatusBadge | `blog-post-status-badge` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 4 / 3 | — | ✗ [backlog](../component-backlog/domains/blog/blog-post-status-badge.md) |
| PostMeta | `blog-post-meta` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 48 | avatar | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-post-meta.md) |
| CommentList | `blog-comment-list` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 67 | blog-comment-form, blog-comment-item | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-comment-list.md) |
| PostContent | `blog-post-content` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 37 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-post-content.md) |
| AuthorBioCard | `blog-author-bio-card` | domain | `@/modules/domains/blog/author/AuthorBioCard` | source-only (not exported from a barrel) | 139 | avatar, badge, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-author-bio-card.md) |
| AuthorStatsRow | `blog-author-stats-row` | domain | `@/modules/domains/blog/author/AuthorStatsRow` | source-only (not exported from a barrel) | 59 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-author-stats-row.md) |
| CommentItem | `blog-comment-item` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 80 | avatar, blog-comment-form, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-comment-item.md) |
| TopicCloud | `blog-topic-cloud` | domain | `@/modules/domains/blog/author/TopicCloud` | source-only (not exported from a barrel) | 91 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/blog/blog-topic-cloud.md) |

## Domain — Commerce (10)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OrderStatusBadge | `commerce-order-status-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 31 | badge | 0 | 4 / 2 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-order-status-badge.md) |
| ProductCard | `commerce-product-card` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 166 | commerce-stock-status-badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-product-card.md) |
| CartItem | `commerce-cart-item` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 79 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-cart-item.md) |
| StockStatusBadge | `commerce-stock-status-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 26 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-stock-status-badge.md) |
| ProductImageGallery | `commerce-product-image-gallery` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 155 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-product-image-gallery.md) |
| OrderCard | `commerce-order-card` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 94 | commerce-order-status-badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-order-card.md) |
| ProductTypeBadge | `commerce-product-type-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 25 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-product-type-badge.md) |
| EmptyWishlistState | `commerce-empty-wishlist-state` | domain | `@/modules/domains/commerce/wishlist/EmptyWishlistState` | source-only (not exported from a barrel) | 98 | button | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-empty-wishlist-state.md) |
| ProductStatusBadge | `commerce-product-status-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 26 | badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-product-status-badge.md) |
| WishlistItemCard | `commerce-wishlist-item-card` | domain | `@/modules/domains/commerce/wishlist/WishlistItemCard` | source-only (not exported from a barrel) | 154 | badge, button, commerce-stock-status-badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/commerce/commerce-wishlist-item-card.md) |

## Domain — Event (19)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EventCard | `event-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 93 | event-category-badge, event-format-badge, event-status-badge | 0 | 9 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-card.md) |
| EventCategoryBadge | `event-category-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 34 | — | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-category-badge.md) |
| TicketCard | `ticket-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 194 | — | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/event/ticket-card.md) |
| EventStatusBadge | `event-status-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 36 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-status-badge.md) |
| NavDropdown | `event-nav-dropdown` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 58 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-nav-dropdown.md) |
| EventFormatBadge | `event-format-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 35 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-format-badge.md) |
| EventOrderStatusBadge | `event-order-status-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 34 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-order-status-badge.md) |
| CheckoutSuccess | `checkout-success` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 122 | button, ticket-card | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/checkout-success.md) |
| CityPicker | `event-city-picker` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 79 | event-nav-dropdown | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-city-picker.md) |
| EventInfoGrid | `event-info-grid` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 63 | card | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-info-grid.md) |
| HeroSlide | `hero-slide` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 104 | badge, event-category-badge, event-status-badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/hero-slide.md) |
| NavLanguageSwitcher | `event-nav-language-switcher` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 84 | event-nav-dropdown | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-nav-language-switcher.md) |
| NavThemeSwitcher | `event-nav-theme-switcher` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 81 | event-nav-dropdown | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-nav-theme-switcher.md) |
| OrganizerCard | `organizer-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 74 | brand-logo | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/organizer-card.md) |
| SeatMapPicker | `seat-map-picker` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 1031 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/seat-map-picker.md) |
| SectionPricingCard | `section-pricing-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 105 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/section-pricing-card.md) |
| StepIndicator | `step-indicator` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 58 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/step-indicator.md) |
| TicketRowMeta + TicketRowActions | `event-ticket-row-meta` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 97 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/event-ticket-row-meta.md) |
| TicketSidebarBox | `ticket-sidebar-box` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 43 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/event/ticket-sidebar-box.md) |

## Domain — Fintech (12)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CurrencyBadge | `fintech-currency-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 24 | badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-currency-badge.md) |
| TransactionRow | `fintech-transaction-row` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 113 | fintech-transaction-status-badge, fintech-transaction-type-badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-transaction-row.md) |
| AssetAllocationCard | `fintech-asset-allocation-card` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 119 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-asset-allocation-card.md) |
| CardActionMenu | `fintech-card-action-menu` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 87 | button, dropdown-menu | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-card-action-menu.md) |
| CardLimitMeter | `fintech-card-limit-meter` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 83 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-card-limit-meter.md) |
| PaymentCardTile | `fintech-payment-card-tile` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 116 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-payment-card-tile.md) |
| PerformanceSparkline | `fintech-performance-sparkline` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 73 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-performance-sparkline.md) |
| PortfolioHoldingRow | `fintech-portfolio-holding-row` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 97 | fintech-currency-badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-portfolio-holding-row.md) |
| TransactionStatusBadge | `fintech-transaction-status-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 22 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-transaction-status-badge.md) |
| TransactionTypeBadge | `fintech-transaction-type-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 25 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-transaction-type-badge.md) |
| WalletStatusBadge | `fintech-wallet-status-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-wallet-status-badge.md) |
| WalletCard | `fintech-wallet-card` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 131 | fintech-currency-badge, fintech-wallet-status-badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/fintech/fintech-wallet-card.md) |

## Domain — Food (11)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RestaurantCard | `food-restaurant-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 134 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-restaurant-card.md) |
| DeliveryStatusBadge | `food-delivery-status-badge` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 30 | badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-delivery-status-badge.md) |
| CourierCard | `food-courier-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 114 | avatar, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-courier-card.md) |
| CuisineHeroBanner | `food-cuisine-hero-banner` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 125 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-cuisine-hero-banner.md) |
| CuisineTagChip | `food-cuisine-tag-chip` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 70 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-cuisine-tag-chip.md) |
| EtaCountdownCard | `food-eta-countdown-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 83 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-eta-countdown-card.md) |
| FeaturedDishCard | `food-featured-dish-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 109 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-featured-dish-card.md) |
| MenuItemCard | `food-menu-item-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 120 | badge, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-menu-item-card.md) |
| OrderTrackingTimeline | `food-order-tracking-timeline` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 116 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-order-tracking-timeline.md) |
| RestaurantStatusBadge | `food-restaurant-status-badge` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/food/food-restaurant-status-badge.md) |
| OrderStatusBadge | `food-order-status-badge` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 33 | badge | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/domains/food/food-order-status-badge.md) |

## Domain — Forum (10)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TopicStatusBadge | `forum-topic-status-badge` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-topic-status-badge.md) |
| BadgeShelf | `forum-badge-shelf` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 96 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-badge-shelf.md) |
| ForumUserCard | `forum-user-card` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 133 | avatar, badge, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-user-card.md) |
| PostComposer | `forum-post-composer` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 161 | button, input, select, tab-group, tag-input, textarea | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-post-composer.md) |
| ReactionTypeBadge | `forum-reaction-type-badge` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 57 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-reaction-type-badge.md) |
| ReputationBar | `forum-reputation-bar` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 110 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-reputation-bar.md) |
| UserActivityRow | `forum-user-activity-row` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 98 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-user-activity-row.md) |
| ForumCategoryCard | `forum-category-card` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 97 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-category-card.md) |
| PostStatusBadge | `forum-post-status-badge` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/domains/forum/forum-post-status-badge.md) |
| TopicRow | `forum-topic-row` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 115 | forum-topic-status-badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/forum/forum-topic-row.md) |

## Domain — IoT (11)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AlertSeverityBadge | `iot-alert-severity-badge` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-alert-severity-badge.md) |
| DeviceStatusBadge | `iot-device-status-badge` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 22 | badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-device-status-badge.md) |
| DeviceTypeBadge | `iot-device-type-badge` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-device-type-badge.md) |
| AlertDetailHeader | `iot-alert-detail-header` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 137 | badge, button, iot-alert-severity-badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-alert-detail-header.md) |
| AlertEventTimeline | `iot-alert-event-timeline` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 97 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-alert-event-timeline.md) |
| LogStreamRow | `iot-log-stream-row` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 76 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-log-stream-row.md) |
| MetricSparklineCard | `iot-metric-sparkline-card` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 100 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-metric-sparkline-card.md) |
| RulesetEditor | `iot-ruleset-editor` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 1147 | code-editor, modal | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-ruleset-editor.md) |
| TelemetryTimeSeriesChart | `iot-telemetry-time-series-chart` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 82 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-telemetry-time-series-chart.md) |
| CloudWorkspaceCard | `iot-cloud-workspace-card` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 131 | badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-cloud-workspace-card.md) |
| DeviceCard | `iot-device-card` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 105 | iot-device-status-badge, iot-device-type-badge | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/iot/iot-device-card.md) |

## Domain — Jobs (8)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JobCard | `jobs-job-card` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 92 | avatar, jobs-experience-badge, jobs-job-meta, jobs-type-badge, jobs-work-mode-badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-job-card.md) |
| JobTypeBadge | `jobs-type-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-type-badge.md) |
| JobWorkModeBadge | `jobs-work-mode-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 24 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-work-mode-badge.md) |
| CompanyCard | `jobs-company-card` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 90 | avatar, badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-company-card.md) |
| JobExperienceBadge | `jobs-experience-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-experience-badge.md) |
| JobMeta | `jobs-job-meta` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 63 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-job-meta.md) |
| ApplicationStatusBadge | `jobs-application-status-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-application-status-badge.md) |
| JobStatusBadge | `jobs-status-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/jobs/jobs-status-badge.md) |

## Domain — Landing (14)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| StatsBar | `landing-stats-bar` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 54 | — | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-stats-bar.md) |
| FeatureGrid | `landing-feature-grid` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 55 | landing-feature-card | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-feature-grid.md) |
| HowItWorksSection | `landing-how-it-works` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 104 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-how-it-works.md) |
| PartnerLogosStrip | `landing-partner-logos-strip` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 51 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-partner-logos-strip.md) |
| FaqAccordion | `landing-faq-accordion` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 117 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-faq-accordion.md) |
| HeroSection | `landing-hero-section` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 101 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-hero-section.md) |
| TestimonialGrid | `landing-testimonial-grid` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 49 | landing-testimonial-card | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-testimonial-grid.md) |
| AnnouncementBar | `landing-announcement-bar` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 71 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-announcement-bar.md) |
| FeatureCard | `landing-feature-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 69 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-feature-card.md) |
| MegaMenu | `landing-mega-menu` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 326 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-mega-menu.md) |
| PricingGrid | `landing-pricing-grid` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 95 | landing-pricing-plan-card | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-pricing-grid.md) |
| PricingPlanCard | `landing-pricing-plan-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 90 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-pricing-plan-card.md) |
| TeamMemberCard | `landing-team-member-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 74 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-team-member-card.md) |
| TestimonialCard | `landing-testimonial-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 77 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/landing/landing-testimonial-card.md) |

## Domain — Media (9)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ChannelCard | `media-channel-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 115 | avatar, button | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-channel-card.md) |
| VideoCard | `media-video-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 146 | media-video-status-badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-video-card.md) |
| VideoStatusBadge | `media-video-status-badge` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 29 | badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-video-status-badge.md) |
| ChannelStatsCard | `media-channel-stats-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 101 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-channel-stats-card.md) |
| PlaylistHeaderCard | `media-playlist-header-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 131 | avatar, badge, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-playlist-header-card.md) |
| PlaylistVideoRow | `media-playlist-video-row` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 106 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-playlist-video-row.md) |
| VideoMeta | `media-video-meta` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 69 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-video-meta.md) |
| VideoPerformanceRow | `media-video-performance-row` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 113 | media-video-status-badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-video-performance-row.md) |
| WatchTimeChart | `media-watch-time-chart` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 86 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/media/media-watch-time-chart.md) |

## Domain — NFT (16)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ActivityFeedRow | `nft-activity-feed-row` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 117 | nft-blockchain-badge | 0 | 5 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-activity-feed-row.md) |
| BlockchainBadge | `nft-blockchain-badge` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 52 | — | 0 | 5 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-blockchain-badge.md) |
| NftCard | `nft-card` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 108 | nft-blockchain-badge, nft-price-tag, nft-rarity-badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-card.md) |
| CollectionCard | `nft-collection-card` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 104 | nft-blockchain-badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-collection-card.md) |
| PriceTag | `nft-price-tag` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 99 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-price-tag.md) |
| RarityBadge | `nft-rarity-badge` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 44 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-rarity-badge.md) |
| AuctionCountdown | `nft-auction-countdown` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 100 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-auction-countdown.md) |
| BidHistoryRow | `nft-bid-history-row` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 68 | avatar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-bid-history-row.md) |
| CollectionStatsBar | `nft-collection-stats-bar` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 65 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-collection-stats-bar.md) |
| CreatorLeaderboardRow | `nft-creator-leaderboard-row` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 84 | avatar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-creator-leaderboard-row.md) |
| CreatorProfileCard | `nft-creator-profile-card` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 143 | avatar, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-creator-profile-card.md) |
| FloorPriceChart | `nft-floor-price-chart` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 133 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-floor-price-chart.md) |
| MintProgressBar | `nft-mint-progress-bar` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 68 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-mint-progress-bar.md) |
| NftDetailHeader | `nft-detail-header` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 101 | avatar, nft-blockchain-badge, nft-rarity-badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-detail-header.md) |
| TraitTag | `nft-trait-tag` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 36 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-trait-tag.md) |
| WalletConnectButton | `nft-wallet-connect-button` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 134 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/nft/nft-wallet-connect-button.md) |

## Domain — Real Estate (5)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PropertyCard | `real-estate-property-card` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 127 | real-estate-listing-type-badge, real-estate-property-type-badge | 0 | 4 / 1 | — | ✗ [backlog](../component-backlog/domains/real-estate/real-estate-property-card.md) |
| ListingTypeBadge | `real-estate-listing-type-badge` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 17 | badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/real-estate/real-estate-listing-type-badge.md) |
| PropertyTypeBadge | `real-estate-property-type-badge` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 20 | badge | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/domains/real-estate/real-estate-property-type-badge.md) |
| AgentCard | `real-estate-agent-card` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 90 | avatar, badge, button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/real-estate/real-estate-agent-card.md) |
| PropertyStatusBadge | `real-estate-property-status-badge` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 20 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/real-estate/real-estate-property-status-badge.md) |

## Domain — Reviews (4)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RatingDistribution | `reviews-rating-distribution` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 71 | — | 1 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/reviews/reviews-rating-distribution.md) |
| ReviewCard | `reviews-review-card` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 121 | avatar, badge, star-rating | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/reviews/reviews-review-card.md) |
| ReviewSubmitForm | `reviews-review-submit-form` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 133 | button, input, star-rating, textarea | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/reviews/reviews-review-submit-form.md) |
| ReviewSummaryCard | `reviews-review-summary-card` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 63 | reviews-rating-distribution, star-rating | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/domains/reviews/reviews-review-summary-card.md) |

## Domain — Social (6)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SocialProfileCard | `social-profile-card` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 154 | avatar, button | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/social/social-profile-card.md) |
| MarketplaceListingCard | `social-marketplace-listing-card` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 83 | avatar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/social/social-marketplace-listing-card.md) |
| PostPrivacyBadge | `social-post-privacy-badge` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 31 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/social/social-post-privacy-badge.md) |
| SocialNotificationItem | `social-notification-item` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 97 | avatar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/social/social-notification-item.md) |
| PostCard | `social-post-card` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 200 | avatar, social-post-privacy-badge | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/domains/social/social-post-card.md) |
| PostStatusBadge | `social-post-status-badge` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 41 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/domains/social/social-post-status-badge.md) |

## Domain — Travel (5)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FlightCabinBadge | `travel-flight-cabin-badge` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 26 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/travel/travel-flight-cabin-badge.md) |
| FlightSegmentStatusBadge | `travel-flight-segment-status-badge` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/domains/travel/travel-flight-segment-status-badge.md) |
| BookingStatusBadge | `travel-booking-status-badge` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 29 | badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/travel/travel-booking-status-badge.md) |
| FlightCard | `travel-flight-card` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 109 | button, travel-flight-cabin-badge, travel-flight-segment-status-badge | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/travel/travel-flight-card.md) |
| HotelCard | `travel-hotel-card` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 131 | button | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/domains/travel/travel-hotel-card.md) |