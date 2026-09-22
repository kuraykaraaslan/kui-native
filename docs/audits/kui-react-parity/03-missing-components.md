# 03 · Missing components

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

**313** KuiReact components have no KuiNative counterpart: **96 core** (ui/app/hooks) and **217 domain**. Every one has a backlog file under [component-backlog/](component-backlog/README.md).

Details: [missing-components.md](phase-2-gap-analysis/missing-components.md) · [priority-matrix.md](phase-2-gap-analysis/priority-matrix.md) · [dependency-analysis.md](phase-2-gap-analysis/dependency-analysis.md) · [implementation-order.md](phase-2-gap-analysis/implementation-order.md)

## Counts

| Priority | Core | Domain | Total |
| --- | --- | --- | --- |
| Critical | 10 | 0 | 10 |
| High | 20 | 4 | 24 |
| Medium | 32 | 38 | 70 |
| Low | 34 | 175 | 209 |
| **Total** | **96** | **217** | **313** |

| Fit | Count |
| --- | --- |
| direct port | 40 |
| platform adaptation | 266 |
| recommended exception (web-only) | 7 |

## Critical (10)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [Label](component-backlog/label.md) | Typography | Critical | Small | Every KuiReact form control renders its label with the same required-marker + disabled treatment; KuiNative duplicates ad-hoc label Text in TextInput/Checkbox/Switch. |
| [Separator](component-backlog/separator.md) | Layout | Critical | Small | Trivial primitive used by DropdownMenu, Card sections, lists and settings screens; its absence forces raw `View` borders everywhere. |
| [Progress](component-backlog/progress.md) | Feedback | Critical | Medium | Determinate progress (bar + circle) is a baseline feedback primitive for uploads, onboarding and quotas. |
| [Textarea](component-backlog/textarea.md) | Forms | Critical | Small | Multi-line text entry is a baseline form control; KuiReact has a dedicated component with label/hint/error/count. |
| [RadioGroup](component-backlog/radio-group.md) | Forms | Critical | Small | Mutually-exclusive choice control; core form primitive. |
| [Select](component-backlog/select.md) | Forms | Critical | Medium | Single-select is the most common form control after Input; forms cannot be built without it. |
| [AlertBanner](component-backlog/alert-banner.md) | Feedback | Critical | Small | Inline semantic alerts (success/error/warning/info) with title/message/action; basic feedback surface. |
| [Toast](component-backlog/toast.md) | Feedback | Critical | Medium | Transient notifications with a programmatic `toast()` store are required by virtually every app; KuiReact exports Toast, ToastProvider, ToastRegion, useToastStore, toast(). |
| [TabGroup](component-backlog/tab-group.md) | Navigation | Critical | Small | In-screen tabs (tabs/activeTab/onChange) are a staple of mobile screens. |
| [Drawer](component-backlog/drawer.md) | Overlay | Critical | Medium | Side/bottom sheets are the primary overlay on mobile; KuiReact Drawer shares the Overlays/shared primitives with Modal. |

## High (20)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [ButtonGroup](component-backlog/button-group.md) | Forms | High | Small | Segmented control pattern (options/selected/onChange); very common on mobile. |
| [SearchBar](component-backlog/search-bar.md) | Forms | High | Small | Search is ubiquitous on mobile lists; KuiReact exposes value/onChange/onClear. |
| [CheckboxGroup](component-backlog/checkbox-group.md) | Forms | High | Small | Composes Checkbox; needed for multi-choice forms and filter panels. |
| [MultiSelect](component-backlog/multi-select.md) | Forms | High | Medium | Multi-value selection used by filters and forms. |
| [DatePicker](component-backlog/date-picker.md) | Forms | High | Large | Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover. |
| [Accordion](component-backlog/accordion.md) | Data Display | High | Small | Collapsible sections (FAQ, settings); common on mobile. |
| [RangeSlider](component-backlog/range-slider.md) | Forms | High | Medium | Numeric range input used by filters and settings. |
| [PageHeader](component-backlog/page-header.md) | Layout | High | Small | Screen title + subtitle + actions; every screen uses one. |
| [Stepper](component-backlog/stepper.md) | Navigation | High | Small | Step indicator used by wizards/checkout. |
| [DropdownMenu](component-backlog/dropdown-menu.md) | Overlay | High | Medium | Action menus (items/danger/disabled/separator) are needed for list rows and headers. |
| [SectionCard](component-backlog/section-card.md) | Layout | High | Small | Titled card section for grouping form/content blocks — the settings-screen building block. |
| [InlineAlert](component-backlog/inline-alert.md) | Feedback | High | Small | Compact inline alert used inside forms/cards. |
| [Form](component-backlog/form.md) | Forms | High | Small | Form layout shell: title, description, error banner, grid, actions. |
| [ErrorState](component-backlog/error-state.md) | Feedback | High | Small | Page-level error with retry; pairs with EmptyState. |
| [LoadingState](component-backlog/loading-state.md) | Feedback | High | Small | Page-level loading pattern (5 variants) built on Spinner/Skeleton; screens need it immediately. |
| [ThemeSwitcher](component-backlog/theme-switcher.md) | Theme | High | Small | KuiReact ships ThemeSwitcher in the library; KuiNative keeps its ThemeToggle in the showcase only, so consumers get no theme control. |
| [FormField](component-backlog/form-field.md) | Forms | High | Small | react-hook-form bridge (render-prop) — exported but not in registry. |
| [NotificationProvider](component-backlog/notification-system.md) | Providers | High | Small | KuiReact `NotificationProvider` + `notify()`/`toast()` app-level API (exported, not in registry). |
| [FocusTrap](component-backlog/accessibility-kit.md) | Providers | High | Small | Announcer, AnnouncerOutlet, FocusTrap, LiveRegion, useAnnounce (exported, not in registry). |
| [useBreakpoint](component-backlog/use-breakpoint.md) | Hooks | High | Small | Responsive hook (libs/hooks/useBreakpoint.ts) used by responsive components. |

## Medium / Low core

[AppDrawer](component-backlog/app-drawer.md) (M/Small) · [AppShell](component-backlog/app-shell.md) (M/Medium) · [AppSidebar](component-backlog/app-sidebar.md) (M/Medium) · [AppTopBar](component-backlog/app-top-bar.md) (M/Small) · [BrandLogo](component-backlog/brand-logo.md) (M/Small) · [Chart](component-backlog/chart.md) (M/Very Large) · [ComboBox](component-backlog/combo-box.md) (M/Large) · [DateRangePicker](component-backlog/date-range-picker.md) (M/Large) · [DetailHeader](component-backlog/detail-header.md) (M/Small) · [FileInput](component-backlog/file-input.md) (M/Medium) · [FileUploadSection](component-backlog/file-upload-section.md) (M/Large) · [FilterBar](component-backlog/filter-bar.md) (M/Medium) · [GlobalSearch](component-backlog/global-search.md) (M/Medium) · [ImageGallery](component-backlog/image-gallery.md) (M/Large) · [NoAccessState](component-backlog/no-access-state.md) (M/Small) · [NotFoundState](component-backlog/not-found-state.md) (M/Small) · [OnboardingWizard](component-backlog/onboarding-wizard.md) (M/Medium) · [Pagination](component-backlog/pagination.md) (M/Small) · [Popconfirm](component-backlog/popconfirm.md) (M/Small) · [Popover](component-backlog/popover.md) (M/Medium) · [Slider](component-backlog/slider.md) (M/Medium) · [SplashScreen](component-backlog/splash-screen.md) (M/Small) · [StarRating](component-backlog/star-rating.md) (M/Small) · [StatCard](component-backlog/stat-card.md) (M/Small) · [Statistic](component-backlog/statistic.md) (M/Small) · [StepFlow](component-backlog/step-flow.md) (M/Medium) · [StepShell](component-backlog/step-shell.md) (M/Small) · [TabButton](component-backlog/tab-button.md) (M/Small) · [Table](component-backlog/table.md) (M/Medium) · [TagInput](component-backlog/tag-input.md) (M/Medium) · [Timeline](component-backlog/timeline.md) (M/Small) · [TimePicker](component-backlog/time-picker.md) (M/Medium) · [AdvancedDataTable](component-backlog/advanced-data-table.md) (L/Very Large) · [AppBreadcrumbs](component-backlog/app-breadcrumbs.md) (L/Small) · [AppCommandBar](component-backlog/app-command-bar.md) (L/Large) · [AppFooter](component-backlog/app-footer.md) (L/Small) · [AppNav](component-backlog/app-nav.md) (L/Small) · [Breadcrumb](component-backlog/breadcrumb.md) (L/Small) · [BulkActionTable](component-backlog/bulk-action-table.md) (L/Medium) · [Calendar](component-backlog/calendar.md) (L/Very Large) · [CodeEditor](component-backlog/code-editor.md) (L/Very Large) · [ColorPicker](component-backlog/color-picker.md) (L/Large) · [CommentThread](component-backlog/comment-thread.md) (L/Medium) · [ContentScoreBar](component-backlog/content-score-bar.md) (L/Small) · [ContextMenu](component-backlog/context-menu.md) (L/Medium) · [DataTable](component-backlog/data-table.md) (L/Large) · [DiffViewer](component-backlog/diff-viewer.md) (L/Large) · [FormBuilder](component-backlog/form-builder.md) (L/Very Large) · [Gantt](component-backlog/gantt.md) (L/Very Large) · [KanbanBoard](component-backlog/kanban-board.md) (L/Very Large) · [MaintenancePage](component-backlog/maintenance-page.md) (L/Small) · [MapView](component-backlog/map-view.md) (L/Very Large) · [MentionPicker](component-backlog/mention-picker.md) (L/Medium) · [NavDrawer](component-backlog/nav-drawer.md) (L/Small) · [NotFoundPage](component-backlog/common-not-found-page.md) (L/Small) · [RichTextEditor](component-backlog/rich-text-editor.md) (L/Very Large) · [ScrollArea](component-backlog/scroll-area.md) (L/Small) · [ServerDataTable](component-backlog/server-data-table.md) (L/Medium) · [ShareDialog](component-backlog/share-dialog.md) (L/Medium) · [SkipLink + LiveRegion](component-backlog/skip-link.md) (L/Small) · [Tooltip](component-backlog/tooltip.md) (L/Small) · [TreeView](component-backlog/tree-view.md) (L/Large) · [useA11yCheck](component-backlog/use-a11y-check.md) (L/Small) · [useFocusTrap](component-backlog/use-focus-trap.md) (L/Small) · [VideoPlayer](component-backlog/video-player.md) (L/Very Large) · [ViewToggle](component-backlog/view-toggle.md) (L/Small)

## Domain verticals

- **Common** — 42 components (High/Medium)
- **AI** — 9 components (Low)
- **API Doc** — 15 components (Low)
- **Blog** — 11 components (Low)
- **Commerce** — 10 components (Low)
- **Event** — 19 components (Low)
- **Fintech** — 12 components (Low)
- **Food** — 11 components (Low)
- **Forum** — 10 components (Low)
- **IoT** — 11 components (Low)
- **Jobs** — 8 components (Low)
- **Landing** — 14 components (Low)
- **Media** — 9 components (Low)
- **NFT** — 16 components (Low)
- **Real Estate** — 5 components (Low)
- **Reviews** — 4 components (Low)
- **Social** — 6 components (Low)
- **Travel** — 5 components (Low)
