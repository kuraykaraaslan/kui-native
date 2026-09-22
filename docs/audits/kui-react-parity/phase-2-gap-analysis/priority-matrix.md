# Priority matrix

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Priority × complexity for the core missing set; domain set summarised by counts.

## Core (96)

| Priority \ Complexity | Small | Medium | Large | Very Large | Total |
| --- | --- | --- | --- | --- | --- |
| **Critical** | Label, Separator, Textarea, RadioGroup, AlertBanner, TabGroup | Progress, Select, Toast, Drawer | — | — | 10 |
| **High** | ButtonGroup, SearchBar, CheckboxGroup, Accordion, PageHeader, Stepper, SectionCard, InlineAlert, Form, ErrorState, LoadingState, ThemeSwitcher, FormField, NotificationProvider, FocusTrap, useBreakpoint | MultiSelect, RangeSlider, DropdownMenu | DatePicker | — | 20 |
| **Medium** | BrandLogo, StarRating, Statistic, Popconfirm, StatCard, Pagination, TabButton, Timeline, AppTopBar, StepShell, DetailHeader, NotFoundState, SplashScreen, NoAccessState, AppDrawer | TagInput, FileInput, TimePicker, Slider, Popover, Table, AppShell, AppSidebar, GlobalSearch, FilterBar, OnboardingWizard, StepFlow | ComboBox, DateRangePicker, ImageGallery, FileUploadSection | Chart | 32 |
| **Low** | SkipLink + LiveRegion, ScrollArea, Breadcrumb, ViewToggle, Tooltip, ContentScoreBar, AppNav, NavDrawer, MaintenancePage, AppBreadcrumbs, AppFooter, NotFoundPage, useFocusTrap, useA11yCheck | BulkActionTable, ContextMenu, ShareDialog, CommentThread, MentionPicker, ServerDataTable | ColorPicker, DiffViewer, TreeView, DataTable, AppCommandBar | AdvancedDataTable, VideoPlayer, CodeEditor, RichTextEditor, KanbanBoard, Calendar, Gantt, FormBuilder, MapView | 34 |

## Quick wins (Critical/High × Small)

- ButtonGroup — Segmented control pattern (options/selected/onChange); very common on mobile.
- Label — Every KuiReact form control renders its label with the same required-marker + disabled treatment; KuiNative duplicates ad-hoc label Text in TextInput/Checkbox/Switch.
- Separator — Trivial primitive used by DropdownMenu, Card sections, lists and settings screens; its absence forces raw `View` borders everywhere.
- Textarea — Multi-line text entry is a baseline form control; KuiReact has a dedicated component with label/hint/error/count.
- SearchBar — Search is ubiquitous on mobile lists; KuiReact exposes value/onChange/onClear.
- RadioGroup — Mutually-exclusive choice control; core form primitive.
- CheckboxGroup — Composes Checkbox; needed for multi-choice forms and filter panels.
- Accordion — Collapsible sections (FAQ, settings); common on mobile.
- PageHeader — Screen title + subtitle + actions; every screen uses one.
- AlertBanner — Inline semantic alerts (success/error/warning/info) with title/message/action; basic feedback surface.
- TabGroup — In-screen tabs (tabs/activeTab/onChange) are a staple of mobile screens.
- Stepper — Step indicator used by wizards/checkout.
- SectionCard — Titled card section for grouping form/content blocks — the settings-screen building block.
- InlineAlert — Compact inline alert used inside forms/cards.
- Form — Form layout shell: title, description, error banner, grid, actions.
- ErrorState — Page-level error with retry; pairs with EmptyState.
- LoadingState — Page-level loading pattern (5 variants) built on Spinner/Skeleton; screens need it immediately.
- ThemeSwitcher — KuiReact ships ThemeSwitcher in the library; KuiNative keeps its ThemeToggle in the showcase only, so consumers get no theme control.
- FormField — react-hook-form bridge (render-prop) — exported but not in registry.
- NotificationProvider — KuiReact `NotificationProvider` + `notify()`/`toast()` app-level API (exported, not in registry).
- FocusTrap — Announcer, AnnouncerOutlet, FocusTrap, LiveRegion, useAnnounce (exported, not in registry).
- useBreakpoint — Responsive hook (libs/hooks/useBreakpoint.ts) used by responsive components.

## Expensive and important (Critical/High × Large/Very Large)

- DatePicker (Large) — Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover.

## Recommended parity exceptions (fit = web-only)

- SkipLink + LiveRegion — Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibility-kit.
- AppCommandBar — ⌘K palette is keyboard-first; mobile equivalent is GlobalSearch.
- AppFooter — Website footer; not a mobile pattern.
- CodeEditor — Code editing on phones is rare; KuiEJS already treats it as out of scope.
- Gantt — Gantt chart (3k LOC); KuiEJS removed it as out of scope.
- FormBuilder — Schema form editor (2k LOC); authoring tool, not a mobile pattern. KuiEJS removed it.
- useA11yCheck — Dev-time DOM a11y checker.

## Domain (217)

| Vertical | Critical | High | Medium | Low | Small | Medium | Large | Very Large |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Common | — | 4 | 38 | — | 20 | 18 | 4 | — |
| AI | — | — | — | 9 | 6 | 3 | — | — |
| API Doc | — | — | — | 15 | 5 | 10 | — | — |
| Blog | — | — | — | 11 | 6 | 5 | — | — |
| Commerce | — | — | — | 10 | 4 | 6 | — | — |
| Event | — | — | — | 19 | 8 | 10 | — | 1 |
| Fintech | — | — | — | 12 | 4 | 8 | — | — |
| Food | — | — | — | 11 | 4 | 7 | — | — |
| Forum | — | — | — | 10 | 3 | 7 | — | — |
| IoT | — | — | — | 11 | 3 | 7 | — | 1 |
| Jobs | — | — | — | 8 | 6 | 2 | — | — |
| Landing | — | — | — | 14 | 5 | 8 | 1 | — |
| Media | — | — | — | 9 | 2 | 7 | — | — |
| NFT | — | — | — | 16 | 7 | 9 | — | — |
| Real Estate | — | — | — | 5 | 3 | 2 | — | — |
| Reviews | — | — | — | 4 | 1 | 3 | — | — |
| Social | — | — | — | 6 | 2 | 3 | 1 | — |
| Travel | — | — | — | 5 | 3 | 2 | — | — |