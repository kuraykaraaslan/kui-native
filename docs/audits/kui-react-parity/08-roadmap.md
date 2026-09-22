# 08 · Roadmap

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Detail: [wave-1-critical.md](phase-5-roadmap/wave-1-critical.md) · [wave-2-core-completion.md](phase-5-roadmap/wave-2-core-completion.md) · [wave-3-advanced.md](phase-5-roadmap/wave-3-advanced.md) · [implementation-order.md](phase-5-roadmap/implementation-order.md)

## Summary

| Wave | Goal | Items | Effort (engineer-days) |
| --- | --- | --- | --- |
| 1 — Critical | Installable, themed, tested library; Button/Input/Modal at parity; baseline form, feedback, overlay and navigation primitives | 28 | 30.5–51 |
| 2 — Core completion | All shared components at parity; parity contract in CI; remaining common ui/app primitives | 54 | 74–126 |
| 3 — Advanced | Heavy organisms, desktop-web patterns (mostly exceptions), domain verticals | 35 core + 217 domain | 143.5–267 core + 330–531 domain |

Estimates assume one engineer familiar with both codebases, Small 0.5–1 d · Medium 2–3 d · Large 5–8 d · Very Large 10–20 d, including tests and a showcase entry.

## Wave 1 in order

1. **R-infra-test** — Test harness: Jest + @testing-library/react-native + CI (Critical, Medium)
2. **R-infra-package** — Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) (Critical, Large)
3. **R-infra-lint** — ESLint (expo + a11y), token/raw-hex audit, convention rules (High, Small)
4. [AlertBanner](component-backlog/alert-banner.md) (Critical, Small)
5. [Label](component-backlog/label.md) (Critical, Small)
6. **R-button** — Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) (Critical, Small)
7. **R-field-shell** — Extract FieldShell (Label, hint, error, success, count) shared by all form controls (Critical, Small; after label)
8. **R-theme-provider** — Export a `KuiProvider` (token `vars()` + scheme resolution) from the library (Critical, Small; after R-infra-package)
9. **R-typography** — Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage (Critical, Small)
10. [RadioGroup](component-backlog/radio-group.md) (Critical, Small; after R-field-shell)
11. [Separator](component-backlog/separator.md) (Critical, Small)
12. [TabGroup](component-backlog/tab-group.md) (Critical, Small)
13. [Textarea](component-backlog/textarea.md) (Critical, Small; after R-field-shell)
14. **R-overlay-core** — Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` (Critical, Medium)
15. [Drawer](component-backlog/drawer.md) (Critical, Medium; after R-overlay-core)
16. [Progress](component-backlog/progress.md) (Critical, Medium)
17. **R-input** — Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) (Critical, Medium; after R-field-shell)
18. **R-modal** — Modal rewrite (see rewrite-candidates.md) (Critical, Medium; after R-overlay-core)
19. [Select](component-backlog/select.md) (Critical, Medium; after R-overlay-core, R-field-shell)
20. [Toast](component-backlog/toast.md) (Critical, Medium)
21. [FocusTrap](component-backlog/accessibility-kit.md) (High, Small; after R-overlay-core)
22. **R-empty-state** — EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) (Medium, Small)
23. [ErrorState](component-backlog/error-state.md) (High, Small; after alert-banner, R-button, R-empty-state)
24. **R-spinner** — Spinner parity (xs–xl, two-tone ring, md ≠ sm) (Medium, Small)
25. [LoadingState](component-backlog/loading-state.md) (High, Small; after R-spinner)
26. [NotificationProvider](component-backlog/notification-system.md) (High, Small; after toast)
27. **R-fa-version** — Align Font Awesome to v7 (KuiReact peer range `>=7`) (High, Small)
28. [useBreakpoint](component-backlog/use-breakpoint.md) (High, Small)

## Wave 2 in order

29. **R-infra-parity** — Parity contract: `parity.exceptions.json`, generated parity matrix, component registry (High, Medium)
30. [Accordion](component-backlog/accordion.md) (High, Small)
31. [ButtonGroup](component-backlog/button-group.md) (High, Small)
32. [CheckboxGroup](component-backlog/checkbox-group.md) (High, Small)
33. [Form](component-backlog/form.md) (High, Small)
34. [FormField](component-backlog/form-field.md) (High, Small)
35. [InlineAlert](component-backlog/inline-alert.md) (High, Small)
36. [PageHeader](component-backlog/page-header.md) (High, Small)
37. **R-avatar** — Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite (High, Small)
38. **R-badge** — Badge parity (children, `neutral`, sizes, dot, dismissible) (High, Small)
39. **R-shadow** — Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) (Medium, Small)
40. **R-card** — Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) (High, Small)
41. **R-checkbox** — Checkbox parity (hint, error, uncontrolled `defaultChecked`) (High, Small)
42. **R-skeleton** — Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion (High, Small)
43. **R-toggle** — Switch → Toggle parity (name, checked/onChange, description, size, label press) (High, Small)
44. [SearchBar](component-backlog/search-bar.md) (High, Small)
45. [SectionCard](component-backlog/section-card.md) (High, Small)
46. [Stepper](component-backlog/stepper.md) (High, Small)
47. [Popover](component-backlog/popover.md) (Medium, Medium)
48. [DropdownMenu](component-backlog/dropdown-menu.md) (High, Medium)
49. [ThemeSwitcher](component-backlog/theme-switcher.md) (High, Small)
50. [MultiSelect](component-backlog/multi-select.md) (High, Medium)
51. [RangeSlider](component-backlog/range-slider.md) (High, Medium)
52. [SkipLink + LiveRegion](component-backlog/skip-link.md) (Low, Small)
53. [Calendar](component-backlog/calendar.md) (Low, Very Large)
54. [DatePicker](component-backlog/date-picker.md) (High, Large)
55. [AppDrawer](component-backlog/app-drawer.md) (Medium, Small)
56. [AppTopBar](component-backlog/app-top-bar.md) (Medium, Small)
57. [BrandLogo](component-backlog/brand-logo.md) (Medium, Small)
58. [DetailHeader](component-backlog/detail-header.md) (Medium, Small)
59. [NoAccessState](component-backlog/no-access-state.md) (Medium, Small)
60. [NotFoundState](component-backlog/not-found-state.md) (Medium, Small)
61. [Pagination](component-backlog/pagination.md) (Medium, Small)
62. [Popconfirm](component-backlog/popconfirm.md) (Medium, Small)
63. [SplashScreen](component-backlog/splash-screen.md) (Medium, Small)
64. [StarRating](component-backlog/star-rating.md) (Medium, Small)
65. [StatCard](component-backlog/stat-card.md) (Medium, Small)
66. [Statistic](component-backlog/statistic.md) (Medium, Small)
67. [StepShell](component-backlog/step-shell.md) (Medium, Small)
68. [TabButton](component-backlog/tab-button.md) (Medium, Small)
69. [Timeline](component-backlog/timeline.md) (Medium, Small)
70. [AppShell](component-backlog/app-shell.md) (Medium, Medium)
71. [AppSidebar](component-backlog/app-sidebar.md) (Medium, Medium)
72. [FileInput](component-backlog/file-input.md) (Medium, Medium)
73. [DateRangePicker](component-backlog/date-range-picker.md) (Medium, Large)
74. [TagInput](component-backlog/tag-input.md) (Medium, Medium)
75. [FilterBar](component-backlog/filter-bar.md) (Medium, Medium)
76. [GlobalSearch](component-backlog/global-search.md) (Medium, Medium)
77. [OnboardingWizard](component-backlog/onboarding-wizard.md) (Medium, Medium)
78. [Slider](component-backlog/slider.md) (Medium, Medium)
79. [StepFlow](component-backlog/step-flow.md) (Medium, Medium)
80. [Table](component-backlog/table.md) (Medium, Medium)
81. [TimePicker](component-backlog/time-picker.md) (Medium, Medium)
82. [ComboBox](component-backlog/combo-box.md) (Medium, Large)

## Wave 3

[FileUploadSection](component-backlog/file-upload-section.md) · [ContextMenu](component-backlog/context-menu.md) · [ImageGallery](component-backlog/image-gallery.md) · [Chart](component-backlog/chart.md) · [Breadcrumb](component-backlog/breadcrumb.md) · [Tooltip](component-backlog/tooltip.md) · [AppBreadcrumbs](component-backlog/app-breadcrumbs.md) · [AppFooter](component-backlog/app-footer.md) _(exception)_ · [NavDrawer](component-backlog/nav-drawer.md) · [AppNav](component-backlog/app-nav.md) · [NotFoundPage](component-backlog/common-not-found-page.md) · [ContentScoreBar](component-backlog/content-score-bar.md) · [MaintenancePage](component-backlog/maintenance-page.md) · [ScrollArea](component-backlog/scroll-area.md) · [useA11yCheck](component-backlog/use-a11y-check.md) _(exception)_ · [useFocusTrap](component-backlog/use-focus-trap.md) · [ViewToggle](component-backlog/view-toggle.md) · [BulkActionTable](component-backlog/bulk-action-table.md) · [CommentThread](component-backlog/comment-thread.md) · [MentionPicker](component-backlog/mention-picker.md) · [DataTable](component-backlog/data-table.md) · [ServerDataTable](component-backlog/server-data-table.md) · [ShareDialog](component-backlog/share-dialog.md) · [AppCommandBar](component-backlog/app-command-bar.md) _(exception)_ · [ColorPicker](component-backlog/color-picker.md) · [DiffViewer](component-backlog/diff-viewer.md) · [TreeView](component-backlog/tree-view.md) · [AdvancedDataTable](component-backlog/advanced-data-table.md) · [CodeEditor](component-backlog/code-editor.md) _(exception)_ · [FormBuilder](component-backlog/form-builder.md) _(exception)_ · [Gantt](component-backlog/gantt.md) _(exception)_ · [KanbanBoard](component-backlog/kanban-board.md) · [MapView](component-backlog/map-view.md) · [RichTextEditor](component-backlog/rich-text-editor.md) · [VideoPlayer](component-backlog/video-player.md)

Plus 217 domain components ([backlog](component-backlog/README.md#domain-217)).
