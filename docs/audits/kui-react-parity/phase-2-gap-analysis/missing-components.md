# Missing components

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> 313 KuiReact components have no KuiNative counterpart (96 core, 217 domain).

## Priority and complexity definitions

- **Critical** — required before any production mobile app can be built on KuiNative (baseline form, feedback, overlay, navigation primitives) or a dependency root for many others.
- **High** — required for strong parity; frequently used in KuiReact or blocking several other components.
- **Medium** — common but not blocking; or a platform adaptation with moderate demand.
- **Low** — niche, desktop-web oriented, or a domain-vertical demo component.
- **Complexity** — Small (<1 d), Medium (2–3 d), Large (5–8 d), Very Large (10–20 d) for a parity-quality port incl. tests + showcase entry. Informed by KuiReact LOC and RN platform gaps.
- **Fit** — `direct` mechanical port · `adapt` needs a platform-idiomatic redesign (sheet instead of popover, etc.) · `web-only` recommended parity exception.
- **Wave** — roadmap wave (see [08-roadmap.md](../08-roadmap.md)).

## Core components (ui / app / hooks) — 96

| Component | Category | Priority | Complexity | Wave | Fit | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| [Label](../component-backlog/label.md) | Typography | Critical | Small | W1 | direct | Every KuiReact form control renders its label with the same required-marker + disabled treatment; KuiNative duplicates ad-hoc label Text in TextInput/Checkbox/Switch. |
| [Separator](../component-backlog/separator.md) | Layout | Critical | Small | W1 | direct | Trivial primitive used by DropdownMenu, Card sections, lists and settings screens; its absence forces raw `View` borders everywhere. |
| [TabGroup](../component-backlog/tab-group.md) | Navigation | Critical | Small | W1 | direct | In-screen tabs (tabs/activeTab/onChange) are a staple of mobile screens. |
| [RadioGroup](../component-backlog/radio-group.md) | Forms | Critical | Small | W1 | direct | Mutually-exclusive choice control; core form primitive. |
| [Select](../component-backlog/select.md) | Forms | Critical | Medium | W1 | adapt | Single-select is the most common form control after Input; forms cannot be built without it. |
| [Textarea](../component-backlog/textarea.md) | Forms | Critical | Small | W1 | direct | Multi-line text entry is a baseline form control; KuiReact has a dedicated component with label/hint/error/count. |
| [AlertBanner](../component-backlog/alert-banner.md) | Feedback | Critical | Small | W1 | direct | Inline semantic alerts (success/error/warning/info) with title/message/action; basic feedback surface. |
| [Progress](../component-backlog/progress.md) | Feedback | Critical | Medium | W1 | direct | Determinate progress (bar + circle) is a baseline feedback primitive for uploads, onboarding and quotas. |
| [Toast](../component-backlog/toast.md) | Feedback | Critical | Medium | W1 | adapt | Transient notifications with a programmatic `toast()` store are required by virtually every app; KuiReact exports Toast, ToastProvider, ToastRegion, useToastStore, toast(). |
| [Drawer](../component-backlog/drawer.md) | Overlay | Critical | Medium | W1 | adapt | Side/bottom sheets are the primary overlay on mobile; KuiReact Drawer shares the Overlays/shared primitives with Modal. |
| [PageHeader](../component-backlog/page-header.md) | Layout | High | Small | W2 | direct | Screen title + subtitle + actions; every screen uses one. |
| [SectionCard](../component-backlog/section-card.md) | Layout | High | Small | W2 | direct | Titled card section for grouping form/content blocks — the settings-screen building block. |
| [Stepper](../component-backlog/stepper.md) | Navigation | High | Small | W2 | direct | Step indicator used by wizards/checkout. |
| [ButtonGroup](../component-backlog/button-group.md) | Forms | High | Small | W2 | direct | Segmented control pattern (options/selected/onChange); very common on mobile. |
| [CheckboxGroup](../component-backlog/checkbox-group.md) | Forms | High | Small | W2 | direct | Composes Checkbox; needed for multi-choice forms and filter panels. |
| [DatePicker](../component-backlog/date-picker.md) | Forms | High | Large | W2 | adapt | Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover. |
| [Form](../component-backlog/form.md) | Forms | High | Small | W2 | direct | Form layout shell: title, description, error banner, grid, actions. |
| [FormField](../component-backlog/form-field.md) | Forms | High | Small | W2 | direct | react-hook-form bridge (render-prop) — exported but not in registry. |
| [MultiSelect](../component-backlog/multi-select.md) | Forms | High | Medium | W2 | adapt | Multi-value selection used by filters and forms. |
| [RangeSlider](../component-backlog/range-slider.md) | Forms | High | Medium | W2 | direct | Numeric range input used by filters and settings. |
| [SearchBar](../component-backlog/search-bar.md) | Forms | High | Small | W2 | direct | Search is ubiquitous on mobile lists; KuiReact exposes value/onChange/onClear. |
| [ErrorState](../component-backlog/error-state.md) | Feedback | High | Small | W1 | direct | Page-level error with retry; pairs with EmptyState. |
| [InlineAlert](../component-backlog/inline-alert.md) | Feedback | High | Small | W2 | direct | Compact inline alert used inside forms/cards. |
| [LoadingState](../component-backlog/loading-state.md) | Feedback | High | Small | W1 | direct | Page-level loading pattern (5 variants) built on Spinner/Skeleton; screens need it immediately. |
| [DropdownMenu](../component-backlog/dropdown-menu.md) | Overlay | High | Medium | W2 | adapt | Action menus (items/danger/disabled/separator) are needed for list rows and headers. |
| [Accordion](../component-backlog/accordion.md) | Data Display | High | Small | W2 | direct | Collapsible sections (FAQ, settings); common on mobile. |
| [FocusTrap](../component-backlog/accessibility-kit.md) | Providers | High | Small | W1 | adapt | Announcer, AnnouncerOutlet, FocusTrap, LiveRegion, useAnnounce (exported, not in registry). |
| [NotificationProvider](../component-backlog/notification-system.md) | Providers | High | Small | W1 | adapt | KuiReact `NotificationProvider` + `notify()`/`toast()` app-level API (exported, not in registry). |
| [useBreakpoint](../component-backlog/use-breakpoint.md) | Hooks | High | Small | W1 | direct | Responsive hook (libs/hooks/useBreakpoint.ts) used by responsive components. |
| [ThemeSwitcher](../component-backlog/theme-switcher.md) | Theme | High | Small | W2 | direct | KuiReact ships ThemeSwitcher in the library; KuiNative keeps its ThemeToggle in the showcase only, so consumers get no theme control. |
| [BrandLogo](../component-backlog/brand-logo.md) | Foundation | Medium | Small | W2 | direct | Used by AppShell/AppFooter/SplashScreen; blocks those ports. |
| [AppShell](../component-backlog/app-shell.md) | Layout | Medium | Medium | W2 | adapt | Root layout (sidebar + top bar + content). On native this maps to navigator layouts. |
| [DetailHeader](../component-backlog/detail-header.md) | Layout | Medium | Small | W2 | direct | Entity header with tabs. |
| [StepShell](../component-backlog/step-shell.md) | Layout | Medium | Small | W2 | direct | Per-step layout wrapper used by StepFlow. |
| [AppDrawer](../component-backlog/app-drawer.md) | Navigation | Medium | Small | W2 | adapt | Exported by KuiReact app layer (not in registry). KuiNative has a same-named showcase-only AppDrawer — name collision without API parity. |
| [AppSidebar](../component-backlog/app-sidebar.md) | Navigation | Medium | Medium | W2 | adapt | Grouped nav with badges and footer slot; KuiNative showcase already has a private Sidebar that should be promoted. |
| [AppTopBar](../component-backlog/app-top-bar.md) | Navigation | Medium | Small | W2 | adapt | Header wrapper; KuiNative showcase has a private Header. |
| [GlobalSearch](../component-backlog/global-search.md) | Navigation | Medium | Medium | W2 | adapt | Global search with previews. |
| [Pagination](../component-backlog/pagination.md) | Navigation | Medium | Small | W2 | adapt | Page controls; mobile lists usually use infinite scroll, but tables/search results still need it. |
| [TabButton](../component-backlog/tab-button.md) | Navigation | Medium | Small | W2 | direct | Single tab button with count badge; building block of TabGroup. |
| [ComboBox](../component-backlog/combo-box.md) | Forms | Medium | Large | W2 | adapt | Async-searchable single select; needed for large option sets. |
| [DateRangePicker](../component-backlog/date-range-picker.md) | Forms | Medium | Large | W2 | adapt | Range selection for filters/bookings; shares DatePicker internals. |
| [FileInput](../component-backlog/file-input.md) | Forms | Medium | Medium | W2 | adapt | File selection; RN has no `<input type=file>`. |
| [FileUploadSection](../component-backlog/file-upload-section.md) | Forms | Medium | Large | W3 | adapt | Upload zone with list/progress/preview. |
| [FilterBar](../component-backlog/filter-bar.md) | Forms | Medium | Medium | W2 | adapt | Multi-field filter UI. |
| [StarRating](../component-backlog/star-rating.md) | Forms | Medium | Small | W2 | direct | Rating display/input; used by reviews domain and 3 KuiReact components. |
| [StepFlow](../component-backlog/step-flow.md) | Forms | Medium | Medium | W2 | direct | Exported multi-step wizard (not in registry). |
| [TagInput](../component-backlog/tag-input.md) | Forms | Medium | Medium | W2 | direct | Chip entry with suggestions; composes Badge(dismissible). |
| [TimePicker](../component-backlog/time-picker.md) | Forms | Medium | Medium | W2 | adapt | Time entry companion to DatePicker. |
| [NoAccessState](../component-backlog/no-access-state.md) | Feedback | Medium | Small | W2 | direct | Exported from KuiReact app layer (EmptyErrorState.tsx) but absent from the registry; permission-denied state. |
| [NotFoundState](../component-backlog/not-found-state.md) | Feedback | Medium | Small | W2 | direct | 404 state inside a screen. |
| [SplashScreen](../component-backlog/splash-screen.md) | Feedback | Medium | Small | W2 | adapt | Branded launch screen; on native this is split between `expo-splash-screen` (OS level) and an in-app animated screen. |
| [Popconfirm](../component-backlog/popconfirm.md) | Overlay | Medium | Small | W2 | adapt | Inline confirmation for destructive actions. |
| [Popover](../component-backlog/popover.md) | Overlay | Medium | Medium | W2 | adapt | Anchored floating panel; basis for Tooltip, DropdownMenu, Popconfirm. |
| [StatCard](../component-backlog/stat-card.md) | Data Display | Medium | Small | W2 | direct | Card-wrapped KPI. |
| [Statistic](../component-backlog/statistic.md) | Data Display | Medium | Small | W2 | direct | Numeric KPI with trend/prefix/suffix; used in dashboards. |
| [Timeline](../component-backlog/timeline.md) | Data Display | Medium | Small | W2 | direct | Activity timeline grouped by day; used by domain feeds. |
| [Table](../component-backlog/table.md) | Tables | Medium | Medium | W2 | adapt | Static data table; on phones tables need horizontal scroll or card fallback. |
| [Chart](../component-backlog/chart.md) | Charts | Medium | Very Large | W3 | adapt | KuiReact wraps Chart.js (1.8k LOC); canvas is not available on RN. |
| [ImageGallery](../component-backlog/image-gallery.md) | Media | Medium | Large | W3 | adapt | Grid + lightbox. |
| [Slider](../component-backlog/slider.md) | Media | Medium | Medium | W2 | direct | Accessible carousel (autoPlay, dots, arrows, loop). |
| [OnboardingWizard](../component-backlog/onboarding-wizard.md) | Advanced Components | Medium | Medium | W2 | adapt | First-run onboarding; very common in mobile apps. |
| [AppFooter](../component-backlog/app-footer.md) | Layout | Low | Small | W3 | web-only | Website footer; not a mobile pattern. |
| [ScrollArea](../component-backlog/scroll-area.md) | Layout | Low | Small | W3 | adapt | Styled-scrollbar container; on RN `ScrollView` is already the primitive. |
| [AppBreadcrumbs](../component-backlog/app-breadcrumbs.md) | Navigation | Low | Small | W3 | adapt | Breadcrumbs with overflow collapse. |
| [AppCommandBar](../component-backlog/app-command-bar.md) | Navigation | Low | Large | W3 | web-only | ⌘K palette is keyboard-first; mobile equivalent is GlobalSearch. |
| [AppNav](../component-backlog/app-nav.md) | Navigation | Low | Small | W3 | adapt | Horizontal top nav with active route; on native replaced by tab bars. |
| [Breadcrumb](../component-backlog/breadcrumb.md) | Navigation | Low | Small | W3 | adapt | Breadcrumbs are uncommon on mobile but required for tablet/web targets of RN. |
| [NavDrawer](../component-backlog/nav-drawer.md) | Navigation | Low | Small | W3 | adapt | Trigger + drawer composite. |
| [ColorPicker](../component-backlog/color-picker.md) | Forms | Low | Large | W3 | adapt | Niche input; large (1.2k LOC). |
| [MentionPicker](../component-backlog/mention-picker.md) | Forms | Low | Medium | W3 | adapt | @mention suggestions. |
| [ViewToggle](../component-backlog/view-toggle.md) | Forms | Low | Small | W3 | direct | List/grid switch; small. |
| [MaintenancePage](../component-backlog/maintenance-page.md) | Feedback | Low | Small | W3 | direct | Maintenance screen. |
| [NotFoundPage](../component-backlog/common-not-found-page.md) | Feedback | Low | Small | W3 | adapt | Full 404 page (registry id `common-not-found-page`). |
| [ContextMenu](../component-backlog/context-menu.md) | Overlay | Low | Medium | W3 | adapt | Right-click menu; on native maps to long-press. |
| [ShareDialog](../component-backlog/share-dialog.md) | Overlay | Low | Medium | W3 | adapt | Collaboration invite dialog; native share is usually `Share.share`. |
| [Tooltip](../component-backlog/tooltip.md) | Overlay | Low | Small | W3 | adapt | Hover-driven on web; on touch devices only long-press makes sense. |
| [ContentScoreBar](../component-backlog/content-score-bar.md) | Data Display | Low | Small | W3 | direct | SEO/content-quality meter; niche. |
| [TreeView](../component-backlog/tree-view.md) | Data Display | Low | Large | W3 | direct | Recursive tree; niche on mobile. |
| [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Tables | Low | Very Large | W3 | adapt | Selectable table with row actions (2k LOC). |
| [BulkActionTable](../component-backlog/bulk-action-table.md) | Tables | Low | Medium | W3 | adapt | Selection + bulk actions. |
| [DataTable](../component-backlog/data-table.md) | Tables | Low | Large | W3 | adapt | Searchable/sortable table (800 LOC). |
| [ServerDataTable](../component-backlog/server-data-table.md) | Tables | Low | Medium | W3 | adapt | Server-driven table (exported, not in registry). |
| [MapView](../component-backlog/map-view.md) | Media | Low | Very Large | W3 | adapt | Leaflet map with markers/zones/routes. |
| [VideoPlayer](../component-backlog/video-player.md) | Media | Low | Very Large | W3 | adapt | Custom HTML5 player (1.5k LOC). |
| [Calendar](../component-backlog/calendar.md) | Advanced Components | Low | Very Large | W3 | adapt | Month/week/day calendar (3.1k LOC). |
| [CodeEditor](../component-backlog/code-editor.md) | Advanced Components | Low | Very Large | W3 | web-only | Code editing on phones is rare; KuiEJS already treats it as out of scope. |
| [CommentThread](../component-backlog/comment-thread.md) | Advanced Components | Low | Medium | W3 | direct | Threaded comments. |
| [DiffViewer](../component-backlog/diff-viewer.md) | Advanced Components | Low | Large | W3 | adapt | Diff display. |
| [FormBuilder](../component-backlog/form-builder.md) | Advanced Components | Low | Very Large | W3 | web-only | Schema form editor (2k LOC); authoring tool, not a mobile pattern. KuiEJS removed it. |
| [Gantt](../component-backlog/gantt.md) | Advanced Components | Low | Very Large | W3 | web-only | Gantt chart (3k LOC); KuiEJS removed it as out of scope. |
| [KanbanBoard](../component-backlog/kanban-board.md) | Advanced Components | Low | Very Large | W3 | adapt | Drag-and-drop board. |
| [RichTextEditor](../component-backlog/rich-text-editor.md) | Advanced Components | Low | Very Large | W3 | adapt | Quill-based editor (2.1k LOC); Quill is DOM-only. |
| [useA11yCheck](../component-backlog/use-a11y-check.md) | Hooks | Low | Small | W3 | web-only | Dev-time DOM a11y checker. |
| [useFocusTrap](../component-backlog/use-focus-trap.md) | Hooks | Low | Small | W3 | adapt | DOM focus trap for overlays. |
| [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Utility | Low | Small | W3 | web-only | Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibility-kit. |

## Domain components — 217

Domain verticals are industry demo components. KuiReact's own ADR 0003 records 16 of 18 verticals as React-only with respect to KuiEJS; only `common` and `api-doc` carry a parity obligation there. This audit applies the same policy: `common` is Medium (a few auth/user items High), everything else Low and a candidate for `parity.exceptions.json`.

### Common (42)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [ForgotPasswordForm](../component-backlog/domains/common/common-forgot-password-form.md) | Domain — Common | High | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [LoginForm](../component-backlog/domains/common/common-login-form.md) | Domain — Common | High | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [OAuthButtons](../component-backlog/domains/common/common-oauth-buttons.md) | Domain — Common | High | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [RegisterForm](../component-backlog/domains/common/common-register-form.md) | Domain — Common | High | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [AddressCard](../component-backlog/domains/common/common-address-card.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [AddressForm](../component-backlog/domains/common/common-address-form.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [AddressSelector](../component-backlog/domains/common/common-address-selector.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [ChangePasswordForm](../component-backlog/domains/common/common-change-password-form.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [Charts](../component-backlog/domains/common/common-charts.md) | Domain — Common | Medium | Large | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [ChatBox](../component-backlog/domains/common/common-chat-box.md) | Domain — Common | Medium | Large | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [CheckoutSuccessState](../component-backlog/domains/common/common-checkout-success-state.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [CountrySelector](../component-backlog/domains/common/common-country-selector.md) | Domain — Common | Medium | Large | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [CouponInput](../component-backlog/domains/common/common-coupon-input.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [CreditCardForm](../component-backlog/domains/common/common-credit-card-form.md) | Domain — Common | Medium | Large | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [CreditCardVisual](../component-backlog/domains/common/common-credit-card-visual.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [CurrencySelector](../component-backlog/domains/common/common-currency-selector.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [DirectionProvider](../component-backlog/domains/common/common-direction-provider.md) | Domain — Common | Medium | Small | RTL direction context (common vertical: DirectionProvider/useDirection). |
| [DiscountBadge](../component-backlog/domains/common/common-discount-badge.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [GeoPointDisplay](../component-backlog/domains/common/common-geo-point-display.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [LanguageSwitcher](../component-backlog/domains/common/common-language-switcher.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [LocationPicker](../component-backlog/domains/common/common-location-picker.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [NotificationMenu](../component-backlog/domains/common/common-notification-menu.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [OrderTotalsCard](../component-backlog/domains/common/common-order-totals-card.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [PaymentMethodSelector](../component-backlog/domains/common/common-payment-method-selector.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [PaymentStatusBadge](../component-backlog/domains/common/common-payment-status-badge.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [PaymentSummaryCard](../component-backlog/domains/common/common-payment-summary-card.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [PriceDisplay](../component-backlog/domains/common/common-price-display.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [ProcessingStatusIndicator](../component-backlog/domains/common/common-processing-status-indicator.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [PublishStatusBadge](../component-backlog/domains/common/common-publish-status-badge.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [SavedCardSelector](../component-backlog/domains/common/common-saved-card-selector.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [SeoForm](../component-backlog/domains/common/common-seo-form.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [SeoPreview](../component-backlog/domains/common/common-seo-preview.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [SessionExpiredBanner](../component-backlog/domains/common/common-session-expired-banner.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [SubscriptionPlanCard](../component-backlog/domains/common/common-subscription-plan-card.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [UserAvatar](../component-backlog/domains/common/common-user-avatar.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [UserMenu](../component-backlog/domains/common/common-user-menu.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [UserPreferencesForm](../component-backlog/domains/common/common-user-preferences-form.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [UserProfileCard](../component-backlog/domains/common/common-user-profile-card.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [UserProfileForm](../component-backlog/domains/common/common-user-profile-form.md) | Domain — Common | Medium | Medium | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. |
| [UserRoleBadge](../component-backlog/domains/common/common-user-role-badge.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [UserStatusBadge](../component-backlog/domains/common/common-user-status-badge.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [VisibilityBadge](../component-backlog/domains/common/common-visibility-badge.md) | Domain — Common | Medium | Small | Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |

### AI (9)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [AIJobStatusBadge](../component-backlog/domains/ai/ai-job-status-badge.md) | Domain — AI | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [ChatMessage](../component-backlog/domains/ai/ai-chat-message.md) | Domain — AI | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [FeatureCheckCell](../component-backlog/domains/ai/ai-feature-check-cell.md) | Domain — AI | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ModelCard](../component-backlog/domains/ai/ai-model-card.md) | Domain — AI | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ModelComparisonTable](../component-backlog/domains/ai/ai-model-comparison-table.md) | Domain — AI | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ModelProviderBadge](../component-backlog/domains/ai/ai-model-provider-badge.md) | Domain — AI | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [ModelScoreSparkline](../component-backlog/domains/ai/ai-model-score-sparkline.md) | Domain — AI | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ModelTypeBadge](../component-backlog/domains/ai/ai-model-type-badge.md) | Domain — AI | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [UsageStatsCard](../component-backlog/domains/ai/ai-usage-stats-card.md) | Domain — AI | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### API Doc (15)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [ApiKeyTokenCard](../component-backlog/domains/api-doc/api-doc-api-key-token-card.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [ApiTagSection](../component-backlog/domains/api-doc/api-doc-api-tag-section.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [AuthSchemeCard](../component-backlog/domains/api-doc/api-doc-auth-scheme-card.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [CodeSamplePanel](../component-backlog/domains/api-doc/api-doc-code-sample-panel.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [EndpointRow](../component-backlog/domains/api-doc/api-doc-endpoint-row.md) | Domain — API Doc | Low | Small | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [HttpMethodBadge](../component-backlog/domains/api-doc/api-doc-http-method-badge.md) | Domain — API Doc | Low | Small | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [OAuthFlowDiagram](../component-backlog/domains/api-doc/api-doc-oauth-flow-diagram.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [OperationPanel](../component-backlog/domains/api-doc/api-doc-operation-panel.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [ParameterTable](../component-backlog/domains/api-doc/api-doc-parameter-table.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [ResponseCard](../component-backlog/domains/api-doc/api-doc-response-card.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [SchemaViewer](../component-backlog/domains/api-doc/api-doc-schema-viewer.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [SecurityBadge](../component-backlog/domains/api-doc/api-doc-security-badge.md) | Domain — API Doc | Low | Small | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [SecuritySchemeBadge](../component-backlog/domains/api-doc/api-doc-security-scheme-badge.md) | Domain — API Doc | Low | Small | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [ServerSelector](../component-backlog/domains/api-doc/api-doc-server-selector.md) | Domain — API Doc | Low | Medium | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. |
| [StatusCodeBadge](../component-backlog/domains/api-doc/api-doc-status-code-badge.md) | Domain — API Doc | Low | Small | Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |

### Blog (11)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [AuthorBioCard](../component-backlog/domains/blog/blog-author-bio-card.md) | Domain — Blog | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [AuthorStatsRow](../component-backlog/domains/blog/blog-author-stats-row.md) | Domain — Blog | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CategoryBadge](../component-backlog/domains/blog/blog-category-badge.md) | Domain — Blog | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [CommentForm](../component-backlog/domains/blog/blog-comment-form.md) | Domain — Blog | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CommentItem](../component-backlog/domains/blog/blog-comment-item.md) | Domain — Blog | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CommentList](../component-backlog/domains/blog/blog-comment-list.md) | Domain — Blog | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostCard](../component-backlog/domains/blog/blog-post-card.md) | Domain — Blog | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostContent](../component-backlog/domains/blog/blog-post-content.md) | Domain — Blog | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostMeta](../component-backlog/domains/blog/blog-post-meta.md) | Domain — Blog | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostStatusBadge](../component-backlog/domains/blog/blog-post-status-badge.md) | Domain — Blog | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [TopicCloud](../component-backlog/domains/blog/blog-topic-cloud.md) | Domain — Blog | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Commerce (10)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [CartItem](../component-backlog/domains/commerce/commerce-cart-item.md) | Domain — Commerce | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [EmptyWishlistState](../component-backlog/domains/commerce/commerce-empty-wishlist-state.md) | Domain — Commerce | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [OrderCard](../component-backlog/domains/commerce/commerce-order-card.md) | Domain — Commerce | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [OrderStatusBadge](../component-backlog/domains/commerce/commerce-order-status-badge.md) | Domain — Commerce | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [ProductCard](../component-backlog/domains/commerce/commerce-product-card.md) | Domain — Commerce | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ProductImageGallery](../component-backlog/domains/commerce/commerce-product-image-gallery.md) | Domain — Commerce | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ProductStatusBadge](../component-backlog/domains/commerce/commerce-product-status-badge.md) | Domain — Commerce | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [ProductTypeBadge](../component-backlog/domains/commerce/commerce-product-type-badge.md) | Domain — Commerce | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [StockStatusBadge](../component-backlog/domains/commerce/commerce-stock-status-badge.md) | Domain — Commerce | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [WishlistItemCard](../component-backlog/domains/commerce/commerce-wishlist-item-card.md) | Domain — Commerce | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Event (19)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [CheckoutSuccess](../component-backlog/domains/event/checkout-success.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CityPicker](../component-backlog/domains/event/event-city-picker.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [EventCard](../component-backlog/domains/event/event-card.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [EventCategoryBadge](../component-backlog/domains/event/event-category-badge.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [EventFormatBadge](../component-backlog/domains/event/event-format-badge.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [EventInfoGrid](../component-backlog/domains/event/event-info-grid.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [EventOrderStatusBadge](../component-backlog/domains/event/event-order-status-badge.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [EventStatusBadge](../component-backlog/domains/event/event-status-badge.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [HeroSlide](../component-backlog/domains/event/hero-slide.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [NavDropdown](../component-backlog/domains/event/event-nav-dropdown.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [NavLanguageSwitcher](../component-backlog/domains/event/event-nav-language-switcher.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [NavThemeSwitcher](../component-backlog/domains/event/event-nav-theme-switcher.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [OrganizerCard](../component-backlog/domains/event/organizer-card.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [SeatMapPicker](../component-backlog/domains/event/seat-map-picker.md) | Domain — Event | Low | Very Large | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [SectionPricingCard](../component-backlog/domains/event/section-pricing-card.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [StepIndicator](../component-backlog/domains/event/step-indicator.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TicketCard](../component-backlog/domains/event/ticket-card.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TicketRowMeta + TicketRowActions](../component-backlog/domains/event/event-ticket-row-meta.md) | Domain — Event | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TicketSidebarBox](../component-backlog/domains/event/ticket-sidebar-box.md) | Domain — Event | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Fintech (12)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [AssetAllocationCard](../component-backlog/domains/fintech/fintech-asset-allocation-card.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CardActionMenu](../component-backlog/domains/fintech/fintech-card-action-menu.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CardLimitMeter](../component-backlog/domains/fintech/fintech-card-limit-meter.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CurrencyBadge](../component-backlog/domains/fintech/fintech-currency-badge.md) | Domain — Fintech | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [PaymentCardTile](../component-backlog/domains/fintech/fintech-payment-card-tile.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PerformanceSparkline](../component-backlog/domains/fintech/fintech-performance-sparkline.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PortfolioHoldingRow](../component-backlog/domains/fintech/fintech-portfolio-holding-row.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TransactionRow](../component-backlog/domains/fintech/fintech-transaction-row.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TransactionStatusBadge](../component-backlog/domains/fintech/fintech-transaction-status-badge.md) | Domain — Fintech | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [TransactionTypeBadge](../component-backlog/domains/fintech/fintech-transaction-type-badge.md) | Domain — Fintech | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [WalletCard](../component-backlog/domains/fintech/fintech-wallet-card.md) | Domain — Fintech | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [WalletStatusBadge](../component-backlog/domains/fintech/fintech-wallet-status-badge.md) | Domain — Fintech | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |

### Food (11)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [CourierCard](../component-backlog/domains/food/food-courier-card.md) | Domain — Food | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CuisineHeroBanner](../component-backlog/domains/food/food-cuisine-hero-banner.md) | Domain — Food | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CuisineTagChip](../component-backlog/domains/food/food-cuisine-tag-chip.md) | Domain — Food | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [DeliveryStatusBadge](../component-backlog/domains/food/food-delivery-status-badge.md) | Domain — Food | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [EtaCountdownCard](../component-backlog/domains/food/food-eta-countdown-card.md) | Domain — Food | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [FeaturedDishCard](../component-backlog/domains/food/food-featured-dish-card.md) | Domain — Food | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [MenuItemCard](../component-backlog/domains/food/food-menu-item-card.md) | Domain — Food | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [OrderStatusBadge](../component-backlog/domains/food/food-order-status-badge.md) | Domain — Food | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [OrderTrackingTimeline](../component-backlog/domains/food/food-order-tracking-timeline.md) | Domain — Food | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [RestaurantCard](../component-backlog/domains/food/food-restaurant-card.md) | Domain — Food | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [RestaurantStatusBadge](../component-backlog/domains/food/food-restaurant-status-badge.md) | Domain — Food | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |

### Forum (10)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [BadgeShelf](../component-backlog/domains/forum/forum-badge-shelf.md) | Domain — Forum | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ForumCategoryCard](../component-backlog/domains/forum/forum-category-card.md) | Domain — Forum | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ForumUserCard](../component-backlog/domains/forum/forum-user-card.md) | Domain — Forum | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostComposer](../component-backlog/domains/forum/forum-post-composer.md) | Domain — Forum | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostStatusBadge](../component-backlog/domains/forum/forum-post-status-badge.md) | Domain — Forum | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [ReactionTypeBadge](../component-backlog/domains/forum/forum-reaction-type-badge.md) | Domain — Forum | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [ReputationBar](../component-backlog/domains/forum/forum-reputation-bar.md) | Domain — Forum | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TopicRow](../component-backlog/domains/forum/forum-topic-row.md) | Domain — Forum | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TopicStatusBadge](../component-backlog/domains/forum/forum-topic-status-badge.md) | Domain — Forum | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [UserActivityRow](../component-backlog/domains/forum/forum-user-activity-row.md) | Domain — Forum | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### IoT (11)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [AlertDetailHeader](../component-backlog/domains/iot/iot-alert-detail-header.md) | Domain — IoT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [AlertEventTimeline](../component-backlog/domains/iot/iot-alert-event-timeline.md) | Domain — IoT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [AlertSeverityBadge](../component-backlog/domains/iot/iot-alert-severity-badge.md) | Domain — IoT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [CloudWorkspaceCard](../component-backlog/domains/iot/iot-cloud-workspace-card.md) | Domain — IoT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [DeviceCard](../component-backlog/domains/iot/iot-device-card.md) | Domain — IoT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [DeviceStatusBadge](../component-backlog/domains/iot/iot-device-status-badge.md) | Domain — IoT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [DeviceTypeBadge](../component-backlog/domains/iot/iot-device-type-badge.md) | Domain — IoT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [LogStreamRow](../component-backlog/domains/iot/iot-log-stream-row.md) | Domain — IoT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [MetricSparklineCard](../component-backlog/domains/iot/iot-metric-sparkline-card.md) | Domain — IoT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [RulesetEditor](../component-backlog/domains/iot/iot-ruleset-editor.md) | Domain — IoT | Low | Very Large | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TelemetryTimeSeriesChart](../component-backlog/domains/iot/iot-telemetry-time-series-chart.md) | Domain — IoT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Jobs (8)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [ApplicationStatusBadge](../component-backlog/domains/jobs/jobs-application-status-badge.md) | Domain — Jobs | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [CompanyCard](../component-backlog/domains/jobs/jobs-company-card.md) | Domain — Jobs | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [JobCard](../component-backlog/domains/jobs/jobs-job-card.md) | Domain — Jobs | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [JobExperienceBadge](../component-backlog/domains/jobs/jobs-experience-badge.md) | Domain — Jobs | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [JobMeta](../component-backlog/domains/jobs/jobs-job-meta.md) | Domain — Jobs | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [JobStatusBadge](../component-backlog/domains/jobs/jobs-status-badge.md) | Domain — Jobs | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [JobTypeBadge](../component-backlog/domains/jobs/jobs-type-badge.md) | Domain — Jobs | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [JobWorkModeBadge](../component-backlog/domains/jobs/jobs-work-mode-badge.md) | Domain — Jobs | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |

### Landing (14)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [AnnouncementBar](../component-backlog/domains/landing/landing-announcement-bar.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [FaqAccordion](../component-backlog/domains/landing/landing-faq-accordion.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [FeatureCard](../component-backlog/domains/landing/landing-feature-card.md) | Domain — Landing | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [FeatureGrid](../component-backlog/domains/landing/landing-feature-grid.md) | Domain — Landing | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [HeroSection](../component-backlog/domains/landing/landing-hero-section.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [HowItWorksSection](../component-backlog/domains/landing/landing-how-it-works.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [MegaMenu](../component-backlog/domains/landing/landing-mega-menu.md) | Domain — Landing | Low | Large | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PartnerLogosStrip](../component-backlog/domains/landing/landing-partner-logos-strip.md) | Domain — Landing | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PricingGrid](../component-backlog/domains/landing/landing-pricing-grid.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PricingPlanCard](../component-backlog/domains/landing/landing-pricing-plan-card.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [StatsBar](../component-backlog/domains/landing/landing-stats-bar.md) | Domain — Landing | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TeamMemberCard](../component-backlog/domains/landing/landing-team-member-card.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TestimonialCard](../component-backlog/domains/landing/landing-testimonial-card.md) | Domain — Landing | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [TestimonialGrid](../component-backlog/domains/landing/landing-testimonial-grid.md) | Domain — Landing | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Media (9)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [ChannelCard](../component-backlog/domains/media/media-channel-card.md) | Domain — Media | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ChannelStatsCard](../component-backlog/domains/media/media-channel-stats-card.md) | Domain — Media | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PlaylistHeaderCard](../component-backlog/domains/media/media-playlist-header-card.md) | Domain — Media | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PlaylistVideoRow](../component-backlog/domains/media/media-playlist-video-row.md) | Domain — Media | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [VideoCard](../component-backlog/domains/media/media-video-card.md) | Domain — Media | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [VideoMeta](../component-backlog/domains/media/media-video-meta.md) | Domain — Media | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [VideoPerformanceRow](../component-backlog/domains/media/media-video-performance-row.md) | Domain — Media | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [VideoStatusBadge](../component-backlog/domains/media/media-video-status-badge.md) | Domain — Media | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [WatchTimeChart](../component-backlog/domains/media/media-watch-time-chart.md) | Domain — Media | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### NFT (16)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [ActivityFeedRow](../component-backlog/domains/nft/nft-activity-feed-row.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [AuctionCountdown](../component-backlog/domains/nft/nft-auction-countdown.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [BidHistoryRow](../component-backlog/domains/nft/nft-bid-history-row.md) | Domain — NFT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [BlockchainBadge](../component-backlog/domains/nft/nft-blockchain-badge.md) | Domain — NFT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [CollectionCard](../component-backlog/domains/nft/nft-collection-card.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CollectionStatsBar](../component-backlog/domains/nft/nft-collection-stats-bar.md) | Domain — NFT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CreatorLeaderboardRow](../component-backlog/domains/nft/nft-creator-leaderboard-row.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [CreatorProfileCard](../component-backlog/domains/nft/nft-creator-profile-card.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [FloorPriceChart](../component-backlog/domains/nft/nft-floor-price-chart.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [MintProgressBar](../component-backlog/domains/nft/nft-mint-progress-bar.md) | Domain — NFT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [NftCard](../component-backlog/domains/nft/nft-card.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [NftDetailHeader](../component-backlog/domains/nft/nft-detail-header.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PriceTag](../component-backlog/domains/nft/nft-price-tag.md) | Domain — NFT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [RarityBadge](../component-backlog/domains/nft/nft-rarity-badge.md) | Domain — NFT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [TraitTag](../component-backlog/domains/nft/nft-trait-tag.md) | Domain — NFT | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [WalletConnectButton](../component-backlog/domains/nft/nft-wallet-connect-button.md) | Domain — NFT | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Real Estate (5)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [AgentCard](../component-backlog/domains/real-estate/real-estate-agent-card.md) | Domain — Real Estate | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ListingTypeBadge](../component-backlog/domains/real-estate/real-estate-listing-type-badge.md) | Domain — Real Estate | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [PropertyCard](../component-backlog/domains/real-estate/real-estate-property-card.md) | Domain — Real Estate | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PropertyStatusBadge](../component-backlog/domains/real-estate/real-estate-property-status-badge.md) | Domain — Real Estate | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [PropertyTypeBadge](../component-backlog/domains/real-estate/real-estate-property-type-badge.md) | Domain — Real Estate | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |

### Reviews (4)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [RatingDistribution](../component-backlog/domains/reviews/reviews-rating-distribution.md) | Domain — Reviews | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ReviewCard](../component-backlog/domains/reviews/reviews-review-card.md) | Domain — Reviews | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ReviewSubmitForm](../component-backlog/domains/reviews/reviews-review-submit-form.md) | Domain — Reviews | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [ReviewSummaryCard](../component-backlog/domains/reviews/reviews-review-summary-card.md) | Domain — Reviews | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Social (6)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [MarketplaceListingCard](../component-backlog/domains/social/social-marketplace-listing-card.md) | Domain — Social | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostCard](../component-backlog/domains/social/social-post-card.md) | Domain — Social | Low | Large | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [PostPrivacyBadge](../component-backlog/domains/social/social-post-privacy-badge.md) | Domain — Social | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [PostStatusBadge](../component-backlog/domains/social/social-post-status-badge.md) | Domain — Social | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [SocialNotificationItem](../component-backlog/domains/social/social-notification-item.md) | Domain — Social | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [SocialProfileCard](../component-backlog/domains/social/social-profile-card.md) | Domain — Social | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |

### Travel (5)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [BookingStatusBadge](../component-backlog/domains/travel/travel-booking-status-badge.md) | Domain — Travel | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [FlightCabinBadge](../component-backlog/domains/travel/travel-flight-cabin-badge.md) | Domain — Travel | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [FlightCard](../component-backlog/domains/travel/travel-flight-card.md) | Domain — Travel | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |
| [FlightSegmentStatusBadge](../component-backlog/domains/travel/travel-flight-segment-status-badge.md) | Domain — Travel | Low | Small | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity. |
| [HotelCard](../component-backlog/domains/travel/travel-hotel-card.md) | Domain — Travel | Low | Medium | Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. |