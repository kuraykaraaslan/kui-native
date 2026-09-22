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
| Label | `label` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 31 | — | 0 | 0 / 1 | — | ✓ Label |

## Layout (4)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Card | `card` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 84 | — | 0 | 9 / 1 | — | ✓ Card |
| PageHeader | `page-header` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 85 | — | 0 | 2 / 1 | — | ✓ PageHeader |
| ScrollArea | `scroll-area` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 36 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/scroll-area.md) |
| Separator | `separator` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 34 | — | 0 | 0 / 1 | — | ✓ Separator |

## Navigation (5)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Breadcrumb | `breadcrumb` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 73 | — | 0 | 26 / 1 | — | ✓ Breadcrumb |
| Pagination | `pagination` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 169 | — | 0 | 2 / 1 | ✓ (9) | ✓ Pagination |
| TabGroup | `tab-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 106 | — | 0 | 2 / 1 | ✓ (11) | ✓ TabGroup |
| Stepper | `stepper` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 127 | — | 0 | 1 / 1 | — | ✓ Stepper |
| TabButton | `tab-button` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 39 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/tab-button.md) |

## Forms (20)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Input | `input` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 215 | — | 3 | 23 / 2 | ✓ (9) | ✓ Input + TextInput |
| SearchBar | `search-bar` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 75 | — | 0 | 14 / 1 | — | ✓ SearchBar |
| Textarea | `textarea` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 69 | — | 2 | 9 / 3 | — | ✓ Textarea |
| Select | `select` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 226 | — | 1 | 5 / 2 | ✓ (10) | ✓ Select |
| StarRating | `star-rating` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 138 | — | 3 | 3 / 1 | — | ✗ [backlog](../component-backlog/star-rating.md) |
| TagInput | `tag-input` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 150 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/tag-input.md) |
| ColorPicker | `color-picker` | ui | `@/modules/ui/ColorPicker/index` | source-only (not exported from a barrel) | 1190 | — | 0 | 2 / 1 | — | ✗ [backlog](../component-backlog/color-picker.md) |
| RadioGroup | `radio-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 121 | — | 0 | 2 / 1 | — | ✓ RadioGroup |
| Toggle | `toggle` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 81 | — | 0 | 2 / 2 | ✓ (6) | ✓ Toggle + Switch |
| ButtonGroup | `button-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 96 | — | 0 | 1 / 1 | — | ✓ ButtonGroup |
| Checkbox | `checkbox` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 65 | — | 1 | 1 / 1 | ✓ (6) | ✓ Checkbox |
| DatePicker | `date-picker` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1421 | calendar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/date-picker.md) |
| DateRangePicker | `date-range-picker` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1421 | calendar | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/date-range-picker.md) |
| MultiSelect | `multi-select` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 284 | — | 0 | 1 / 2 | — | ✓ MultiSelect |
| ViewToggle | `view-toggle` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 52 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/view-toggle.md) |
| CheckboxGroup | `checkbox-group` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 67 | — | 0 | 0 / 1 | — | ✓ CheckboxGroup |
| ComboBox | `combo-box` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 738 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/combo-box.md) |
| FileInput | `file-input` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 391 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/file-input.md) |
| RangeSlider | `range-slider` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 113 | — | 0 | 0 / 1 | — | ✓ RangeSlider |
| TimePicker | `time-picker` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 80 | — | 0 | 0 / 2 | — | ✗ [backlog](../component-backlog/time-picker.md) |

## Feedback (6)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EmptyState | `empty-state` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 37 | — | 0 | 6 / 1 | — | ✓ EmptyState |
| AlertBanner | `alert-banner` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 93 | — | 0 | 5 / 2 | — | ✓ AlertBanner |
| Spinner | `spinner` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 33 | — | 0 | 4 / 2 | — | ✓ Spinner |
| Progress | `progress` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 109 | — | 0 | 0 / 1 | — | ✓ Progress |
| Skeleton | `skeleton` | ui | `@/modules/ui/Skeleton` | source-only (not exported from a barrel) | 60 | — | 0 | 0 / 0 | — | ✓ SkeletonCard + SkeletonLine + SkeletonAvatar + SkeletonText |
| Toast | `toast` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 733 | — | 0 | 0 / 0 | — | ✓ Toaster + Toast + ToastProvider + ToastRegion |

## Overlay (6)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Modal | `modal` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 145 | use-focus-trap | 3 | 11 / 1 | ✓ (7) | ✓ Modal |
| DropdownMenu | `dropdown-menu` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 113 | use-focus-trap | 0 | 7 / 1 | ✓ (11) | ✓ DropdownMenu |
| Drawer | `drawer` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 120 | use-focus-trap | 0 | 4 / 2 | ✓ (8) | ✓ Drawer |
| Tooltip | `tooltip` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 105 | — | 0 | 2 / 1 | ✓ (6) | ✓ Tooltip |
| Popconfirm | `popconfirm` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 94 | button, use-focus-trap | 0 | 0 / 1 | ✓ (6) | ✗ [backlog](../component-backlog/popconfirm.md) |
| Popover | `popover` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 74 | use-focus-trap | 0 | 0 / 2 | ✓ (5) | ✓ Popover |

## Data Display (8)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Badge | `badge` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 87 | — | 3 | 109 / 8 | — | ✓ Badge |
| Avatar | `avatar` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 124 | — | 5 | 41 / 2 | — | ✓ Avatar + AvatarGroup |
| StatCard | `stat-card` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 19 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/stat-card.md) |
| TreeView | `tree-view` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 849 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/tree-view.md) |
| Accordion | `accordion` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 85 | — | 0 | 0 / 1 | — | ✓ Accordion |
| ContentScoreBar | `content-score-bar` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 107 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/content-score-bar.md) |
| Statistic | `statistic` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 66 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/statistic.md) |
| Timeline | `timeline` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 170 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/timeline.md) |

## Tables (4)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DataTable | `data-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 808 | pagination | 0 | 5 / 1 | — | ✗ [backlog](../component-backlog/data-table.md) |
| Table | `table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 158 | — | 0 | 3 / 1 | — | ✗ [backlog](../component-backlog/table.md) |
| AdvancedDataTable | `advanced-data-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1999 | data-table, pagination, search-bar, spinner | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/advanced-data-table.md) |
| BulkActionTable | `bulk-action-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 236 | table | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/bulk-action-table.md) |

## Charts (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chart | `chart` | ui | `@/modules/ui/Chart/index` | source-only (not exported from a barrel) | 1824 | — | 0 | 0 / 0 | — | ✗ [backlog](../component-backlog/chart.md) |

## Media (3)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Slider | `slider` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 644 | — | 0 | 3 / 2 | — | ✗ [backlog](../component-backlog/slider.md) |
| VideoPlayer | `video-player` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1487 | — | 0 | 1 / 1 | — | ✗ [backlog](../component-backlog/video-player.md) |
| MapView | `map-view` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 796 | button, card | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/map-view.md) |

## Advanced Components (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DiffViewer | `diff-viewer` | ui | `@/modules/ui/DiffViewer/index` | source-only (not exported from a barrel) | 841 | — | 0 | 0 / 1 | — | ✗ [backlog](../component-backlog/diff-viewer.md) |

## Utility (1)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SkipLink + LiveRegion | `skip-link` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 60 | — | 0 | 16 / 1 | — | ✗ [backlog](../component-backlog/skip-link.md) |

## App layer (out of scope) (40)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Form | `form` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 56 | alert-banner | 0 | 11 / 1 | — | n/a |
| NavDrawer | `nav-drawer` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 46 | drawer | 0 | 8 / 1 | — | n/a |
| AppShell | `app-shell` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 93 | drawer | 0 | 4 / 2 | — | n/a |
| InlineAlert | `inline-alert` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 42 | — | 0 | 4 / 1 | — | n/a |
| AppSidebar | `app-sidebar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 251 | badge | 0 | 3 / 2 | — | n/a |
| AppCommandBar | `app-command-bar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 792 | alert-banner, badge, button, empty-state, modal | 0 | 2 / 1 | ✓ (3) | n/a |
| SectionCard | `section-card` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 18 | — | 0 | 2 / 1 | — | n/a |
| AppFooter | `app-footer` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 68 | badge | 0 | 1 / 1 | — | n/a |
| Calendar | `calendar` | app | `@/modules/app/Calendar/index` | source-only (not exported from a barrel) | 3137 | event-card, skip-link | 0 | 1 / 1 | — | n/a |
| ContextMenu | `context-menu` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 288 | — | 0 | 1 / 1 | — | n/a |
| NotFoundPage | `common-not-found-page` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 100 | — | 0 | 1 / 1 | — | n/a |
| StepShell | `step-shell` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 82 | button | 0 | 1 / 1 | — | n/a |
| ThemeSwitcher | `theme-switcher` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 48 | button, dropdown-menu | 0 | 1 / 2 | — | n/a |
| AppBreadcrumbs | `app-breadcrumbs` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 99 | breadcrumb, button, dropdown-menu, tooltip | 0 | 0 / 1 | — | n/a |
| AppDrawer | `app-drawer` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 139 | badge, button, drawer, search-bar | 0 | 0 / 0 | — | n/a |
| AppNav | `app-nav` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 96 | button, nav-drawer | 0 | 0 / 1 | — | n/a |
| AppTopBar | `app-top-bar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 23 | — | 0 | 0 / 2 | — | n/a |
| CommentThread | `comment-thread` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 309 | avatar, button | 0 | 0 / 1 | — | n/a |
| DetailHeader | `detail-header` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 92 | badge | 0 | 0 / 1 | — | n/a |
| ErrorState | `error-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 105 | alert-banner, button, empty-state | 0 | 0 / 1 | — | n/a |
| FileUploadSection | `file-upload-section` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 615 | — | 0 | 0 / 1 | — | n/a |
| FilterBar | `filter-bar` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 110 | button, date-range-picker, multi-select, select, tag-input | 0 | 0 / 1 | — | n/a |
| FocusTrap | `accessibility-kit` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 100 | use-focus-trap | 0 | 0 / 0 | — | n/a |
| FormBuilder | `form-builder` | app | `@/modules/app/FormBuilder/index` | source-only (not exported from a barrel) | 2005 | — | 0 | 0 / 1 | — | n/a |
| FormField | `form-field` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 73 | — | 0 | 0 / 0 | — | n/a |
| Gantt | `gantt` | app | `@/modules/app/Gantt/index` | source-only (not exported from a barrel) | 2995 | — | 0 | 0 / 1 | — | n/a |
| GlobalSearch | `global-search` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 145 | search-bar | 0 | 0 / 2 | — | n/a |
| ImageGallery | `image-gallery` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 705 | context-menu | 0 | 0 / 1 | — | n/a |
| KanbanBoard | `kanban-board` | app | `@/modules/app/KanbanBoard/index` | source-only (not exported from a barrel) | 775 | card | 0 | 0 / 1 | — | n/a |
| LoadingState | `loading-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 129 | spinner | 0 | 0 / 1 | — | n/a |
| MaintenancePage | `maintenance-page` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 128 | badge | 0 | 0 / 1 | — | n/a |
| MentionPicker | `mention-picker` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 162 | avatar | 0 | 0 / 1 | — | n/a |
| NoAccessState | `no-access-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 105 | alert-banner, button, empty-state | 0 | 0 / 0 | — | n/a |
| NotFoundState | `not-found-state` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 105 | alert-banner, button, empty-state | 0 | 0 / 1 | — | n/a |
| NotificationProvider | `notification-system` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 40 | — | 0 | 0 / 0 | — | n/a |
| OnboardingWizard | `onboarding-wizard` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 225 | button, modal | 0 | 0 / 1 | — | n/a |
| RichTextEditor | `rich-text-editor` | app | `@/modules/app/RichTextEditor/index` | source-only (not exported from a barrel) | 1972 | button, color-picker, input, modal | 0 | 0 / 1 | — | n/a |
| ShareDialog | `share-dialog` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 267 | avatar, button, modal | 0 | 0 / 1 | — | n/a |
| SplashScreen | `splash-screen` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 61 | spinner | 0 | 0 / 1 | — | n/a |
| StepFlow | `step-flow` | app | `@kuraykaraaslan/kui-react/app` | public (npm: root + /app) | 126 | alert-banner, button, stepper | 0 | 0 / 0 | — | n/a |

## Other (out of scope) (3)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CodeEditor | `code-editor` | ui | `@/modules/ui/CodeEditor/index` | source-only (not exported from a barrel) | 642 | — | 0 | 2 / 1 | — | n/a |
| KUIViewer | `lib-kui-viewer` | library | `@kuraykaraaslan/kui-viewer` | external npm package (showcased only) | 284 | — | 0 | 0 / 0 | — | n/a |
| ServerDataTable | `server-data-table` | ui | `@kuraykaraaslan/kui-react/ui` | public (npm: root + /ui) | 1999 | data-table, pagination, search-bar, spinner | 0 | 0 / 0 | — | n/a |

## Hook (out of scope) (3)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| useFocusTrap | `use-focus-trap` | hook | `@/libs/hooks/useFocusTrap` | internal (libs/, not in package exports) | 62 | — | 0 | 6 / 0 | — | n/a |
| useA11yCheck | `use-a11y-check` | hook | `@/libs/hooks/useA11yCheck` | internal (libs/, not in package exports) | 30 | — | 0 | 0 / 0 | — | n/a |
| useBreakpoint | `use-breakpoint` | hook | `@/libs/hooks/useBreakpoint` | internal (libs/, not in package exports) | 43 | — | 0 | 0 / 0 | ✓ (5) | n/a |

## Domain — AI (out of scope) (9)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ModelProviderBadge | `ai-model-provider-badge` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 29 | badge | 0 | 3 / 1 | — | n/a |
| FeatureCheckCell | `ai-feature-check-cell` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 81 | — | 0 | 2 / 1 | — | n/a |
| ModelCard | `ai-model-card` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 115 | ai-model-provider-badge, ai-model-type-badge, badge | 0 | 2 / 1 | — | n/a |
| ModelScoreSparkline | `ai-model-score-sparkline` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 64 | — | 0 | 2 / 1 | — | n/a |
| ModelTypeBadge | `ai-model-type-badge` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 2 / 1 | — | n/a |
| ChatMessage | `ai-chat-message` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 56 | avatar, button | 0 | 1 / 1 | — | n/a |
| ModelComparisonTable | `ai-model-comparison-table` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 116 | ai-feature-check-cell, ai-model-provider-badge, ai-model-score-sparkline | 0 | 1 / 1 | — | n/a |
| UsageStatsCard | `ai-usage-stats-card` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 54 | stat-card | 0 | 1 / 1 | — | n/a |
| AIJobStatusBadge | `ai-job-status-badge` | domain | `@/modules/domains/ai` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 0 / 1 | — | n/a |

## Domain — API Doc (out of scope) (15)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SecuritySchemeBadge | `api-doc-security-scheme-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 33 | badge | 0 | 4 / 1 | — | n/a |
| CodeSamplePanel | `api-doc-code-sample-panel` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 82 | button, button-group | 0 | 2 / 1 | — | n/a |
| HttpMethodBadge | `api-doc-http-method-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 44 | — | 0 | 2 / 1 | — | n/a |
| SchemaViewer | `api-doc-schema-viewer` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 197 | — | 0 | 2 / 1 | — | n/a |
| ApiKeyTokenCard | `api-doc-api-key-token-card` | domain | `@/modules/domains/api-doc/ApiKeyTokenCard` | source-only (not exported from a barrel) | 166 | badge | 0 | 1 / 1 | — | n/a |
| ApiTagSection | `api-doc-api-tag-section` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 86 | api-doc-endpoint-row, badge | 0 | 1 / 1 | — | n/a |
| AuthSchemeCard | `api-doc-auth-scheme-card` | domain | `@/modules/domains/api-doc/AuthSchemeCard` | source-only (not exported from a barrel) | 102 | api-doc-security-scheme-badge, badge | 0 | 1 / 1 | — | n/a |
| EndpointRow | `api-doc-endpoint-row` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 64 | api-doc-http-method-badge, api-doc-operation-panel, badge | 0 | 1 / 1 | — | n/a |
| OAuthFlowDiagram | `api-doc-oauth-flow-diagram` | domain | `@/modules/domains/api-doc/OAuthFlowDiagram` | source-only (not exported from a barrel) | 170 | badge | 0 | 1 / 1 | — | n/a |
| OperationPanel | `api-doc-operation-panel` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 175 | api-doc-code-sample-panel, api-doc-parameter-table, api-doc-response-card, api-doc-schema-viewer, api-doc-security-scheme-badge, badge, empty-state, tab-group | 0 | 1 / 1 | — | n/a |
| ParameterTable | `api-doc-parameter-table` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 91 | badge, tooltip | 0 | 1 / 1 | — | n/a |
| ResponseCard | `api-doc-response-card` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 97 | api-doc-schema-viewer, badge | 0 | 1 / 1 | — | n/a |
| ServerSelector | `api-doc-server-selector` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 105 | badge | 0 | 1 / 1 | — | n/a |
| StatusCodeBadge | `api-doc-status-code-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 45 | — | 0 | 1 / 1 | — | n/a |
| SecurityBadge | `api-doc-security-badge` | domain | `@/modules/domains/api-doc` | source-public (vertical barrel; not in npm package) | 56 | — | 0 | 0 / 1 | — | n/a |

## Domain — Blog (out of scope) (11)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PostCard | `blog-post-card` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 74 | blog-category-badge, blog-post-meta, blog-post-status-badge | 0 | 6 / 2 | — | n/a |
| CategoryBadge | `blog-category-badge` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 4 / 1 | — | n/a |
| CommentForm | `blog-comment-form` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 112 | button, input, textarea | 0 | 4 / 1 | — | n/a |
| PostStatusBadge | `blog-post-status-badge` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 4 / 3 | — | n/a |
| PostMeta | `blog-post-meta` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 48 | avatar | 0 | 3 / 1 | — | n/a |
| CommentList | `blog-comment-list` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 67 | blog-comment-form, blog-comment-item | 0 | 2 / 1 | — | n/a |
| PostContent | `blog-post-content` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 37 | — | 0 | 2 / 1 | — | n/a |
| AuthorBioCard | `blog-author-bio-card` | domain | `@/modules/domains/blog/author/AuthorBioCard` | source-only (not exported from a barrel) | 139 | avatar, badge, button | 0 | 1 / 1 | — | n/a |
| AuthorStatsRow | `blog-author-stats-row` | domain | `@/modules/domains/blog/author/AuthorStatsRow` | source-only (not exported from a barrel) | 59 | — | 0 | 1 / 1 | — | n/a |
| CommentItem | `blog-comment-item` | domain | `@/modules/domains/blog` | source-public (vertical barrel; not in npm package) | 80 | avatar, blog-comment-form, button | 0 | 1 / 1 | — | n/a |
| TopicCloud | `blog-topic-cloud` | domain | `@/modules/domains/blog/author/TopicCloud` | source-only (not exported from a barrel) | 91 | — | 0 | 1 / 1 | — | n/a |

## Domain — Commerce (out of scope) (10)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OrderStatusBadge | `commerce-order-status-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 31 | badge | 0 | 4 / 2 | — | n/a |
| ProductCard | `commerce-product-card` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 166 | commerce-stock-status-badge | 0 | 4 / 1 | — | n/a |
| CartItem | `commerce-cart-item` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 79 | — | 0 | 3 / 1 | — | n/a |
| StockStatusBadge | `commerce-stock-status-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 26 | badge | 0 | 3 / 1 | — | n/a |
| ProductImageGallery | `commerce-product-image-gallery` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 155 | — | 0 | 2 / 1 | — | n/a |
| OrderCard | `commerce-order-card` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 94 | commerce-order-status-badge | 0 | 1 / 1 | — | n/a |
| ProductTypeBadge | `commerce-product-type-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 25 | badge | 0 | 1 / 1 | — | n/a |
| EmptyWishlistState | `commerce-empty-wishlist-state` | domain | `@/modules/domains/commerce/wishlist/EmptyWishlistState` | source-only (not exported from a barrel) | 98 | button | 0 | 0 / 1 | — | n/a |
| ProductStatusBadge | `commerce-product-status-badge` | domain | `@/modules/domains/commerce` | source-public (vertical barrel; not in npm package) | 26 | badge | 0 | 0 / 1 | — | n/a |
| WishlistItemCard | `commerce-wishlist-item-card` | domain | `@/modules/domains/commerce/wishlist/WishlistItemCard` | source-only (not exported from a barrel) | 154 | badge, button, commerce-stock-status-badge | 0 | 0 / 1 | — | n/a |

## Domain — Common (out of scope) (42)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PriceDisplay | `common-price-display` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 48 | — | 0 | 6 / 1 | — | n/a |
| OrderTotalsCard | `common-order-totals-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 46 | common-price-display | 0 | 4 / 1 | — | n/a |
| PaymentStatusBadge | `common-payment-status-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 24 | badge | 0 | 4 / 1 | — | n/a |
| AddressCard | `common-address-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 83 | button | 0 | 3 / 1 | — | n/a |
| CouponInput | `common-coupon-input` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 105 | button, input | 0 | 3 / 1 | — | n/a |
| CreditCardForm | `common-credit-card-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 210 | button, common-credit-card-visual, form, input | 0 | 3 / 1 | — | n/a |
| PaymentSummaryCard | `common-payment-summary-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 61 | common-payment-status-badge, common-price-display | 0 | 3 / 1 | — | n/a |
| SavedCardSelector | `common-saved-card-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 132 | button | 0 | 3 / 1 | — | n/a |
| UserProfileCard | `common-user-profile-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 49 | common-user-avatar, common-user-role-badge, common-user-status-badge | 0 | 3 / 1 | — | n/a |
| AddressForm | `common-address-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 113 | button, form, input | 0 | 2 / 1 | — | n/a |
| AddressSelector | `common-address-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 77 | button, common-address-card | 0 | 2 / 1 | — | n/a |
| CountrySelector | `common-country-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 221 | button | 0 | 2 / 1 | — | n/a |
| CreditCardVisual | `common-credit-card-visual` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 133 | — | 0 | 2 / 1 | — | n/a |
| LanguageSwitcher | `common-language-switcher` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 91 | button, dropdown-menu | 0 | 2 / 1 | — | n/a |
| OAuthButtons | `common-oauth-buttons` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 59 | button | 0 | 2 / 1 | — | n/a |
| ChangePasswordForm | `common-change-password-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 87 | button, form, input | 0 | 1 / 1 | — | n/a |
| CheckoutSuccessState | `common-checkout-success-state` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 56 | button, common-address-card, common-payment-summary-card | 0 | 1 / 1 | — | n/a |
| CurrencySelector | `common-currency-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 176 | button | 0 | 1 / 1 | — | n/a |
| ForgotPasswordForm | `common-forgot-password-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 63 | button, form, input | 0 | 1 / 1 | — | n/a |
| LoginForm | `common-login-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 83 | button, form, input | 0 | 1 / 1 | — | n/a |
| PaymentMethodSelector | `common-payment-method-selector` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 57 | dropdown-menu, radio-group | 0 | 1 / 1 | — | n/a |
| RegisterForm | `common-register-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 88 | button, form, input | 0 | 1 / 1 | — | n/a |
| SessionExpiredBanner | `common-session-expired-banner` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 42 | button | 0 | 1 / 1 | — | n/a |
| UserAvatar | `common-user-avatar` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 19 | avatar | 0 | 1 / 1 | — | n/a |
| UserMenu | `common-user-menu` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 58 | avatar, button, dropdown-menu | 0 | 1 / 4 | — | n/a |
| UserPreferencesForm | `common-user-preferences-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 82 | button, common-language-switcher, form, theme-switcher, toggle | 0 | 1 / 1 | — | n/a |
| UserProfileForm | `common-user-profile-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 104 | button, form, input, textarea | 0 | 1 / 1 | — | n/a |
| UserRoleBadge | `common-user-role-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 20 | badge | 0 | 1 / 1 | — | n/a |
| UserStatusBadge | `common-user-status-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 21 | badge | 0 | 1 / 1 | — | n/a |
| Charts | `common-charts` | domain | `@/modules/domains/common/charts/Charts` | source-only (not exported from a barrel) | 259 | — | 0 | 0 / 0 | — | n/a |
| ChatBox | `common-chat-box` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 295 | — | 0 | 0 / 1 | — | n/a |
| DirectionProvider | `common-direction-provider` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 43 | — | 0 | 0 / 1 | — | n/a |
| DiscountBadge | `common-discount-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 43 | — | 0 | 0 / 1 | — | n/a |
| GeoPointDisplay | `common-geo-point-display` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 49 | — | 0 | 0 / 1 | — | n/a |
| LocationPicker | `common-location-picker` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 110 | button, form, input, select | 0 | 0 / 1 | — | n/a |
| NotificationMenu | `common-notification-menu` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 164 | — | 0 | 0 / 2 | — | n/a |
| ProcessingStatusIndicator | `common-processing-status-indicator` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 79 | — | 0 | 0 / 1 | — | n/a |
| PublishStatusBadge | `common-publish-status-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 34 | badge | 0 | 0 / 1 | — | n/a |
| SeoForm | `common-seo-form` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 93 | button, form, input, tag-input, textarea | 0 | 0 / 1 | — | n/a |
| SeoPreview | `common-seo-preview` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 63 | — | 0 | 0 / 1 | — | n/a |
| SubscriptionPlanCard | `common-subscription-plan-card` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 122 | — | 0 | 0 / 1 | — | n/a |
| VisibilityBadge | `common-visibility-badge` | domain | `@kuraykaraaslan/kui-react/common` | public (npm: root + /common) | 34 | badge | 0 | 0 / 1 | — | n/a |

## Domain — Event (out of scope) (19)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EventCard | `event-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 93 | event-category-badge, event-format-badge, event-status-badge | 0 | 9 / 1 | — | n/a |
| EventCategoryBadge | `event-category-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 34 | — | 0 | 4 / 1 | — | n/a |
| TicketCard | `ticket-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 194 | — | 0 | 4 / 1 | — | n/a |
| EventStatusBadge | `event-status-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 36 | — | 0 | 3 / 1 | — | n/a |
| NavDropdown | `event-nav-dropdown` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 58 | — | 0 | 3 / 1 | — | n/a |
| EventFormatBadge | `event-format-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 35 | — | 0 | 2 / 1 | — | n/a |
| EventOrderStatusBadge | `event-order-status-badge` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 34 | — | 0 | 2 / 1 | — | n/a |
| CheckoutSuccess | `checkout-success` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 122 | button, ticket-card | 0 | 1 / 1 | — | n/a |
| CityPicker | `event-city-picker` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 79 | event-nav-dropdown | 0 | 1 / 1 | — | n/a |
| EventInfoGrid | `event-info-grid` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 63 | card | 0 | 1 / 1 | — | n/a |
| HeroSlide | `hero-slide` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 104 | badge, event-category-badge, event-status-badge | 0 | 1 / 1 | — | n/a |
| NavLanguageSwitcher | `event-nav-language-switcher` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 84 | event-nav-dropdown | 0 | 1 / 1 | — | n/a |
| NavThemeSwitcher | `event-nav-theme-switcher` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 81 | event-nav-dropdown | 0 | 1 / 1 | — | n/a |
| OrganizerCard | `organizer-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 74 | brand-logo | 0 | 1 / 1 | — | n/a |
| SeatMapPicker | `seat-map-picker` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 1031 | — | 0 | 1 / 1 | — | n/a |
| SectionPricingCard | `section-pricing-card` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 105 | — | 0 | 1 / 1 | — | n/a |
| StepIndicator | `step-indicator` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 58 | — | 0 | 1 / 1 | — | n/a |
| TicketRowMeta + TicketRowActions | `event-ticket-row-meta` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 97 | — | 0 | 1 / 1 | — | n/a |
| TicketSidebarBox | `ticket-sidebar-box` | domain | `@/modules/domains/event` | source-public (vertical barrel; not in npm package) | 43 | — | 0 | 1 / 1 | — | n/a |

## Domain — Fintech (out of scope) (12)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CurrencyBadge | `fintech-currency-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 24 | badge | 0 | 2 / 1 | — | n/a |
| TransactionRow | `fintech-transaction-row` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 113 | fintech-transaction-status-badge, fintech-transaction-type-badge | 0 | 2 / 1 | — | n/a |
| AssetAllocationCard | `fintech-asset-allocation-card` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 119 | — | 0 | 1 / 1 | — | n/a |
| CardActionMenu | `fintech-card-action-menu` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 87 | button, dropdown-menu | 0 | 1 / 1 | — | n/a |
| CardLimitMeter | `fintech-card-limit-meter` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 83 | — | 0 | 1 / 1 | — | n/a |
| PaymentCardTile | `fintech-payment-card-tile` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 116 | badge | 0 | 1 / 1 | — | n/a |
| PerformanceSparkline | `fintech-performance-sparkline` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 73 | — | 0 | 1 / 1 | — | n/a |
| PortfolioHoldingRow | `fintech-portfolio-holding-row` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 97 | fintech-currency-badge | 0 | 1 / 1 | — | n/a |
| TransactionStatusBadge | `fintech-transaction-status-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 22 | badge | 0 | 1 / 1 | — | n/a |
| TransactionTypeBadge | `fintech-transaction-type-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 25 | badge | 0 | 1 / 1 | — | n/a |
| WalletStatusBadge | `fintech-wallet-status-badge` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 1 / 1 | — | n/a |
| WalletCard | `fintech-wallet-card` | domain | `@/modules/domains/fintech` | source-public (vertical barrel; not in npm package) | 131 | fintech-currency-badge, fintech-wallet-status-badge | 0 | 0 / 1 | — | n/a |

## Domain — Food (out of scope) (11)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RestaurantCard | `food-restaurant-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 134 | — | 0 | 3 / 1 | — | n/a |
| DeliveryStatusBadge | `food-delivery-status-badge` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 30 | badge | 0 | 2 / 1 | — | n/a |
| CourierCard | `food-courier-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 114 | avatar, button | 0 | 1 / 1 | — | n/a |
| CuisineHeroBanner | `food-cuisine-hero-banner` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 125 | — | 0 | 1 / 1 | — | n/a |
| CuisineTagChip | `food-cuisine-tag-chip` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 70 | — | 0 | 1 / 1 | — | n/a |
| EtaCountdownCard | `food-eta-countdown-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 83 | — | 0 | 1 / 1 | — | n/a |
| FeaturedDishCard | `food-featured-dish-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 109 | badge | 0 | 1 / 1 | — | n/a |
| MenuItemCard | `food-menu-item-card` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 120 | badge, button | 0 | 1 / 1 | — | n/a |
| OrderTrackingTimeline | `food-order-tracking-timeline` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 116 | — | 0 | 1 / 1 | — | n/a |
| RestaurantStatusBadge | `food-restaurant-status-badge` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 1 / 1 | — | n/a |
| OrderStatusBadge | `food-order-status-badge` | domain | `@/modules/domains/food` | source-public (vertical barrel; not in npm package) | 33 | badge | 0 | 0 / 0 | — | n/a |

## Domain — Forum (out of scope) (10)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TopicStatusBadge | `forum-topic-status-badge` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 3 / 1 | — | n/a |
| BadgeShelf | `forum-badge-shelf` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 96 | — | 0 | 1 / 1 | — | n/a |
| ForumUserCard | `forum-user-card` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 133 | avatar, badge, button | 0 | 1 / 1 | — | n/a |
| PostComposer | `forum-post-composer` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 161 | button, input, select, tab-group, tag-input, textarea | 0 | 1 / 1 | — | n/a |
| ReactionTypeBadge | `forum-reaction-type-badge` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 57 | — | 0 | 1 / 1 | — | n/a |
| ReputationBar | `forum-reputation-bar` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 110 | — | 0 | 1 / 1 | — | n/a |
| UserActivityRow | `forum-user-activity-row` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 98 | — | 0 | 1 / 1 | — | n/a |
| ForumCategoryCard | `forum-category-card` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 97 | — | 0 | 0 / 1 | — | n/a |
| PostStatusBadge | `forum-post-status-badge` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 0 / 0 | — | n/a |
| TopicRow | `forum-topic-row` | domain | `@/modules/domains/forum` | source-public (vertical barrel; not in npm package) | 115 | forum-topic-status-badge | 0 | 0 / 1 | — | n/a |

## Domain — IoT (out of scope) (11)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AlertSeverityBadge | `iot-alert-severity-badge` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 4 / 1 | — | n/a |
| DeviceStatusBadge | `iot-device-status-badge` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 22 | badge | 0 | 4 / 1 | — | n/a |
| DeviceTypeBadge | `iot-device-type-badge` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 3 / 1 | — | n/a |
| AlertDetailHeader | `iot-alert-detail-header` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 137 | badge, button, iot-alert-severity-badge | 0 | 1 / 1 | — | n/a |
| AlertEventTimeline | `iot-alert-event-timeline` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 97 | — | 0 | 1 / 1 | — | n/a |
| LogStreamRow | `iot-log-stream-row` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 76 | — | 0 | 1 / 1 | — | n/a |
| MetricSparklineCard | `iot-metric-sparkline-card` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 100 | — | 0 | 1 / 1 | — | n/a |
| RulesetEditor | `iot-ruleset-editor` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 1147 | code-editor, modal | 0 | 1 / 1 | — | n/a |
| TelemetryTimeSeriesChart | `iot-telemetry-time-series-chart` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 82 | — | 0 | 1 / 1 | — | n/a |
| CloudWorkspaceCard | `iot-cloud-workspace-card` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 131 | badge | 0 | 0 / 1 | — | n/a |
| DeviceCard | `iot-device-card` | domain | `@/modules/domains/iot` | source-public (vertical barrel; not in npm package) | 105 | iot-device-status-badge, iot-device-type-badge | 0 | 0 / 1 | — | n/a |

## Domain — Jobs (out of scope) (8)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JobCard | `jobs-job-card` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 92 | avatar, jobs-experience-badge, jobs-job-meta, jobs-type-badge, jobs-work-mode-badge | 0 | 3 / 1 | — | n/a |
| JobTypeBadge | `jobs-type-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 3 / 1 | — | n/a |
| JobWorkModeBadge | `jobs-work-mode-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 24 | badge | 0 | 3 / 1 | — | n/a |
| CompanyCard | `jobs-company-card` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 90 | avatar, badge | 0 | 2 / 1 | — | n/a |
| JobExperienceBadge | `jobs-experience-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 2 / 1 | — | n/a |
| JobMeta | `jobs-job-meta` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 63 | — | 0 | 2 / 1 | — | n/a |
| ApplicationStatusBadge | `jobs-application-status-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 21 | badge | 0 | 1 / 1 | — | n/a |
| JobStatusBadge | `jobs-status-badge` | domain | `@/modules/domains/jobs` | source-public (vertical barrel; not in npm package) | 19 | badge | 0 | 1 / 1 | — | n/a |

## Domain — Landing (out of scope) (14)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| StatsBar | `landing-stats-bar` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 54 | — | 0 | 4 / 1 | — | n/a |
| FeatureGrid | `landing-feature-grid` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 55 | landing-feature-card | 0 | 3 / 1 | — | n/a |
| HowItWorksSection | `landing-how-it-works` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 104 | — | 0 | 3 / 1 | — | n/a |
| PartnerLogosStrip | `landing-partner-logos-strip` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 51 | — | 0 | 3 / 1 | — | n/a |
| FaqAccordion | `landing-faq-accordion` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 117 | — | 0 | 2 / 1 | — | n/a |
| HeroSection | `landing-hero-section` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 101 | — | 0 | 2 / 1 | — | n/a |
| TestimonialGrid | `landing-testimonial-grid` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 49 | landing-testimonial-card | 0 | 2 / 1 | — | n/a |
| AnnouncementBar | `landing-announcement-bar` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 71 | — | 0 | 1 / 1 | — | n/a |
| FeatureCard | `landing-feature-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 69 | — | 0 | 1 / 1 | — | n/a |
| MegaMenu | `landing-mega-menu` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 326 | — | 0 | 1 / 1 | — | n/a |
| PricingGrid | `landing-pricing-grid` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 95 | landing-pricing-plan-card | 0 | 1 / 1 | — | n/a |
| PricingPlanCard | `landing-pricing-plan-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 90 | — | 0 | 1 / 1 | — | n/a |
| TeamMemberCard | `landing-team-member-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 74 | — | 0 | 1 / 1 | — | n/a |
| TestimonialCard | `landing-testimonial-card` | domain | `@/modules/domains/landing` | source-public (vertical barrel; not in npm package) | 77 | — | 0 | 1 / 1 | — | n/a |

## Domain — Media (out of scope) (9)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ChannelCard | `media-channel-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 115 | avatar, button | 0 | 3 / 1 | — | n/a |
| VideoCard | `media-video-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 146 | media-video-status-badge | 0 | 3 / 1 | — | n/a |
| VideoStatusBadge | `media-video-status-badge` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 29 | badge | 0 | 2 / 1 | — | n/a |
| ChannelStatsCard | `media-channel-stats-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 101 | — | 0 | 1 / 1 | — | n/a |
| PlaylistHeaderCard | `media-playlist-header-card` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 131 | avatar, badge, button | 0 | 1 / 1 | — | n/a |
| PlaylistVideoRow | `media-playlist-video-row` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 106 | — | 0 | 1 / 1 | — | n/a |
| VideoMeta | `media-video-meta` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 69 | — | 0 | 1 / 1 | — | n/a |
| VideoPerformanceRow | `media-video-performance-row` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 113 | media-video-status-badge | 0 | 1 / 1 | — | n/a |
| WatchTimeChart | `media-watch-time-chart` | domain | `@/modules/domains/media` | source-public (vertical barrel; not in npm package) | 86 | — | 0 | 1 / 1 | — | n/a |

## Domain — NFT (out of scope) (16)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ActivityFeedRow | `nft-activity-feed-row` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 117 | nft-blockchain-badge | 0 | 5 / 1 | — | n/a |
| BlockchainBadge | `nft-blockchain-badge` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 52 | — | 0 | 5 / 1 | — | n/a |
| NftCard | `nft-card` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 108 | nft-blockchain-badge, nft-price-tag, nft-rarity-badge | 0 | 4 / 1 | — | n/a |
| CollectionCard | `nft-collection-card` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 104 | nft-blockchain-badge | 0 | 3 / 1 | — | n/a |
| PriceTag | `nft-price-tag` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 99 | — | 0 | 2 / 1 | — | n/a |
| RarityBadge | `nft-rarity-badge` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 44 | — | 0 | 2 / 1 | — | n/a |
| AuctionCountdown | `nft-auction-countdown` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 100 | — | 0 | 1 / 1 | — | n/a |
| BidHistoryRow | `nft-bid-history-row` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 68 | avatar | 0 | 1 / 1 | — | n/a |
| CollectionStatsBar | `nft-collection-stats-bar` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 65 | — | 0 | 1 / 1 | — | n/a |
| CreatorLeaderboardRow | `nft-creator-leaderboard-row` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 84 | avatar | 0 | 1 / 1 | — | n/a |
| CreatorProfileCard | `nft-creator-profile-card` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 143 | avatar, button | 0 | 1 / 1 | — | n/a |
| FloorPriceChart | `nft-floor-price-chart` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 133 | — | 0 | 1 / 1 | — | n/a |
| MintProgressBar | `nft-mint-progress-bar` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 68 | — | 0 | 1 / 1 | — | n/a |
| NftDetailHeader | `nft-detail-header` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 101 | avatar, nft-blockchain-badge, nft-rarity-badge | 0 | 1 / 1 | — | n/a |
| TraitTag | `nft-trait-tag` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 36 | — | 0 | 1 / 1 | — | n/a |
| WalletConnectButton | `nft-wallet-connect-button` | domain | `@/modules/domains/nft` | source-public (vertical barrel; not in npm package) | 134 | — | 0 | 1 / 1 | — | n/a |

## Domain — Real Estate (out of scope) (5)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PropertyCard | `real-estate-property-card` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 127 | real-estate-listing-type-badge, real-estate-property-type-badge | 0 | 4 / 1 | — | n/a |
| ListingTypeBadge | `real-estate-listing-type-badge` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 17 | badge | 0 | 2 / 1 | — | n/a |
| PropertyTypeBadge | `real-estate-property-type-badge` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 20 | badge | 0 | 2 / 1 | — | n/a |
| AgentCard | `real-estate-agent-card` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 90 | avatar, badge, button | 0 | 1 / 1 | — | n/a |
| PropertyStatusBadge | `real-estate-property-status-badge` | domain | `@/modules/domains/real-estate` | source-public (vertical barrel; not in npm package) | 20 | badge | 0 | 1 / 1 | — | n/a |

## Domain — Reviews (out of scope) (4)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RatingDistribution | `reviews-rating-distribution` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 71 | — | 1 | 1 / 1 | — | n/a |
| ReviewCard | `reviews-review-card` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 121 | avatar, badge, star-rating | 0 | 0 / 1 | — | n/a |
| ReviewSubmitForm | `reviews-review-submit-form` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 133 | button, input, star-rating, textarea | 0 | 0 / 1 | — | n/a |
| ReviewSummaryCard | `reviews-review-summary-card` | domain | `@/modules/domains/reviews` | source-public (vertical barrel; not in npm package) | 63 | reviews-rating-distribution, star-rating | 0 | 0 / 1 | — | n/a |

## Domain — Social (out of scope) (6)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SocialProfileCard | `social-profile-card` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 154 | avatar, button | 0 | 3 / 1 | — | n/a |
| MarketplaceListingCard | `social-marketplace-listing-card` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 83 | avatar | 0 | 1 / 1 | — | n/a |
| PostPrivacyBadge | `social-post-privacy-badge` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 31 | — | 0 | 1 / 1 | — | n/a |
| SocialNotificationItem | `social-notification-item` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 97 | avatar | 0 | 1 / 1 | — | n/a |
| PostCard | `social-post-card` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 200 | avatar, social-post-privacy-badge | 0 | 0 / 0 | — | n/a |
| PostStatusBadge | `social-post-status-badge` | domain | `@/modules/domains/social` | source-public (vertical barrel; not in npm package) | 41 | — | 0 | 0 / 0 | — | n/a |

## Domain — Travel (out of scope) (5)

| Component | id | Layer | Export path | Public status | LOC | Composes | Used by | Imports (prod / showcase) | Tests | KuiNative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FlightCabinBadge | `travel-flight-cabin-badge` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 26 | badge | 0 | 3 / 1 | — | n/a |
| FlightSegmentStatusBadge | `travel-flight-segment-status-badge` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 27 | badge | 0 | 3 / 1 | — | n/a |
| BookingStatusBadge | `travel-booking-status-badge` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 29 | badge | 0 | 1 / 1 | — | n/a |
| FlightCard | `travel-flight-card` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 109 | button, travel-flight-cabin-badge, travel-flight-segment-status-badge | 0 | 1 / 1 | — | n/a |
| HotelCard | `travel-hotel-card` | domain | `@/modules/domains/travel` | source-public (vertical barrel; not in npm package) | 131 | button | 0 | 1 / 1 | — | n/a |