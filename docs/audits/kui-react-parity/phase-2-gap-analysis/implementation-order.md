# Implementation order (dependency-driven)

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Topologically sorted by wave → priority → dependency. Domain components follow once their primitives exist and are not listed individually.

| # | Item | Kind | Priority | Complexity | Wave | Blocked by |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | R-infra-test: Test harness: Jest + @testing-library/react-native + CI | remediation | Critical | Medium | W1 | — |
| 2 | R-infra-package: Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | remediation | Critical | Large | W1 | — |
| 3 | R-infra-lint: ESLint (expo + a11y), token/raw-hex audit, convention rules | remediation | High | Small | W1 | — |
| 4 | [AlertBanner](../component-backlog/alert-banner.md) | new component | Critical | Small | W1 | — |
| 5 | [Label](../component-backlog/label.md) | new component | Critical | Small | W1 | — |
| 6 | R-button: Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) | remediation | Critical | Small | W1 | — |
| 7 | R-field-shell: Extract FieldShell (Label, hint, error, success, count) shared by all form controls | remediation | Critical | Small | W1 | label |
| 8 | R-theme-provider: Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | remediation | Critical | Small | W1 | R-infra-package |
| 9 | R-typography: Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage | remediation | Critical | Small | W1 | — |
| 10 | [RadioGroup](../component-backlog/radio-group.md) | new component | Critical | Small | W1 | R-field-shell |
| 11 | [Separator](../component-backlog/separator.md) | new component | Critical | Small | W1 | — |
| 12 | [TabGroup](../component-backlog/tab-group.md) | new component | Critical | Small | W1 | — |
| 13 | [Textarea](../component-backlog/textarea.md) | new component | Critical | Small | W1 | R-field-shell |
| 14 | R-overlay-core: Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` | remediation | Critical | Medium | W1 | — |
| 15 | [Drawer](../component-backlog/drawer.md) | new component | Critical | Medium | W1 | R-overlay-core |
| 16 | [Progress](../component-backlog/progress.md) | new component | Critical | Medium | W1 | — |
| 17 | R-input: Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) | remediation | Critical | Medium | W1 | R-field-shell |
| 18 | R-modal: Modal rewrite (see rewrite-candidates.md) | remediation | Critical | Medium | W1 | R-overlay-core |
| 19 | [Select](../component-backlog/select.md) | new component | Critical | Medium | W1 | R-overlay-core, R-field-shell |
| 20 | [Toast](../component-backlog/toast.md) | new component | Critical | Medium | W1 | — |
| 21 | [FocusTrap](../component-backlog/accessibility-kit.md) | new component | High | Small | W1 | R-overlay-core |
| 22 | R-empty-state: EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | remediation | Medium | Small | W1 (pulled forward) | — |
| 23 | [ErrorState](../component-backlog/error-state.md) | new component | High | Small | W1 | alert-banner, R-button, R-empty-state |
| 24 | R-spinner: Spinner parity (xs–xl, two-tone ring, md ≠ sm) | remediation | Medium | Small | W1 (pulled forward) | — |
| 25 | [LoadingState](../component-backlog/loading-state.md) | new component | High | Small | W1 | R-spinner |
| 26 | [NotificationProvider](../component-backlog/notification-system.md) | new component | High | Small | W1 | toast |
| 27 | R-fa-version: Align Font Awesome to v7 (KuiReact peer range `>=7`) | remediation | High | Small | W1 | — |
| 28 | [useBreakpoint](../component-backlog/use-breakpoint.md) | new component | High | Small | W1 | — |
| 29 | R-infra-parity: Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | remediation | High | Medium | W2 | R-infra-test |
| 30 | [Accordion](../component-backlog/accordion.md) | new component | High | Small | W2 | — |
| 31 | [ButtonGroup](../component-backlog/button-group.md) | new component | High | Small | W2 | — |
| 32 | [CheckboxGroup](../component-backlog/checkbox-group.md) | new component | High | Small | W2 | R-field-shell |
| 33 | [Form](../component-backlog/form.md) | new component | High | Small | W2 | alert-banner |
| 34 | [FormField](../component-backlog/form-field.md) | new component | High | Small | W2 | — |
| 35 | [InlineAlert](../component-backlog/inline-alert.md) | new component | High | Small | W2 | — |
| 36 | [PageHeader](../component-backlog/page-header.md) | new component | High | Small | W2 | — |
| 37 | R-avatar: Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | remediation | High | Small | W2 | — |
| 38 | R-badge: Badge parity (children, `neutral`, sizes, dot, dismissible) | remediation | High | Small | W2 | — |
| 39 | R-shadow: Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | remediation | Medium | Small | W2 | — |
| 40 | R-card: Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | remediation | High | Small | W2 | R-shadow |
| 41 | R-checkbox: Checkbox parity (hint, error, uncontrolled `defaultChecked`) | remediation | High | Small | W2 | R-field-shell |
| 42 | R-skeleton: Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | remediation | High | Small | W2 | — |
| 43 | R-toggle: Switch → Toggle parity (name, checked/onChange, description, size, label press) | remediation | High | Small | W2 | — |
| 44 | [SearchBar](../component-backlog/search-bar.md) | new component | High | Small | W2 | R-field-shell |
| 45 | [SectionCard](../component-backlog/section-card.md) | new component | High | Small | W2 | — |
| 46 | [Stepper](../component-backlog/stepper.md) | new component | High | Small | W2 | — |
| 47 | [Popover](../component-backlog/popover.md) | new component | Medium | Medium | W2 | R-overlay-core |
| 48 | [DropdownMenu](../component-backlog/dropdown-menu.md) | new component | High | Medium | W2 | R-overlay-core, popover, drawer |
| 49 | [ThemeSwitcher](../component-backlog/theme-switcher.md) | new component | High | Small | W2 | dropdown-menu, R-button, R-theme-provider |
| 50 | [MultiSelect](../component-backlog/multi-select.md) | new component | High | Medium | W2 | R-overlay-core, R-field-shell |
| 51 | [RangeSlider](../component-backlog/range-slider.md) | new component | High | Medium | W2 | — |
| 52 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | new component | Low | Small | W2 (pulled forward) | — |
| 53 | [Calendar](../component-backlog/calendar.md) | new component | Low | Very Large | W2 (pulled forward) | event-card, skip-link |
| 54 | [DatePicker](../component-backlog/date-picker.md) | new component | High | Large | W2 | calendar, R-overlay-core, R-field-shell |
| 55 | [AppDrawer](../component-backlog/app-drawer.md) | new component | Medium | Small | W2 | drawer, search-bar, R-badge, R-button |
| 56 | [AppTopBar](../component-backlog/app-top-bar.md) | new component | Medium | Small | W2 | — |
| 57 | [BrandLogo](../component-backlog/brand-logo.md) | new component | Medium | Small | W2 | — |
| 58 | [DetailHeader](../component-backlog/detail-header.md) | new component | Medium | Small | W2 | R-badge, page-header, tab-group |
| 59 | [NoAccessState](../component-backlog/no-access-state.md) | new component | Medium | Small | W2 | alert-banner, R-button, R-empty-state |
| 60 | [NotFoundState](../component-backlog/not-found-state.md) | new component | Medium | Small | W2 | alert-banner, R-button, R-empty-state |
| 61 | [Pagination](../component-backlog/pagination.md) | new component | Medium | Small | W2 | — |
| 62 | [Popconfirm](../component-backlog/popconfirm.md) | new component | Medium | Small | W2 | R-overlay-core, R-button, popover |
| 63 | [SplashScreen](../component-backlog/splash-screen.md) | new component | Medium | Small | W2 | R-spinner |
| 64 | [StarRating](../component-backlog/star-rating.md) | new component | Medium | Small | W2 | — |
| 65 | [StatCard](../component-backlog/stat-card.md) | new component | Medium | Small | W2 | — |
| 66 | [Statistic](../component-backlog/statistic.md) | new component | Medium | Small | W2 | — |
| 67 | [StepShell](../component-backlog/step-shell.md) | new component | Medium | Small | W2 | R-button |
| 68 | [TabButton](../component-backlog/tab-button.md) | new component | Medium | Small | W2 | — |
| 69 | [Timeline](../component-backlog/timeline.md) | new component | Medium | Small | W2 | — |
| 70 | [AppShell](../component-backlog/app-shell.md) | new component | Medium | Medium | W2 | drawer |
| 71 | [AppSidebar](../component-backlog/app-sidebar.md) | new component | Medium | Medium | W2 | R-badge |
| 72 | [FileInput](../component-backlog/file-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 73 | [DateRangePicker](../component-backlog/date-range-picker.md) | new component | Medium | Large | W2 | calendar, date-picker, R-overlay-core, R-field-shell |
| 74 | [TagInput](../component-backlog/tag-input.md) | new component | Medium | Medium | W2 | R-field-shell |
| 75 | [FilterBar](../component-backlog/filter-bar.md) | new component | Medium | Medium | W2 | date-range-picker, multi-select, select, tag-input, R-button, date-picker |
| 76 | [GlobalSearch](../component-backlog/global-search.md) | new component | Medium | Medium | W2 | search-bar |
| 77 | [OnboardingWizard](../component-backlog/onboarding-wizard.md) | new component | Medium | Medium | W2 | R-button, R-modal, stepper |
| 78 | [Slider](../component-backlog/slider.md) | new component | Medium | Medium | W2 | — |
| 79 | [StepFlow](../component-backlog/step-flow.md) | new component | Medium | Medium | W2 | alert-banner, stepper, R-button, step-shell |
| 80 | [Table](../component-backlog/table.md) | new component | Medium | Medium | W2 | — |
| 81 | [TimePicker](../component-backlog/time-picker.md) | new component | Medium | Medium | W2 | R-overlay-core, R-field-shell |
| 82 | [ComboBox](../component-backlog/combo-box.md) | new component | Medium | Large | W2 | R-overlay-core, R-field-shell |
| 83 | [FileUploadSection](../component-backlog/file-upload-section.md) | new component | Medium | Large | W3 | file-input, progress |
| 84 | [ContextMenu](../component-backlog/context-menu.md) | new component | Low | Medium | W3 | dropdown-menu, R-overlay-core |
| 85 | [ImageGallery](../component-backlog/image-gallery.md) | new component | Medium | Large | W3 | context-menu |
| 86 | [Chart](../component-backlog/chart.md) | new component | Medium | Very Large | W3 | — |
| 87 | [Breadcrumb](../component-backlog/breadcrumb.md) | new component | Low | Small | W3 | — |
| 88 | [Tooltip](../component-backlog/tooltip.md) | new component | Low | Small | W3 | popover, R-overlay-core |
| 89 | [AppBreadcrumbs](../component-backlog/app-breadcrumbs.md) | new component | Low | Small | W3 | breadcrumb, dropdown-menu, tooltip, R-button |
| 90 | [AppFooter](../component-backlog/app-footer.md) | new component | Low | Small | W3 | R-badge |
| 91 | [NavDrawer](../component-backlog/nav-drawer.md) | new component | Low | Small | W3 | drawer |
| 92 | [AppNav](../component-backlog/app-nav.md) | new component | Low | Small | W3 | nav-drawer, R-button |
| 93 | [NotFoundPage](../component-backlog/common-not-found-page.md) | new component | Low | Small | W3 | — |
| 94 | [ContentScoreBar](../component-backlog/content-score-bar.md) | new component | Low | Small | W3 | — |
| 95 | [MaintenancePage](../component-backlog/maintenance-page.md) | new component | Low | Small | W3 | R-badge |
| 96 | [ScrollArea](../component-backlog/scroll-area.md) | new component | Low | Small | W3 | — |
| 97 | [useA11yCheck](../component-backlog/use-a11y-check.md) | new component | Low | Small | W3 | — |
| 98 | [useFocusTrap](../component-backlog/use-focus-trap.md) | new component | Low | Small | W3 | — |
| 99 | [ViewToggle](../component-backlog/view-toggle.md) | new component | Low | Small | W3 | — |
| 100 | [BulkActionTable](../component-backlog/bulk-action-table.md) | new component | Low | Medium | W3 | table |
| 101 | [CommentThread](../component-backlog/comment-thread.md) | new component | Low | Medium | W3 | R-avatar, R-button |
| 102 | [MentionPicker](../component-backlog/mention-picker.md) | new component | Low | Medium | W3 | R-avatar, popover |
| 103 | [DataTable](../component-backlog/data-table.md) | new component | Low | Large | W3 | pagination, table, search-bar |
| 104 | [ServerDataTable](../component-backlog/server-data-table.md) | new component | Low | Medium | W3 | data-table, pagination, search-bar, R-spinner |
| 105 | [ShareDialog](../component-backlog/share-dialog.md) | new component | Low | Medium | W3 | R-avatar, R-button, R-modal, R-overlay-core |
| 106 | [AppCommandBar](../component-backlog/app-command-bar.md) | new component | Low | Large | W3 | alert-banner, R-badge, R-button, R-empty-state, R-modal |
| 107 | [ColorPicker](../component-backlog/color-picker.md) | new component | Low | Large | W3 | — |
| 108 | [DiffViewer](../component-backlog/diff-viewer.md) | new component | Low | Large | W3 | — |
| 109 | [TreeView](../component-backlog/tree-view.md) | new component | Low | Large | W3 | — |
| 110 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | new component | Low | Very Large | W3 | data-table, pagination, search-bar, R-spinner, dropdown-menu |
| 111 | [CodeEditor](../component-backlog/code-editor.md) | new component | Low | Very Large | W3 | — |
| 112 | [FormBuilder](../component-backlog/form-builder.md) | new component | Low | Very Large | W3 | — |
| 113 | [Gantt](../component-backlog/gantt.md) | new component | Low | Very Large | W3 | — |
| 114 | [KanbanBoard](../component-backlog/kanban-board.md) | new component | Low | Very Large | W3 | R-card |
| 115 | [MapView](../component-backlog/map-view.md) | new component | Low | Very Large | W3 | R-button, R-card |
| 116 | [RichTextEditor](../component-backlog/rich-text-editor.md) | new component | Low | Very Large | W3 | color-picker, R-button, R-input, R-modal |
| 117 | [VideoPlayer](../component-backlog/video-player.md) | new component | Low | Very Large | W3 | — |