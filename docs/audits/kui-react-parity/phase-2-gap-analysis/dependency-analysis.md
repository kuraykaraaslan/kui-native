# Dependency analysis

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> First-party dependency edges parsed from KuiReact `import` statements; RN-specific dependencies added from the curated porting notes.

## Fan-in: which KuiReact primitives unblock the most other components

Counts are KuiReact components whose source imports the primitive. A missing primitive with high fan-in blocks every dependant.

| Primitive | Depended on by (total) | core | domain | KuiNative |
| --- | --- | --- | --- | --- |
| Badge | 68 | 6 | 62 | exists as `Badge` |
| Button | 60 | 17 | 43 | exists as `Button` |
| Avatar | 25 | 3 | 22 | exists as `Avatar` + `AvatarGroup` |
| Input | 14 | 1 | 13 | exists as `TextInput` |
| Form | 10 | 0 | 10 | missing |
| useFocusTrap | 6 | 6 | 0 | missing |
| AlertBanner | 6 | 6 | 0 | missing |
| DropdownMenu | 6 | 2 | 4 | missing |
| EmptyState | 5 | 4 | 1 | exists as `EmptyState` |
| Modal | 5 | 4 | 1 | exists as `Modal` |
| Textarea | 5 | 0 | 5 | missing |
| SearchBar | 4 | 4 | 0 | missing |
| Spinner | 4 | 4 | 0 | exists as `Spinner` |
| Pagination | 3 | 3 | 0 | missing |
| Drawer | 3 | 3 | 0 | missing |
| Select | 3 | 1 | 2 | missing |
| TagInput | 3 | 1 | 2 | missing |
| Card | 3 | 2 | 1 | exists as `Card` |
| StarRating | 3 | 0 | 3 | missing |
| Calendar | 2 | 2 | 0 | missing |
| DataTable | 2 | 2 | 0 | missing |
| Tooltip | 2 | 1 | 1 | missing |
| TabGroup | 2 | 0 | 2 | missing |
| Table | 1 | 1 | 0 | missing |
| ContextMenu | 1 | 1 | 0 | missing |
| NavDrawer | 1 | 1 | 0 | missing |
| DateRangePicker | 1 | 1 | 0 | missing |
| MultiSelect | 1 | 1 | 0 | missing |
| Breadcrumb | 1 | 1 | 0 | missing |
| ColorPicker | 1 | 1 | 0 | missing |
| SkipLink + LiveRegion | 1 | 1 | 0 | missing |
| ThemeSwitcher | 1 | 0 | 1 | missing |
| Toggle | 1 | 0 | 1 | exists as `Switch` |
| RadioGroup | 1 | 0 | 1 | missing |
| BrandLogo | 1 | 0 | 1 | missing |
| ButtonGroup | 1 | 0 | 1 | missing |
| StatCard | 1 | 0 | 1 | missing |
| CodeEditor | 1 | 0 | 1 | missing |
| Stepper | 1 | 1 | 0 | missing |

## Shared-but-incomplete primitives are dependency roots too

Components that exist in KuiNative but lack parity still block ports: a domain component written against KuiReact's `<Badge variant="neutral" dot>` or `<Button variant="danger" iconRight>` cannot be ported mechanically until the shared component's API matches. Fan-in of shared ids: Button 60, Card 3, Avatar 25, Badge 68, Input 14, Checkbox 0, Toggle 1, Spinner 4, EmptyState 5, Skeleton 0, Modal 5.

## Core missing components — dependencies

"Blocked by" lists items that must land first (missing components, shared-component remediation `R-*`, and shared infrastructure). "Unblocks" is the inverse.

| Component | Priority | KuiReact composes | Blocked by | Unblocks | RN libraries |
| --- | --- | --- | --- | --- | --- |
| [AlertBanner](../component-backlog/alert-banner.md) | Critical | — | — | app-command-bar, form, error-state, not-found-state, step-flow, no-access-state | — |
| [Drawer](../component-backlog/drawer.md) | Critical | useFocusTrap | R-overlay-core | dropdown-menu, app-shell, nav-drawer, app-drawer | react-native-reanimated, react-native-gesture-handler |
| [Label](../component-backlog/label.md) | Critical | — | — | R-field-shell | — |
| [Progress](../component-backlog/progress.md) | Critical | — | — | file-upload-section | react-native-svg, react-native-reanimated |
| [RadioGroup](../component-backlog/radio-group.md) | Critical | — | R-field-shell | — | — |
| [Select](../component-backlog/select.md) | Critical | — | R-overlay-core, R-field-shell | filter-bar | @gorhom/bottom-sheet (or in-house Sheet) |
| [Separator](../component-backlog/separator.md) | Critical | — | — | — | — |
| [TabGroup](../component-backlog/tab-group.md) | Critical | — | — | detail-header | — |
| [Textarea](../component-backlog/textarea.md) | Critical | — | R-field-shell | — | — |
| [Toast](../component-backlog/toast.md) | Critical | — | — | notification-system | zustand, react-native-reanimated, react-native-safe-area-context |
| [Accordion](../component-backlog/accordion.md) | High | — | — | — | — |
| [ButtonGroup](../component-backlog/button-group.md) | High | — | — | — | — |
| [CheckboxGroup](../component-backlog/checkbox-group.md) | High | — | R-field-shell | — | — |
| [DatePicker](../component-backlog/date-picker.md) | High | Calendar | calendar, R-overlay-core, R-field-shell | date-range-picker, filter-bar | @react-native-community/datetimepicker |
| [DropdownMenu](../component-backlog/dropdown-menu.md) | High | useFocusTrap | R-overlay-core, popover, drawer | advanced-data-table, app-breadcrumbs, theme-switcher, context-menu | — |
| [ErrorState](../component-backlog/error-state.md) | High | AlertBanner, Button ✓, EmptyState ✓ | alert-banner, R-button, R-empty-state | — | — |
| [FocusTrap](../component-backlog/accessibility-kit.md) | High | useFocusTrap | R-overlay-core | — | — |
| [Form](../component-backlog/form.md) | High | AlertBanner | alert-banner | — | — |
| [FormField](../component-backlog/form-field.md) | High | — | — | — | react-hook-form |
| [InlineAlert](../component-backlog/inline-alert.md) | High | — | — | — | — |
| [LoadingState](../component-backlog/loading-state.md) | High | Spinner ✓ | R-spinner | — | — |
| [MultiSelect](../component-backlog/multi-select.md) | High | — | R-overlay-core, R-field-shell | filter-bar | bottom sheet |
| [NotificationProvider](../component-backlog/notification-system.md) | High | — | toast | — | — |
| [PageHeader](../component-backlog/page-header.md) | High | — | — | detail-header | — |
| [RangeSlider](../component-backlog/range-slider.md) | High | — | — | — | react-native-gesture-handler, react-native-reanimated |
| [SearchBar](../component-backlog/search-bar.md) | High | — | R-field-shell | data-table, advanced-data-table, global-search, server-data-table, app-drawer | — |
| [SectionCard](../component-backlog/section-card.md) | High | — | — | — | — |
| [Stepper](../component-backlog/stepper.md) | High | — | — | onboarding-wizard, step-flow | — |
| [ThemeSwitcher](../component-backlog/theme-switcher.md) | High | Button ✓, DropdownMenu | dropdown-menu, R-button, R-theme-provider | — | — |
| [useBreakpoint](../component-backlog/use-breakpoint.md) | High | — | — | — | — |
| [AppDrawer](../component-backlog/app-drawer.md) | Medium | Badge ✓, Button ✓, Drawer, SearchBar | drawer, search-bar, R-badge, R-button | — | — |
| [AppShell](../component-backlog/app-shell.md) | Medium | Drawer | drawer | — | expo-router, @react-navigation/drawer |
| [AppSidebar](../component-backlog/app-sidebar.md) | Medium | Badge ✓ | R-badge | — | expo-router |
| [AppTopBar](../component-backlog/app-top-bar.md) | Medium | — | — | — | — |
| [BrandLogo](../component-backlog/brand-logo.md) | Medium | — | — | — | expo-image |
| [Chart](../component-backlog/chart.md) | Medium | — | — | — | victory-native or react-native-gifted-charts |
| [ComboBox](../component-backlog/combo-box.md) | Medium | — | R-overlay-core, R-field-shell | — | bottom sheet |
| [DateRangePicker](../component-backlog/date-range-picker.md) | Medium | Calendar | calendar, date-picker, R-overlay-core, R-field-shell | filter-bar | — |
| [DetailHeader](../component-backlog/detail-header.md) | Medium | Badge ✓ | R-badge, page-header, tab-group | — | — |
| [FileInput](../component-backlog/file-input.md) | Medium | — | R-field-shell | file-upload-section | expo-document-picker, expo-image-picker |
| [FileUploadSection](../component-backlog/file-upload-section.md) | Medium | — | file-input, progress | — | — |
| [FilterBar](../component-backlog/filter-bar.md) | Medium | Button ✓, DateRangePicker, MultiSelect, Select, TagInput | date-range-picker, multi-select, select, tag-input, R-button, date-picker | — | — |
| [GlobalSearch](../component-backlog/global-search.md) | Medium | SearchBar | search-bar | — | — |
| [ImageGallery](../component-backlog/image-gallery.md) | Medium | ContextMenu | context-menu | — | expo-image, react-native-gesture-handler |
| [NoAccessState](../component-backlog/no-access-state.md) | Medium | AlertBanner, Button ✓, EmptyState ✓ | alert-banner, R-button, R-empty-state | — | — |
| [NotFoundState](../component-backlog/not-found-state.md) | Medium | AlertBanner, Button ✓, EmptyState ✓ | alert-banner, R-button, R-empty-state | — | — |
| [OnboardingWizard](../component-backlog/onboarding-wizard.md) | Medium | Button ✓, Modal ✓ | R-button, R-modal, stepper | — | — |
| [Pagination](../component-backlog/pagination.md) | Medium | — | — | data-table, advanced-data-table, server-data-table | — |
| [Popconfirm](../component-backlog/popconfirm.md) | Medium | Button ✓, useFocusTrap | R-overlay-core, R-button, popover | — | — |
| [Popover](../component-backlog/popover.md) | Medium | useFocusTrap | R-overlay-core | popconfirm, tooltip, dropdown-menu, mention-picker | — |
| [Slider](../component-backlog/slider.md) | Medium | — | — | — | react-native-reanimated |
| [SplashScreen](../component-backlog/splash-screen.md) | Medium | Spinner ✓ | R-spinner | — | expo-splash-screen |
| [StarRating](../component-backlog/star-rating.md) | Medium | — | — | — | — |
| [StatCard](../component-backlog/stat-card.md) | Medium | — | — | — | — |
| [Statistic](../component-backlog/statistic.md) | Medium | — | — | — | — |
| [StepFlow](../component-backlog/step-flow.md) | Medium | AlertBanner, Button ✓, Stepper | alert-banner, stepper, R-button, step-shell | — | — |
| [StepShell](../component-backlog/step-shell.md) | Medium | Button ✓ | R-button | step-flow | — |
| [TabButton](../component-backlog/tab-button.md) | Medium | — | — | — | — |
| [Table](../component-backlog/table.md) | Medium | — | — | data-table, bulk-action-table | — |
| [TagInput](../component-backlog/tag-input.md) | Medium | — | R-field-shell | filter-bar | — |
| [Timeline](../component-backlog/timeline.md) | Medium | — | — | — | — |
| [TimePicker](../component-backlog/time-picker.md) | Medium | — | R-overlay-core, R-field-shell | — | @react-native-community/datetimepicker |
| [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Low | DataTable, Pagination, SearchBar, Spinner ✓ | data-table, pagination, search-bar, R-spinner, dropdown-menu | — | — |
| [AppBreadcrumbs](../component-backlog/app-breadcrumbs.md) | Low | Breadcrumb, Button ✓, DropdownMenu, Tooltip | breadcrumb, dropdown-menu, tooltip, R-button | — | — |
| [AppCommandBar](../component-backlog/app-command-bar.md) | Low | AlertBanner, Badge ✓, Button ✓, EmptyState ✓, Modal ✓ | alert-banner, R-badge, R-button, R-empty-state, R-modal | — | — |
| [AppFooter](../component-backlog/app-footer.md) | Low | Badge ✓ | R-badge | — | — |
| [AppNav](../component-backlog/app-nav.md) | Low | Button ✓, NavDrawer | nav-drawer, R-button | — | expo-router |
| [Breadcrumb](../component-backlog/breadcrumb.md) | Low | — | — | app-breadcrumbs | — |
| [BulkActionTable](../component-backlog/bulk-action-table.md) | Low | Table | table | — | — |
| [Calendar](../component-backlog/calendar.md) | Low | EventCard, SkipLink + LiveRegion | event-card, skip-link | date-picker, date-range-picker | — |
| [CodeEditor](../component-backlog/code-editor.md) | Low | — | — | — | — |
| [ColorPicker](../component-backlog/color-picker.md) | Low | — | — | rich-text-editor | react-native-gesture-handler, react-native-svg |
| [CommentThread](../component-backlog/comment-thread.md) | Low | Avatar ✓, Button ✓ | R-avatar, R-button | — | — |
| [ContentScoreBar](../component-backlog/content-score-bar.md) | Low | — | — | — | — |
| [ContextMenu](../component-backlog/context-menu.md) | Low | — | dropdown-menu, R-overlay-core | image-gallery | — |
| [DataTable](../component-backlog/data-table.md) | Low | Pagination | pagination, table, search-bar | advanced-data-table, server-data-table | — |
| [DiffViewer](../component-backlog/diff-viewer.md) | Low | — | — | — | — |
| [FormBuilder](../component-backlog/form-builder.md) | Low | — | — | — | — |
| [Gantt](../component-backlog/gantt.md) | Low | — | — | — | — |
| [KanbanBoard](../component-backlog/kanban-board.md) | Low | Card ✓ | R-card | — | react-native-draggable-flatlist |
| [MaintenancePage](../component-backlog/maintenance-page.md) | Low | Badge ✓ | R-badge | — | — |
| [MapView](../component-backlog/map-view.md) | Low | Button ✓, Card ✓ | R-button, R-card | — | react-native-maps |
| [MentionPicker](../component-backlog/mention-picker.md) | Low | Avatar ✓ | R-avatar, popover | — | — |
| [NavDrawer](../component-backlog/nav-drawer.md) | Low | Drawer | drawer | app-nav | — |
| [NotFoundPage](../component-backlog/common-not-found-page.md) | Low | — | — | — | — |
| [RichTextEditor](../component-backlog/rich-text-editor.md) | Low | Button ✓, ColorPicker, Input ✓, Modal ✓ | color-picker, R-button, R-input, R-modal | — | WebView-based editor |
| [ScrollArea](../component-backlog/scroll-area.md) | Low | — | — | — | — |
| [ServerDataTable](../component-backlog/server-data-table.md) | Low | DataTable, Pagination, SearchBar, Spinner ✓ | data-table, pagination, search-bar, R-spinner | — | — |
| [ShareDialog](../component-backlog/share-dialog.md) | Low | Avatar ✓, Button ✓, Modal ✓ | R-avatar, R-button, R-modal, R-overlay-core | — | — |
| [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | — | — | calendar | — |
| [Tooltip](../component-backlog/tooltip.md) | Low | — | popover, R-overlay-core | app-breadcrumbs | — |
| [TreeView](../component-backlog/tree-view.md) | Low | — | — | — | — |
| [useA11yCheck](../component-backlog/use-a11y-check.md) | Low | — | — | — | — |
| [useFocusTrap](../component-backlog/use-focus-trap.md) | Low | — | — | — | — |
| [VideoPlayer](../component-backlog/video-player.md) | Low | — | — | — | expo-video |
| [ViewToggle](../component-backlog/view-toggle.md) | Low | — | — | — | — |

## Remediation items referenced above

| id | Item | Priority | Blocked by |
| --- | --- | --- | --- |
| R-infra-test | Test harness: Jest + @testing-library/react-native + CI | Critical | — |
| R-infra-package | Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | Critical | — |
| R-theme-provider | Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | Critical | R-infra-package |
| R-typography | Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage | Critical | — |
| R-overlay-core | Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` | Critical | — |
| R-modal | Modal rewrite (see rewrite-candidates.md) | Critical | R-overlay-core |
| R-field-shell | Extract FieldShell (Label, hint, error, success, count) shared by all form controls | Critical | label |
| R-input | Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) | Critical | R-field-shell |
| R-button | Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) | Critical | — |
| R-badge | Badge parity (children, `neutral`, sizes, dot, dismissible) | High | — |
| R-card | Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) | High | R-shadow |
| R-avatar | Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite | High | — |
| R-checkbox | Checkbox parity (hint, error, uncontrolled `defaultChecked`) | High | R-field-shell |
| R-toggle | Switch → Toggle parity (name, checked/onChange, description, size, label press) | High | — |
| R-skeleton | Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion | High | — |
| R-spinner | Spinner parity (xs–xl, two-tone ring, md ≠ sm) | Medium | — |
| R-empty-state | EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | Medium | — |
| R-shadow | Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) | Medium | — |
| R-fa-version | Align Font Awesome to v7 (KuiReact peer range `>=7`) | High | — |
| R-infra-lint | ESLint (expo + a11y), token/raw-hex audit, convention rules | High | — |
| R-infra-parity | Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | R-infra-test |

## Third-party dependencies KuiReact relies on and their RN story

| Package | Used by (count) | Examples | RN strategy |
| --- | --- | --- | --- |
| @fortawesome/react-fontawesome | 189 | Badge, StarRating, Statistic, Input, SearchBar | @fortawesome/react-native-fontawesome (already used) |
| @fortawesome/free-solid-svg-icons | 186 | Badge, StarRating, Statistic, Input, SearchBar | same package (align to v7) |
| @fortawesome/fontawesome-svg-core | 19 | Statistic, ColorPicker, Calendar, FormBuilder, FeatureCard | same package (align to v7) |
| @fortawesome/free-brands-svg-icons | 16 | VideoPlayer, OAuthButtons, PaymentMethodSelector, AuthorBio… | same package |
| react-dom | 7 | Modal, Drawer, Calendar, Gantt, CurrencySelector | no DOM portals — root host or RN Modal |
| @fortawesome/free-regular-svg-icons | 4 | StarRating, ProductCard, HotelCard, PostCard | same package |
| zustand | 4 | Toast, RichTextEditor, Calendar, Gantt | unchanged |
| chart.js | 4 | Charts, AssetAllocationCard, WatchTimeChart, TelemetryTimeS… | victory-native / gifted-charts |
| react-chartjs-2 | 4 | Charts, AssetAllocationCard, WatchTimeChart, TelemetryTimeS… | victory-native / gifted-charts |
| country-flag-icons/react/3x2 | 3 | LanguageSwitcher, CurrencySelector, CountrySelector | evaluate |
| countries-list | 3 | LocationPicker, CurrencySelector, CountrySelector | unchanged |
| next/link | 1 | NotFoundPage | expo-router Link |
| leaflet | 1 | MapView | react-native-maps |
| react-leaflet | 1 | MapView | react-native-maps |
| }               <span className= | 1 | ActivityFeedRow | evaluate |
| next/dynamic | 1 | KUIViewer | not needed |
| @kuraykaraaslan/kui-viewer | 1 | KUIViewer | evaluate |
| react-hook-form | 1 | FormField | unchanged (Controller) |