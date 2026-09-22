# Public exports

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Barrel-level comparison. ✓ = same export name in KuiNative, ≈ = counterpart under a different name, ✗ = absent.

## Summary

| Surface | KuiReact | KuiNative |
| --- | --- | --- |
| npm package | `@kuraykaraaslan/kui-react` 1.0.1 (ESM + CJS + d.ts via tsup) | none (`private: true`) |
| Entry points | `.`, `./ui`, `./app`, `./common`, `./styles` | `@/modules/ui` (repo alias) |
| ui barrel value exports | 78 | 13 |
| ui barrel type exports | 35 | 12 |
| app barrel value exports | 43 | 0 |
| common barrel value exports | 52 | 0 |
| Hooks (public) | `useToastStore`, `useAnnounce`, `useDirection` (+ internal `useBreakpoint`, `useFocusTrap`, `useA11yCheck`) | 0 in barrel (`useThemeMode`, `useResolvedScheme`, `useThemeTokens` in `libs/theme.ts`) |
| Providers (public) | `ToastProvider`, `NotificationProvider`, `DirectionProvider` | 0 |
| Imperative APIs | `toast()`, `notify`, `getEffectiveDuration` | 0 |
| Styles export | `./styles` (tokens CSS) | `global.css` + `libs/theme.ts` (not exported) |

Type-export parity note: KuiNative exports a `*Props` type for every component; KuiReact's ui barrel mostly does **not** export props types (it exports data types such as `SelectOption`, `Tab`, `TableColumn`). This is one of the few areas where KuiNative's DX is ahead.

## KuiReact `modules/ui/index.ts` — value exports (78)

| Export | KuiNative |
| --- | --- |
| Accordion | ✗ |
| Avatar | ✓ same name |
| AvatarGroup | ✓ same name |
| Badge | ✓ same name |
| BrandLogo | ✗ |
| Button | ✓ same name |
| Checkbox | ✓ same name |
| DatePicker | ✗ |
| FileInput | ✗ |
| Input | ≈ TextInput |
| Label | ✗ |
| Progress | ✗ |
| RangeSlider | ✗ |
| ScrollArea | ✗ |
| Select | ✗ |
| Separator | ✗ |
| SkipLink | ✗ |
| LiveRegion | ✗ |
| Announcer | ✗ |
| Spinner | ✓ same name |
| StarRating | ✗ |
| StatCard | ✗ |
| Statistic | ✗ |
| Textarea | ✗ |
| Toggle | ≈ Switch |
| AdvancedDataTable | ✗ |
| AlertBanner | ✗ |
| Breadcrumb | ✗ |
| ButtonGroup | ✗ |
| Card | ✓ same name |
| CheckboxGroup | ✗ |
| ComboBox | ✗ |
| ContentScoreBar | ✗ |
| DataTable | ✗ |
| DateRangePicker | ✗ |
| TimePicker | ✗ |
| Drawer | ✗ |
| DropdownMenu | ✗ |
| EmptyState | ✓ same name |
| MapView | ✗ |
| Modal | ✓ same name |
| MultiSelect | ✗ |
| PageHeader | ✗ |
| Pagination | ✗ |
| Popconfirm | ✗ |
| Popover | ✗ |
| RadioGroup | ✗ |
| SearchBar | ✗ |
| ServerDataTable | ✗ |
| SkeletonLine | ✗ |
| SkeletonAvatar | ✗ |
| SkeletonText | ✗ |
| SkeletonCard | ✓ same name |
| SkeletonTableRow | ✗ |
| Slider | ✗ |
| Stepper | ✗ |
| TabButton | ✗ |
| TabGroup | ✗ |
| Table | ✗ |
| TagInput | ✗ |
| Toast | ✗ |
| ToastProvider | ✗ |
| ToastRegion | ✗ |
| Tooltip | ✗ |
| TreeView | ✗ |
| VideoPlayer | ✗ |
| ViewToggle | ✗ |
| LazyDataTable | ✗ |
| LazyAdvancedDataTable | ✗ |
| LazyServerDataTable | ✗ |
| LazyDateRangePicker | ✗ |
| LazyMapView | ✗ |
| LazyVideoPlayer | ✗ |
| useToastStore | ✗ |
| toast | ✗ |
| getEffectiveDuration | ✗ |
| BulkActionTable | ✗ |
| Timeline | ✗ |

## KuiReact `modules/ui/index.ts` — type exports (35)

| Type | KuiNative |
| --- | --- |
| AccordionItem | ✗ |
| SelectOption | ✗ |
| AlertAction | ✗ |
| BreadcrumbItem | ✗ |
| ButtonGroupItem | ✗ |
| ComboBoxOption | ✗ |
| ScoreRule | ✗ |
| DateRange | ✗ |
| DropdownItem | ✗ |
| MapVariant | ✗ |
| MapTooltipField | ✗ |
| MapTooltipData | ✗ |
| MapMarker | ✗ |
| MapZone | ✗ |
| MapRoute | ✗ |
| MultiSelectOption | ✗ |
| PageHeaderAction | ✗ |
| RadioOption | ✗ |
| StepItem | ✗ |
| Tab | ✗ |
| TableColumn | ✗ |
| ToastAction | ✗ |
| ToastPosition | ✗ |
| TreeNode | ✗ |
| QualityOption | ✗ |
| SubtitleTrack | ✗ |
| AudioTrackOption | ✗ |
| ViewOrientation | ✗ |
| ToastItem | ✗ |
| ToastVariant | ✗ |
| ToastItemAction | ✗ |
| BulkActionTableProps | ✗ |
| BulkAction | ✗ |
| TimelineProps | ✗ |
| TimelineItem | ✗ |

## KuiReact `modules/app/index.ts` — value exports (43)

| Export | KuiNative |
| --- | --- |
| AppShell | ✗ |
| AppSidebar | ✗ |
| AppTopBar | ✗ |
| AppDrawer | ✗ |
| AppFooter | ✗ |
| AppBreadcrumbs | ✗ |
| SectionCard | ✗ |
| AppNav | ✗ |
| NavDrawer | ✗ |
| GlobalSearch | ✗ |
| AppCommandBar | ✗ |
| ThemeSwitcher | ✗ |
| ContextMenu | ✗ |
| ImageGallery | ✗ |
| Form | ✗ |
| FormField | ✗ |
| FilterBar | ✗ |
| StepFlow | ✗ |
| StepShell | ✗ |
| FileUploadSection | ✗ |
| DetailHeader | ✗ |
| InlineAlert | ✗ |
| LoadingState | ✗ |
| ErrorState | ✗ |
| NoAccessState | ✗ |
| NotFoundState | ✗ |
| NotFoundPage | ✗ |
| SplashScreen | ✗ |
| NotificationProvider | ✗ |
| notify | ✗ |
| toast | ✗ |
| Announcer | ✗ |
| AnnouncerOutlet | ✗ |
| FocusTrap | ✗ |
| LiveRegion | ✗ |
| SkipLink | ✗ |
| Tooltip | ✗ |
| useAnnounce | ✗ |
| MaintenancePage | ✗ |
| ShareDialog | ✗ |
| CommentThread | ✗ |
| MentionPicker | ✗ |
| OnboardingWizard | ✗ |

## KuiReact root `index.ts` — common-domain re-exports (52)

`AddressCard`, `AddressForm`, `AddressSelector`, `ChangePasswordForm`, `ForgotPasswordForm`, `LoginForm`, `OAuthButtons`, `RegisterForm`, `SessionExpiredBanner`, `CartBadge`, `CartItem`, `CartPreview`, `CartSummary`, `ProductComparisonRadar`, `RegionalSalesPolar`, `RevenueBarChart`, `SalesByCategoryDoughnut`, `UserActivityLineChart`, `ChatBox`, `CouponInput`, `DiscountBadge`, `DirectionProvider`, `useDirection`, `LanguageSwitcher`, `CountrySelector`, `GeoPointDisplay`, `LocationPicker`, `CurrencySelector`, `OrderTotalsCard`, `PriceDisplay`, `NotificationMenu`, `CheckoutSuccessState`, `CreditCardForm`, `detectBrand`, `CreditCardVisual`, `PaymentMethodSelector`, `PaymentStatusBadge`, `PaymentSummaryCard`, `SavedCardSelector`, `SeoForm`, `SeoPreview`, `ProcessingStatusIndicator`, `PublishStatusBadge`, `VisibilityBadge`, `SubscriptionPlanCard`, `UserAvatar`, `UserMenu`, `UserPreferencesForm`, `UserProfileCard`, `UserProfileForm`, `UserRoleBadge`, `UserStatusBadge`

All ✗ in KuiNative.

## KuiNative `modules/ui/index.ts` (13 values, 12 types)

| Export | Props type exported | KuiReact export |
| --- | --- | --- |
| Avatar | ✓ AvatarProps | ✓ Avatar |
| AvatarGroup | ✗ | ≈ Avatar |
| Badge | ✓ BadgeProps | ✓ Badge |
| Button | ✓ ButtonProps | ✓ Button |
| Card | ✓ CardProps | ✓ Card |
| Checkbox | ✓ CheckboxProps | ✓ Checkbox |
| EmptyState | ✓ EmptyStateProps | ✓ EmptyState |
| Modal | ✓ ModalProps | ✓ Modal |
| SkeletonCard | ✓ SkeletonCardProps | ✓ SkeletonCard |
| Spinner | ✓ SpinnerProps | ✓ Spinner |
| Switch | ✓ SwitchProps | ≈ Toggle |
| Text | ✓ TextProps | ✗ (no KuiReact Text component) |
| TextInput | ✓ TextInputProps | ≈ Input |