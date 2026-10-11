# Public exports

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Barrel-level comparison. ✓ = same export name in KuiNative, ≈ = counterpart under a different name, ✗ = absent.

## Summary

| Surface | KuiReact | KuiNative |
| --- | --- | --- |
| npm package | `@kuraykaraaslan/kui-react` 1.0.1 (ESM + CJS + d.ts via tsup) | none (`private: true`) |
| Entry points | `.`, `./ui`, `./app`, `./common`, `./styles` | `@/modules/ui` (repo alias) |
| ui barrel value exports | 78 | 86 |
| ui barrel type exports | 35 | 131 |
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
| Accordion | ✓ same name |
| Avatar | ✓ same name |
| AvatarGroup | ✓ same name |
| Badge | ✓ same name |
| BrandLogo | ✓ same name |
| Button | ✓ same name |
| Checkbox | ✓ same name |
| DatePicker | ✓ same name |
| FileInput | ✓ same name |
| Input | ✓ same name |
| Label | ✓ same name |
| Progress | ✓ same name |
| RangeSlider | ✓ same name |
| ScrollArea | ✓ same name |
| Select | ✓ same name |
| Separator | ✓ same name |
| SkipLink | ✗ |
| LiveRegion | ✗ |
| Announcer | ✗ |
| Spinner | ✓ same name |
| StarRating | ✓ same name |
| StatCard | ✓ same name |
| Statistic | ✓ same name |
| Textarea | ✓ same name |
| Toggle | ✓ same name |
| AdvancedDataTable | ✓ same name |
| AlertBanner | ✓ same name |
| Breadcrumb | ✓ same name |
| ButtonGroup | ✓ same name |
| Card | ✓ same name |
| CheckboxGroup | ✓ same name |
| ComboBox | ✓ same name |
| ContentScoreBar | ✓ same name |
| DataTable | ✓ same name |
| DateRangePicker | ✓ same name |
| TimePicker | ✓ same name |
| Drawer | ✓ same name |
| DropdownMenu | ✓ same name |
| EmptyState | ✓ same name |
| MapView | ✓ same name |
| Modal | ✓ same name |
| MultiSelect | ✓ same name |
| PageHeader | ✓ same name |
| Pagination | ✓ same name |
| Popconfirm | ✓ same name |
| Popover | ✓ same name |
| RadioGroup | ✓ same name |
| SearchBar | ✓ same name |
| ServerDataTable | ✗ |
| SkeletonLine | ✓ same name |
| SkeletonAvatar | ✓ same name |
| SkeletonText | ✓ same name |
| SkeletonCard | ✓ same name |
| SkeletonTableRow | ✗ |
| Slider | ✓ same name |
| Stepper | ✓ same name |
| TabButton | ✓ same name |
| TabGroup | ✓ same name |
| Table | ✓ same name |
| TagInput | ✓ same name |
| Toast | ✓ same name |
| ToastProvider | ✓ same name |
| ToastRegion | ✓ same name |
| Tooltip | ✓ same name |
| TreeView | ✓ same name |
| VideoPlayer | ✓ same name |
| ViewToggle | ✓ same name |
| LazyDataTable | ✗ |
| LazyAdvancedDataTable | ✗ |
| LazyServerDataTable | ✗ |
| LazyDateRangePicker | ✗ |
| LazyMapView | ✗ |
| LazyVideoPlayer | ✗ |
| useToastStore | ✓ same name |
| toast | ✓ same name |
| getEffectiveDuration | ✓ same name |
| BulkActionTable | ✓ same name |
| Timeline | ✓ same name |

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
| toast | ✓ same name |
| Announcer | ✗ |
| AnnouncerOutlet | ✗ |
| FocusTrap | ✗ |
| LiveRegion | ✗ |
| SkipLink | ✗ |
| Tooltip | ✓ same name |
| useAnnounce | ✗ |
| MaintenancePage | ✗ |
| ShareDialog | ✗ |
| CommentThread | ✗ |
| MentionPicker | ✗ |
| OnboardingWizard | ✗ |

## KuiReact root `index.ts` — common-domain re-exports (52)

`AddressCard`, `AddressForm`, `AddressSelector`, `ChangePasswordForm`, `ForgotPasswordForm`, `LoginForm`, `OAuthButtons`, `RegisterForm`, `SessionExpiredBanner`, `CartBadge`, `CartItem`, `CartPreview`, `CartSummary`, `ProductComparisonRadar`, `RegionalSalesPolar`, `RevenueBarChart`, `SalesByCategoryDoughnut`, `UserActivityLineChart`, `ChatBox`, `CouponInput`, `DiscountBadge`, `DirectionProvider`, `useDirection`, `LanguageSwitcher`, `CountrySelector`, `GeoPointDisplay`, `LocationPicker`, `CurrencySelector`, `OrderTotalsCard`, `PriceDisplay`, `NotificationMenu`, `CheckoutSuccessState`, `CreditCardForm`, `detectBrand`, `CreditCardVisual`, `PaymentMethodSelector`, `PaymentStatusBadge`, `PaymentSummaryCard`, `SavedCardSelector`, `SeoForm`, `SeoPreview`, `ProcessingStatusIndicator`, `PublishStatusBadge`, `VisibilityBadge`, `SubscriptionPlanCard`, `UserAvatar`, `UserMenu`, `UserPreferencesForm`, `UserProfileCard`, `UserProfileForm`, `UserRoleBadge`, `UserStatusBadge`

All ✗ in KuiNative.

## KuiNative `modules/ui/index.ts` (86 values, 131 types)

| Export | Props type exported | KuiReact export |
| --- | --- | --- |
| Accordion | ✓ AccordionProps | ✓ Accordion |
| AlertBanner | ✓ AlertBannerProps | ✓ AlertBanner |
| Avatar | ✓ AvatarProps | ✓ Avatar |
| AvatarGroup | ✓ AvatarGroupProps | ≈ Avatar |
| Badge | ✓ BadgeProps | ✓ Badge |
| BrandLogo | ✓ BrandLogoProps | ✓ BrandLogo |
| Breadcrumb | ✓ BreadcrumbProps | ✓ Breadcrumb |
| BulkActionTable | ✓ BulkActionTableProps | ✓ BulkActionTable |
| Button | ✓ ButtonProps | ✓ Button |
| ButtonGroup | ✓ ButtonGroupProps | ✓ ButtonGroup |
| Card | ✓ CardProps | ✓ Card |
| AreaChart | ✗ | ≈ Chart |
| BarChart | ✗ | ≈ Chart |
| DonutChart | ✗ | ≈ Chart |
| LineChart | ✗ | ≈ Chart |
| PieChart | ✗ | ≈ Chart |
| ScatterChart | ✗ | ≈ Chart |
| SparkLine | ✗ | ≈ Chart |
| Checkbox | ✓ CheckboxProps | ✓ Checkbox |
| CheckboxGroup | ✓ CheckboxGroupProps | ✓ CheckboxGroup |
| ColorPicker | ✓ ColorPickerProps | ✓ ColorPicker |
| DEFAULT_COLOR_SWATCHES | ✗ | ≈ ColorPicker |
| ComboBox | ✓ ComboBoxProps | ✓ ComboBox |
| ContentScoreBar | ✓ ContentScoreBarProps | ✓ ContentScoreBar |
| DatePicker | ✓ DatePickerProps | ✓ DatePicker |
| DateRangePicker | ✓ DateRangePickerProps | ✓ DateRangePicker |
| DateTimePicker | ✓ DateTimePickerProps | ≈ DatePicker |
| DiffViewer | ✓ DiffViewerProps | ✓ DiffViewer |
| Drawer | ✓ DrawerProps | ✓ Drawer |
| DropdownMenu | ✓ DropdownMenuProps | ✓ DropdownMenu |
| EmptyState | ✓ EmptyStateProps | ✓ EmptyState |
| FileInput | ✓ FileInputProps | ✓ FileInput |
| Label | ✓ LabelProps | ✓ Label |
| MapView | ✓ MapViewProps | ✓ MapView |
| Modal | ✓ ModalProps | ✓ Modal |
| MultiSelect | ✓ MultiSelectProps | ✓ MultiSelect |
| PageHeader | ✓ PageHeaderProps | ✓ PageHeader |
| Pagination | ✓ PaginationProps | ✓ Pagination |
| Popconfirm | ✓ PopconfirmProps | ✓ Popconfirm |
| Popover | ✓ PopoverProps | ✓ Popover |
| Progress | ✓ ProgressProps | ✓ Progress |
| RadioGroup | ✓ RadioGroupProps | ✓ RadioGroup |
| RangeSlider | ✓ RangeSliderProps | ✓ RangeSlider |
| ScrollArea | ✓ ScrollAreaProps | ✓ ScrollArea |
| SearchBar | ✓ SearchBarProps | ✓ SearchBar |
| Select | ✓ SelectProps | ✓ Select |
| Separator | ✓ SeparatorProps | ✓ Separator |
| SkeletonAvatar | ✗ | ≈ Skeleton |
| SkeletonCard | ✓ SkeletonCardProps | ✓ SkeletonCard |
| SkeletonLine | ✗ | ≈ Skeleton |
| SkeletonText | ✗ | ≈ Skeleton |
| Slider | ✓ SliderProps | ✓ Slider |
| releaseStep | ✗ | ≈ Slider |
| Spinner | ✓ SpinnerProps | ✓ Spinner |
| Switch | ✓ SwitchProps | ≈ Toggle |
| Toggle | ✓ ToggleProps | ✓ Toggle |
| TabButton | ✓ TabButtonProps | ✓ TabButton |
| AdvancedDataTable | ✓ AdvancedDataTableProps | ✓ AdvancedDataTable |
| DataTable | ✓ DataTableProps | ✓ DataTable |
| Table | ✓ TableProps | ✓ Table |
| useServerTable | ✗ | ≈ DataTable |
| useTable | ✗ | ≈ DataTable |
| TagInput | ✓ TagInputProps | ✓ TagInput |
| TabGroup | ✓ TabGroupProps | ✓ TabGroup |
| Text | ✓ TextProps | ✗ (no KuiReact Text component) |
| StarRating | ✓ StarRatingProps | ✓ StarRating |
| StatCard | ✓ StatCardProps | ✓ StatCard |
| Statistic | ✓ StatisticProps | ✓ Statistic |
| Stepper | ✓ StepperProps | ✓ Stepper |
| Tooltip | ✓ TooltipProps | ✓ Tooltip |
| Timeline | ✓ TimelineProps | ✓ Timeline |
| TreeView | ✓ TreeViewProps | ✓ TreeView |
| VideoPlayer | ✓ VideoPlayerProps | ✓ VideoPlayer |
| ViewToggle | ✓ ViewToggleProps | ✓ ViewToggle |
| TimePicker | ✓ TimePickerProps | ✓ TimePicker |
| Toast | ✗ | ✓ Toast |
| ToastProvider | ✗ | ≈ Toast |
| ToastRegion | ✗ | ≈ Toast |
| Toaster | ✓ ToasterProps | ≈ Toast |
| getEffectiveDuration | ✗ | ✗ (no KuiReact Text component) |
| toast | ✗ | ✗ (no KuiReact Text component) |
| useToast | ✗ | ✗ (no KuiReact Text component) |
| useToastStore | ✗ | ✗ (no KuiReact Text component) |
| Textarea | ✓ TextareaProps | ✓ Textarea |
| Input | ✓ InputProps | ✓ Input |
| TextInput | ✓ TextInputProps | ≈ Input |