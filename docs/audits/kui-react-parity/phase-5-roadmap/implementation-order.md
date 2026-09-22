# Implementation order

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Single ordered list across all waves (dependencies always precede dependants; a dependency is pulled into an earlier wave when needed).

| # | Wave | Item | Priority | Complexity | Blocked by | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | **R-infra-test** Test harness: Jest + @testing-library/react-native + CI | Critical | Medium | — | 2–3 d |
| 2 | 1 | **R-infra-package** Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | Critical | Large | — | 5–8 d |
| 3 | 1 | **R-infra-lint** ESLint (expo + a11y), token/raw-hex audit, convention rules | High | Small | — | 0.5–1 d |
| 4 | 1 | [AlertBanner](../component-backlog/alert-banner.md) | Critical | Small | — | 0.5–1 d |
| 5 | 1 | [Label](../component-backlog/label.md) | Critical | Small | — | 0.5–1 d |
| 6 | 1 | **R-button** Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) | Critical | Small | — | 0.5–1 d |
| 7 | 1 | **R-field-shell** Extract FieldShell (Label, hint, error, success, count) shared by all form controls | Critical | Small | label | 0.5–1 d |
| 8 | 1 | **R-theme-provider** Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | Critical | Small | R-infra-package | 0.5–1 d |
| 9 | 1 | **R-typography** Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage | Critical | Small | — | 0.5–1 d |
| 10 | 1 | [RadioGroup](../component-backlog/radio-group.md) | Critical | Small | R-field-shell | 0.5–1 d |
| 11 | 1 | [Separator](../component-backlog/separator.md) | Critical | Small | — | 0.5–1 d |
| 12 | 1 | [TabGroup](../component-backlog/tab-group.md) | Critical | Small | — | 0.5–1 d |
| 13 | 1 | [Textarea](../component-backlog/textarea.md) | Critical | Small | R-field-shell | 0.5–1 d |
| 14 | 1 | **R-overlay-core** Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` | Critical | Medium | — | 2–3 d |
| 15 | 1 | [Drawer](../component-backlog/drawer.md) | Critical | Medium | R-overlay-core | 2–3 d |
| 16 | 1 | [Progress](../component-backlog/progress.md) | Critical | Medium | — | 2–3 d |
| 17 | 1 | **R-input** Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) | Critical | Medium | R-field-shell | 2–3 d |
| 18 | 1 | **R-modal** Modal rewrite (see rewrite-candidates.md) | Critical | Medium | R-overlay-core | 2–3 d |
| 19 | 1 | [Select](../component-backlog/select.md) | Critical | Medium | R-overlay-core, R-field-shell | 2–3 d |
| 20 | 1 | [Toast](../component-backlog/toast.md) | Critical | Medium | — | 2–3 d |
| 21 | 1 | [FocusTrap](../component-backlog/accessibility-kit.md) | High | Small | R-overlay-core | 0.5–1 d |
| 22 | 1 | **R-empty-state** EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | Medium | Small | — | 0.5–1 d |
| 23 | 1 | [ErrorState](../component-backlog/error-state.md) | High | Small | alert-banner, R-button, R-empty-state | 0.5–1 d |
| 24 | 1 | **R-spinner** Spinner parity (xs–xl, two-tone ring, md ≠ sm) | Medium | Small | — | 0.5–1 d |
| 25 | 1 | [LoadingState](../component-backlog/loading-state.md) | High | Small | R-spinner | 0.5–1 d |
| 26 | 1 | [NotificationProvider](../component-backlog/notification-system.md) | High | Small | toast | 0.5–1 d |
| 27 | 1 | **R-fa-version** Align Font Awesome to v7 (KuiReact peer range `>=7`) | High | Small | — | 0.5–1 d |
| 28 | 1 | [useBreakpoint](../component-backlog/use-breakpoint.md) | High | Small | — | 0.5–1 d |
| 29 | 2 | **R-infra-parity** Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | Medium | R-infra-test | 2–3 d |
| 30 | 2 | [Accordion](../component-backlog/accordion.md) | High | Small | — | 0.5–1 d |
| 31 | 2 | [ButtonGroup](../component-backlog/button-group.md) | High | Small | — | 0.5–1 d |
| 32 | 2 | [CheckboxGroup](../component-backlog/checkbox-group.md) | High | Small | R-field-shell | 0.5–1 d |
| 33 | 2 | [Form](../component-backlog/form.md) | High | Small | alert-banner | 0.5–1 d |
| 34 | 2 | [FormField](../component-backlog/form-field.md) | High | Small | — | 0.5–1 d |
| 35 | 2 | [InlineAlert](../component-backlog/inline-alert.md) | High | Small | — | 0.5–1 d |
| 36 | 2 | [PageHeader](../component-backlog/page-header.md) | High | Small | — | 0.5–1 d |
| 37 | 2 | **R-avatar** Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | High | Small | — | 0.5–1 d |
| 38 | 2 | **R-badge** Badge parity (children, `neutral`, sizes, dot, dismissible) | High | Small | — | 0.5–1 d |
| 39 | 2 | **R-shadow** Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | Medium | Small | — | 0.5–1 d |
| 40 | 2 | **R-card** Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | High | Small | R-shadow | 0.5–1 d |
| 41 | 2 | **R-checkbox** Checkbox parity (hint, error, uncontrolled `defaultChecked`) | High | Small | R-field-shell | 0.5–1 d |
| 42 | 2 | **R-skeleton** Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | High | Small | — | 0.5–1 d |
| 43 | 2 | **R-toggle** Switch → Toggle parity (name, checked/onChange, description, size, label press) | High | Small | — | 0.5–1 d |
| 44 | 2 | [SearchBar](../component-backlog/search-bar.md) | High | Small | R-field-shell | 0.5–1 d |
| 45 | 2 | [SectionCard](../component-backlog/section-card.md) | High | Small | — | 0.5–1 d |
| 46 | 2 | [Stepper](../component-backlog/stepper.md) | High | Small | — | 0.5–1 d |
| 47 | 2 | [Popover](../component-backlog/popover.md) | Medium | Medium | R-overlay-core | 2–3 d |
| 48 | 2 | [DropdownMenu](../component-backlog/dropdown-menu.md) | High | Medium | R-overlay-core, popover, drawer | 2–3 d |
| 49 | 2 | [ThemeSwitcher](../component-backlog/theme-switcher.md) | High | Small | dropdown-menu, R-button, R-theme-provider | 0.5–1 d |
| 50 | 2 | [MultiSelect](../component-backlog/multi-select.md) | High | Medium | R-overlay-core, R-field-shell | 2–3 d |
| 51 | 2 | [RangeSlider](../component-backlog/range-slider.md) | High | Medium | — | 2–3 d |
| 52 | 2 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | Small | — | 0.5–1 d |
| 53 | 2 | [Calendar](../component-backlog/calendar.md) | Low | Very Large | event-card, skip-link | 10–20 d |
| 54 | 2 | [DatePicker](../component-backlog/date-picker.md) | High | Large | calendar, R-overlay-core, R-field-shell | 5–8 d |
| 55 | 2 | [AppDrawer](../component-backlog/app-drawer.md) | Medium | Small | drawer, search-bar, R-badge, R-button | 0.5–1 d |
| 56 | 2 | [AppTopBar](../component-backlog/app-top-bar.md) | Medium | Small | — | 0.5–1 d |
| 57 | 2 | [BrandLogo](../component-backlog/brand-logo.md) | Medium | Small | — | 0.5–1 d |
| 58 | 2 | [DetailHeader](../component-backlog/detail-header.md) | Medium | Small | R-badge, page-header, tab-group | 0.5–1 d |
| 59 | 2 | [NoAccessState](../component-backlog/no-access-state.md) | Medium | Small | alert-banner, R-button, R-empty-state | 0.5–1 d |
| 60 | 2 | [NotFoundState](../component-backlog/not-found-state.md) | Medium | Small | alert-banner, R-button, R-empty-state | 0.5–1 d |
| 61 | 2 | [Pagination](../component-backlog/pagination.md) | Medium | Small | — | 0.5–1 d |
| 62 | 2 | [Popconfirm](../component-backlog/popconfirm.md) | Medium | Small | R-overlay-core, R-button, popover | 0.5–1 d |
| 63 | 2 | [SplashScreen](../component-backlog/splash-screen.md) | Medium | Small | R-spinner | 0.5–1 d |
| 64 | 2 | [StarRating](../component-backlog/star-rating.md) | Medium | Small | — | 0.5–1 d |
| 65 | 2 | [StatCard](../component-backlog/stat-card.md) | Medium | Small | — | 0.5–1 d |
| 66 | 2 | [Statistic](../component-backlog/statistic.md) | Medium | Small | — | 0.5–1 d |
| 67 | 2 | [StepShell](../component-backlog/step-shell.md) | Medium | Small | R-button | 0.5–1 d |
| 68 | 2 | [TabButton](../component-backlog/tab-button.md) | Medium | Small | — | 0.5–1 d |
| 69 | 2 | [Timeline](../component-backlog/timeline.md) | Medium | Small | — | 0.5–1 d |
| 70 | 2 | [AppShell](../component-backlog/app-shell.md) | Medium | Medium | drawer | 2–3 d |
| 71 | 2 | [AppSidebar](../component-backlog/app-sidebar.md) | Medium | Medium | R-badge | 2–3 d |
| 72 | 2 | [FileInput](../component-backlog/file-input.md) | Medium | Medium | R-field-shell | 2–3 d |
| 73 | 2 | [DateRangePicker](../component-backlog/date-range-picker.md) | Medium | Large | calendar, date-picker, R-overlay-core, R-field-shell | 5–8 d |
| 74 | 2 | [TagInput](../component-backlog/tag-input.md) | Medium | Medium | R-field-shell | 2–3 d |
| 75 | 2 | [FilterBar](../component-backlog/filter-bar.md) | Medium | Medium | date-range-picker, multi-select, select, tag-input, R-button, date-picker | 2–3 d |
| 76 | 2 | [GlobalSearch](../component-backlog/global-search.md) | Medium | Medium | search-bar | 2–3 d |
| 77 | 2 | [OnboardingWizard](../component-backlog/onboarding-wizard.md) | Medium | Medium | R-button, R-modal, stepper | 2–3 d |
| 78 | 2 | [Slider](../component-backlog/slider.md) | Medium | Medium | — | 2–3 d |
| 79 | 2 | [StepFlow](../component-backlog/step-flow.md) | Medium | Medium | alert-banner, stepper, R-button, step-shell | 2–3 d |
| 80 | 2 | [Table](../component-backlog/table.md) | Medium | Medium | — | 2–3 d |
| 81 | 2 | [TimePicker](../component-backlog/time-picker.md) | Medium | Medium | R-overlay-core, R-field-shell | 2–3 d |
| 82 | 2 | [ComboBox](../component-backlog/combo-box.md) | Medium | Large | R-overlay-core, R-field-shell | 5–8 d |
| 83 | 3 | [FileUploadSection](../component-backlog/file-upload-section.md) | Medium | Large | file-input, progress | 5–8 d |
| 84 | 3 | [ContextMenu](../component-backlog/context-menu.md) | Low | Medium | dropdown-menu, R-overlay-core | 2–3 d |
| 85 | 3 | [ImageGallery](../component-backlog/image-gallery.md) | Medium | Large | context-menu | 5–8 d |
| 86 | 3 | [Chart](../component-backlog/chart.md) | Medium | Very Large | — | 10–20 d |
| 87 | 3 | [Breadcrumb](../component-backlog/breadcrumb.md) | Low | Small | — | 0.5–1 d |
| 88 | 3 | [Tooltip](../component-backlog/tooltip.md) | Low | Small | popover, R-overlay-core | 0.5–1 d |
| 89 | 3 | [AppBreadcrumbs](../component-backlog/app-breadcrumbs.md) | Low | Small | breadcrumb, dropdown-menu, tooltip, R-button | 0.5–1 d |
| 90 | 3 | [AppFooter](../component-backlog/app-footer.md) | Low | Small | R-badge | 0.5–1 d |
| 91 | 3 | [NavDrawer](../component-backlog/nav-drawer.md) | Low | Small | drawer | 0.5–1 d |
| 92 | 3 | [AppNav](../component-backlog/app-nav.md) | Low | Small | nav-drawer, R-button | 0.5–1 d |
| 93 | 3 | [NotFoundPage](../component-backlog/common-not-found-page.md) | Low | Small | — | 0.5–1 d |
| 94 | 3 | [ContentScoreBar](../component-backlog/content-score-bar.md) | Low | Small | — | 0.5–1 d |
| 95 | 3 | [MaintenancePage](../component-backlog/maintenance-page.md) | Low | Small | R-badge | 0.5–1 d |
| 96 | 3 | [ScrollArea](../component-backlog/scroll-area.md) | Low | Small | — | 0.5–1 d |
| 97 | 3 | [useA11yCheck](../component-backlog/use-a11y-check.md) | Low | Small | — | 0.5–1 d |
| 98 | 3 | [useFocusTrap](../component-backlog/use-focus-trap.md) | Low | Small | — | 0.5–1 d |
| 99 | 3 | [ViewToggle](../component-backlog/view-toggle.md) | Low | Small | — | 0.5–1 d |
| 100 | 3 | [BulkActionTable](../component-backlog/bulk-action-table.md) | Low | Medium | table | 2–3 d |
| 101 | 3 | [CommentThread](../component-backlog/comment-thread.md) | Low | Medium | R-avatar, R-button | 2–3 d |
| 102 | 3 | [MentionPicker](../component-backlog/mention-picker.md) | Low | Medium | R-avatar, popover | 2–3 d |
| 103 | 3 | [DataTable](../component-backlog/data-table.md) | Low | Large | pagination, table, search-bar | 5–8 d |
| 104 | 3 | [ServerDataTable](../component-backlog/server-data-table.md) | Low | Medium | data-table, pagination, search-bar, R-spinner | 2–3 d |
| 105 | 3 | [ShareDialog](../component-backlog/share-dialog.md) | Low | Medium | R-avatar, R-button, R-modal, R-overlay-core | 2–3 d |
| 106 | 3 | [AppCommandBar](../component-backlog/app-command-bar.md) | Low | Large | alert-banner, R-badge, R-button, R-empty-state, R-modal | 5–8 d |
| 107 | 3 | [ColorPicker](../component-backlog/color-picker.md) | Low | Large | — | 5–8 d |
| 108 | 3 | [DiffViewer](../component-backlog/diff-viewer.md) | Low | Large | — | 5–8 d |
| 109 | 3 | [TreeView](../component-backlog/tree-view.md) | Low | Large | — | 5–8 d |
| 110 | 3 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Low | Very Large | data-table, pagination, search-bar, R-spinner, dropdown-menu | 10–20 d |
| 111 | 3 | [CodeEditor](../component-backlog/code-editor.md) | Low | Very Large | — | 10–20 d |
| 112 | 3 | [FormBuilder](../component-backlog/form-builder.md) | Low | Very Large | — | 10–20 d |
| 113 | 3 | [Gantt](../component-backlog/gantt.md) | Low | Very Large | — | 10–20 d |
| 114 | 3 | [KanbanBoard](../component-backlog/kanban-board.md) | Low | Very Large | R-card | 10–20 d |
| 115 | 3 | [MapView](../component-backlog/map-view.md) | Low | Very Large | R-button, R-card | 10–20 d |
| 116 | 3 | [RichTextEditor](../component-backlog/rich-text-editor.md) | Low | Very Large | color-picker, R-button, R-input, R-modal | 10–20 d |
| 117 | 3 | [VideoPlayer](../component-backlog/video-player.md) | Low | Very Large | — | 10–20 d |

After #117: domain verticals per [wave-3-advanced.md](wave-3-advanced.md).
