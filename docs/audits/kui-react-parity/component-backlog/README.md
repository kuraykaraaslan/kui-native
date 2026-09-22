# Component backlog

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> 313 backlog files — one per KuiReact component missing from KuiNative.

Each file contains: Overview · KuiReact Reference · Required Props (parsed from source) · Variants (KuiReact showcase code) · States · Accessibility Requirements (ARIA → RN mapping) · Design Tokens (with light/dark values) · Dependencies · Implementation Notes · Acceptance Criteria.

Shared components that exist but lack parity are **not** here — see [feature-matrix/](../feature-matrix/) and [phase-3-parity-review/](../phase-3-parity-review/component-status-matrix.md).

## Core (96)

| Component | Category | Priority | Complexity | Wave | Fit |
| --- | --- | --- | --- | --- | --- |
| [AlertBanner](alert-banner.md) | Feedback | Critical | Small | 1 | direct |
| [Drawer](drawer.md) | Overlay | Critical | Medium | 1 | adapt |
| [Label](label.md) | Typography | Critical | Small | 1 | direct |
| [Progress](progress.md) | Feedback | Critical | Medium | 1 | direct |
| [RadioGroup](radio-group.md) | Forms | Critical | Small | 1 | direct |
| [Select](select.md) | Forms | Critical | Medium | 1 | adapt |
| [Separator](separator.md) | Layout | Critical | Small | 1 | direct |
| [TabGroup](tab-group.md) | Navigation | Critical | Small | 1 | direct |
| [Textarea](textarea.md) | Forms | Critical | Small | 1 | direct |
| [Toast](toast.md) | Feedback | Critical | Medium | 1 | adapt |
| [Accordion](accordion.md) | Data Display | High | Small | 2 | direct |
| [ButtonGroup](button-group.md) | Forms | High | Small | 2 | direct |
| [CheckboxGroup](checkbox-group.md) | Forms | High | Small | 2 | direct |
| [DatePicker](date-picker.md) | Forms | High | Large | 2 | adapt |
| [DropdownMenu](dropdown-menu.md) | Overlay | High | Medium | 2 | adapt |
| [ErrorState](error-state.md) | Feedback | High | Small | 1 | direct |
| [FocusTrap](accessibility-kit.md) | Providers | High | Small | 1 | adapt |
| [Form](form.md) | Forms | High | Small | 2 | direct |
| [FormField](form-field.md) | Forms | High | Small | 2 | direct |
| [InlineAlert](inline-alert.md) | Feedback | High | Small | 2 | direct |
| [LoadingState](loading-state.md) | Feedback | High | Small | 1 | direct |
| [MultiSelect](multi-select.md) | Forms | High | Medium | 2 | adapt |
| [NotificationProvider](notification-system.md) | Providers | High | Small | 1 | adapt |
| [PageHeader](page-header.md) | Layout | High | Small | 2 | direct |
| [RangeSlider](range-slider.md) | Forms | High | Medium | 2 | direct |
| [SearchBar](search-bar.md) | Forms | High | Small | 2 | direct |
| [SectionCard](section-card.md) | Layout | High | Small | 2 | direct |
| [Stepper](stepper.md) | Navigation | High | Small | 2 | direct |
| [ThemeSwitcher](theme-switcher.md) | Theme | High | Small | 2 | direct |
| [useBreakpoint](use-breakpoint.md) | Hooks | High | Small | 1 | direct |
| [AppDrawer](app-drawer.md) | Navigation | Medium | Small | 2 | adapt |
| [AppShell](app-shell.md) | Layout | Medium | Medium | 2 | adapt |
| [AppSidebar](app-sidebar.md) | Navigation | Medium | Medium | 2 | adapt |
| [AppTopBar](app-top-bar.md) | Navigation | Medium | Small | 2 | adapt |
| [BrandLogo](brand-logo.md) | Foundation | Medium | Small | 2 | direct |
| [Chart](chart.md) | Charts | Medium | Very Large | 3 | adapt |
| [ComboBox](combo-box.md) | Forms | Medium | Large | 2 | adapt |
| [DateRangePicker](date-range-picker.md) | Forms | Medium | Large | 2 | adapt |
| [DetailHeader](detail-header.md) | Layout | Medium | Small | 2 | direct |
| [FileInput](file-input.md) | Forms | Medium | Medium | 2 | adapt |
| [FileUploadSection](file-upload-section.md) | Forms | Medium | Large | 3 | adapt |
| [FilterBar](filter-bar.md) | Forms | Medium | Medium | 2 | adapt |
| [GlobalSearch](global-search.md) | Navigation | Medium | Medium | 2 | adapt |
| [ImageGallery](image-gallery.md) | Media | Medium | Large | 3 | adapt |
| [NoAccessState](no-access-state.md) | Feedback | Medium | Small | 2 | direct |
| [NotFoundState](not-found-state.md) | Feedback | Medium | Small | 2 | direct |
| [OnboardingWizard](onboarding-wizard.md) | Advanced Components | Medium | Medium | 2 | adapt |
| [Pagination](pagination.md) | Navigation | Medium | Small | 2 | adapt |
| [Popconfirm](popconfirm.md) | Overlay | Medium | Small | 2 | adapt |
| [Popover](popover.md) | Overlay | Medium | Medium | 2 | adapt |
| [Slider](slider.md) | Media | Medium | Medium | 2 | direct |
| [SplashScreen](splash-screen.md) | Feedback | Medium | Small | 2 | adapt |
| [StarRating](star-rating.md) | Forms | Medium | Small | 2 | direct |
| [StatCard](stat-card.md) | Data Display | Medium | Small | 2 | direct |
| [Statistic](statistic.md) | Data Display | Medium | Small | 2 | direct |
| [StepFlow](step-flow.md) | Forms | Medium | Medium | 2 | direct |
| [StepShell](step-shell.md) | Layout | Medium | Small | 2 | direct |
| [TabButton](tab-button.md) | Navigation | Medium | Small | 2 | direct |
| [Table](table.md) | Tables | Medium | Medium | 2 | adapt |
| [TagInput](tag-input.md) | Forms | Medium | Medium | 2 | direct |
| [Timeline](timeline.md) | Data Display | Medium | Small | 2 | direct |
| [TimePicker](time-picker.md) | Forms | Medium | Medium | 2 | adapt |
| [AdvancedDataTable](advanced-data-table.md) | Tables | Low | Very Large | 3 | adapt |
| [AppBreadcrumbs](app-breadcrumbs.md) | Navigation | Low | Small | 3 | adapt |
| [AppCommandBar](app-command-bar.md) | Navigation | Low | Large | 3 | web-only |
| [AppFooter](app-footer.md) | Layout | Low | Small | 3 | web-only |
| [AppNav](app-nav.md) | Navigation | Low | Small | 3 | adapt |
| [Breadcrumb](breadcrumb.md) | Navigation | Low | Small | 3 | adapt |
| [BulkActionTable](bulk-action-table.md) | Tables | Low | Medium | 3 | adapt |
| [Calendar](calendar.md) | Advanced Components | Low | Very Large | 3 | adapt |
| [CodeEditor](code-editor.md) | Advanced Components | Low | Very Large | 3 | web-only |
| [ColorPicker](color-picker.md) | Forms | Low | Large | 3 | adapt |
| [CommentThread](comment-thread.md) | Advanced Components | Low | Medium | 3 | direct |
| [ContentScoreBar](content-score-bar.md) | Data Display | Low | Small | 3 | direct |
| [ContextMenu](context-menu.md) | Overlay | Low | Medium | 3 | adapt |
| [DataTable](data-table.md) | Tables | Low | Large | 3 | adapt |
| [DiffViewer](diff-viewer.md) | Advanced Components | Low | Large | 3 | adapt |
| [FormBuilder](form-builder.md) | Advanced Components | Low | Very Large | 3 | web-only |
| [Gantt](gantt.md) | Advanced Components | Low | Very Large | 3 | web-only |
| [KanbanBoard](kanban-board.md) | Advanced Components | Low | Very Large | 3 | adapt |
| [MaintenancePage](maintenance-page.md) | Feedback | Low | Small | 3 | direct |
| [MapView](map-view.md) | Media | Low | Very Large | 3 | adapt |
| [MentionPicker](mention-picker.md) | Forms | Low | Medium | 3 | adapt |
| [NavDrawer](nav-drawer.md) | Navigation | Low | Small | 3 | adapt |
| [NotFoundPage](common-not-found-page.md) | Feedback | Low | Small | 3 | adapt |
| [RichTextEditor](rich-text-editor.md) | Advanced Components | Low | Very Large | 3 | adapt |
| [ScrollArea](scroll-area.md) | Layout | Low | Small | 3 | adapt |
| [ServerDataTable](server-data-table.md) | Tables | Low | Medium | 3 | adapt |
| [ShareDialog](share-dialog.md) | Overlay | Low | Medium | 3 | adapt |
| [SkipLink + LiveRegion](skip-link.md) | Utility | Low | Small | 3 | web-only |
| [Tooltip](tooltip.md) | Overlay | Low | Small | 3 | adapt |
| [TreeView](tree-view.md) | Data Display | Low | Large | 3 | direct |
| [useA11yCheck](use-a11y-check.md) | Hooks | Low | Small | 3 | web-only |
| [useFocusTrap](use-focus-trap.md) | Hooks | Low | Small | 3 | adapt |
| [VideoPlayer](video-player.md) | Media | Low | Very Large | 3 | adapt |
| [ViewToggle](view-toggle.md) | Forms | Low | Small | 3 | direct |

## Domain (217)

### Common

[AddressCard](domains/common/common-address-card.md) (M) · [AddressForm](domains/common/common-address-form.md) (M) · [AddressSelector](domains/common/common-address-selector.md) (M) · [ChangePasswordForm](domains/common/common-change-password-form.md) (M) · [Charts](domains/common/common-charts.md) (M) · [ChatBox](domains/common/common-chat-box.md) (M) · [CheckoutSuccessState](domains/common/common-checkout-success-state.md) (M) · [CountrySelector](domains/common/common-country-selector.md) (M) · [CouponInput](domains/common/common-coupon-input.md) (M) · [CreditCardForm](domains/common/common-credit-card-form.md) (M) · [CreditCardVisual](domains/common/common-credit-card-visual.md) (M) · [CurrencySelector](domains/common/common-currency-selector.md) (M) · [DirectionProvider](domains/common/common-direction-provider.md) (M) · [DiscountBadge](domains/common/common-discount-badge.md) (M) · [ForgotPasswordForm](domains/common/common-forgot-password-form.md) (H) · [GeoPointDisplay](domains/common/common-geo-point-display.md) (M) · [LanguageSwitcher](domains/common/common-language-switcher.md) (M) · [LocationPicker](domains/common/common-location-picker.md) (M) · [LoginForm](domains/common/common-login-form.md) (H) · [NotificationMenu](domains/common/common-notification-menu.md) (M) · [OAuthButtons](domains/common/common-oauth-buttons.md) (H) · [OrderTotalsCard](domains/common/common-order-totals-card.md) (M) · [PaymentMethodSelector](domains/common/common-payment-method-selector.md) (M) · [PaymentStatusBadge](domains/common/common-payment-status-badge.md) (M) · [PaymentSummaryCard](domains/common/common-payment-summary-card.md) (M) · [PriceDisplay](domains/common/common-price-display.md) (M) · [ProcessingStatusIndicator](domains/common/common-processing-status-indicator.md) (M) · [PublishStatusBadge](domains/common/common-publish-status-badge.md) (M) · [RegisterForm](domains/common/common-register-form.md) (H) · [SavedCardSelector](domains/common/common-saved-card-selector.md) (M) · [SeoForm](domains/common/common-seo-form.md) (M) · [SeoPreview](domains/common/common-seo-preview.md) (M) · [SessionExpiredBanner](domains/common/common-session-expired-banner.md) (M) · [SubscriptionPlanCard](domains/common/common-subscription-plan-card.md) (M) · [UserAvatar](domains/common/common-user-avatar.md) (M) · [UserMenu](domains/common/common-user-menu.md) (M) · [UserPreferencesForm](domains/common/common-user-preferences-form.md) (M) · [UserProfileCard](domains/common/common-user-profile-card.md) (M) · [UserProfileForm](domains/common/common-user-profile-form.md) (M) · [UserRoleBadge](domains/common/common-user-role-badge.md) (M) · [UserStatusBadge](domains/common/common-user-status-badge.md) (M) · [VisibilityBadge](domains/common/common-visibility-badge.md) (M)

### AI

[AIJobStatusBadge](domains/ai/ai-job-status-badge.md) (L) · [ChatMessage](domains/ai/ai-chat-message.md) (L) · [FeatureCheckCell](domains/ai/ai-feature-check-cell.md) (L) · [ModelCard](domains/ai/ai-model-card.md) (L) · [ModelComparisonTable](domains/ai/ai-model-comparison-table.md) (L) · [ModelProviderBadge](domains/ai/ai-model-provider-badge.md) (L) · [ModelScoreSparkline](domains/ai/ai-model-score-sparkline.md) (L) · [ModelTypeBadge](domains/ai/ai-model-type-badge.md) (L) · [UsageStatsCard](domains/ai/ai-usage-stats-card.md) (L)

### API Doc

[ApiKeyTokenCard](domains/api-doc/api-doc-api-key-token-card.md) (L) · [ApiTagSection](domains/api-doc/api-doc-api-tag-section.md) (L) · [AuthSchemeCard](domains/api-doc/api-doc-auth-scheme-card.md) (L) · [CodeSamplePanel](domains/api-doc/api-doc-code-sample-panel.md) (L) · [EndpointRow](domains/api-doc/api-doc-endpoint-row.md) (L) · [HttpMethodBadge](domains/api-doc/api-doc-http-method-badge.md) (L) · [OAuthFlowDiagram](domains/api-doc/api-doc-oauth-flow-diagram.md) (L) · [OperationPanel](domains/api-doc/api-doc-operation-panel.md) (L) · [ParameterTable](domains/api-doc/api-doc-parameter-table.md) (L) · [ResponseCard](domains/api-doc/api-doc-response-card.md) (L) · [SchemaViewer](domains/api-doc/api-doc-schema-viewer.md) (L) · [SecurityBadge](domains/api-doc/api-doc-security-badge.md) (L) · [SecuritySchemeBadge](domains/api-doc/api-doc-security-scheme-badge.md) (L) · [ServerSelector](domains/api-doc/api-doc-server-selector.md) (L) · [StatusCodeBadge](domains/api-doc/api-doc-status-code-badge.md) (L)

### Blog

[AuthorBioCard](domains/blog/blog-author-bio-card.md) (L) · [AuthorStatsRow](domains/blog/blog-author-stats-row.md) (L) · [CategoryBadge](domains/blog/blog-category-badge.md) (L) · [CommentForm](domains/blog/blog-comment-form.md) (L) · [CommentItem](domains/blog/blog-comment-item.md) (L) · [CommentList](domains/blog/blog-comment-list.md) (L) · [PostCard](domains/blog/blog-post-card.md) (L) · [PostContent](domains/blog/blog-post-content.md) (L) · [PostMeta](domains/blog/blog-post-meta.md) (L) · [PostStatusBadge](domains/blog/blog-post-status-badge.md) (L) · [TopicCloud](domains/blog/blog-topic-cloud.md) (L)

### Commerce

[CartItem](domains/commerce/commerce-cart-item.md) (L) · [EmptyWishlistState](domains/commerce/commerce-empty-wishlist-state.md) (L) · [OrderCard](domains/commerce/commerce-order-card.md) (L) · [OrderStatusBadge](domains/commerce/commerce-order-status-badge.md) (L) · [ProductCard](domains/commerce/commerce-product-card.md) (L) · [ProductImageGallery](domains/commerce/commerce-product-image-gallery.md) (L) · [ProductStatusBadge](domains/commerce/commerce-product-status-badge.md) (L) · [ProductTypeBadge](domains/commerce/commerce-product-type-badge.md) (L) · [StockStatusBadge](domains/commerce/commerce-stock-status-badge.md) (L) · [WishlistItemCard](domains/commerce/commerce-wishlist-item-card.md) (L)

### Event

[CheckoutSuccess](domains/event/checkout-success.md) (L) · [CityPicker](domains/event/event-city-picker.md) (L) · [EventCard](domains/event/event-card.md) (L) · [EventCategoryBadge](domains/event/event-category-badge.md) (L) · [EventFormatBadge](domains/event/event-format-badge.md) (L) · [EventInfoGrid](domains/event/event-info-grid.md) (L) · [EventOrderStatusBadge](domains/event/event-order-status-badge.md) (L) · [EventStatusBadge](domains/event/event-status-badge.md) (L) · [HeroSlide](domains/event/hero-slide.md) (L) · [NavDropdown](domains/event/event-nav-dropdown.md) (L) · [NavLanguageSwitcher](domains/event/event-nav-language-switcher.md) (L) · [NavThemeSwitcher](domains/event/event-nav-theme-switcher.md) (L) · [OrganizerCard](domains/event/organizer-card.md) (L) · [SeatMapPicker](domains/event/seat-map-picker.md) (L) · [SectionPricingCard](domains/event/section-pricing-card.md) (L) · [StepIndicator](domains/event/step-indicator.md) (L) · [TicketCard](domains/event/ticket-card.md) (L) · [TicketRowMeta + TicketRowActions](domains/event/event-ticket-row-meta.md) (L) · [TicketSidebarBox](domains/event/ticket-sidebar-box.md) (L)

### Fintech

[AssetAllocationCard](domains/fintech/fintech-asset-allocation-card.md) (L) · [CardActionMenu](domains/fintech/fintech-card-action-menu.md) (L) · [CardLimitMeter](domains/fintech/fintech-card-limit-meter.md) (L) · [CurrencyBadge](domains/fintech/fintech-currency-badge.md) (L) · [PaymentCardTile](domains/fintech/fintech-payment-card-tile.md) (L) · [PerformanceSparkline](domains/fintech/fintech-performance-sparkline.md) (L) · [PortfolioHoldingRow](domains/fintech/fintech-portfolio-holding-row.md) (L) · [TransactionRow](domains/fintech/fintech-transaction-row.md) (L) · [TransactionStatusBadge](domains/fintech/fintech-transaction-status-badge.md) (L) · [TransactionTypeBadge](domains/fintech/fintech-transaction-type-badge.md) (L) · [WalletCard](domains/fintech/fintech-wallet-card.md) (L) · [WalletStatusBadge](domains/fintech/fintech-wallet-status-badge.md) (L)

### Food

[CourierCard](domains/food/food-courier-card.md) (L) · [CuisineHeroBanner](domains/food/food-cuisine-hero-banner.md) (L) · [CuisineTagChip](domains/food/food-cuisine-tag-chip.md) (L) · [DeliveryStatusBadge](domains/food/food-delivery-status-badge.md) (L) · [EtaCountdownCard](domains/food/food-eta-countdown-card.md) (L) · [FeaturedDishCard](domains/food/food-featured-dish-card.md) (L) · [MenuItemCard](domains/food/food-menu-item-card.md) (L) · [OrderStatusBadge](domains/food/food-order-status-badge.md) (L) · [OrderTrackingTimeline](domains/food/food-order-tracking-timeline.md) (L) · [RestaurantCard](domains/food/food-restaurant-card.md) (L) · [RestaurantStatusBadge](domains/food/food-restaurant-status-badge.md) (L)

### Forum

[BadgeShelf](domains/forum/forum-badge-shelf.md) (L) · [ForumCategoryCard](domains/forum/forum-category-card.md) (L) · [ForumUserCard](domains/forum/forum-user-card.md) (L) · [PostComposer](domains/forum/forum-post-composer.md) (L) · [PostStatusBadge](domains/forum/forum-post-status-badge.md) (L) · [ReactionTypeBadge](domains/forum/forum-reaction-type-badge.md) (L) · [ReputationBar](domains/forum/forum-reputation-bar.md) (L) · [TopicRow](domains/forum/forum-topic-row.md) (L) · [TopicStatusBadge](domains/forum/forum-topic-status-badge.md) (L) · [UserActivityRow](domains/forum/forum-user-activity-row.md) (L)

### IoT

[AlertDetailHeader](domains/iot/iot-alert-detail-header.md) (L) · [AlertEventTimeline](domains/iot/iot-alert-event-timeline.md) (L) · [AlertSeverityBadge](domains/iot/iot-alert-severity-badge.md) (L) · [CloudWorkspaceCard](domains/iot/iot-cloud-workspace-card.md) (L) · [DeviceCard](domains/iot/iot-device-card.md) (L) · [DeviceStatusBadge](domains/iot/iot-device-status-badge.md) (L) · [DeviceTypeBadge](domains/iot/iot-device-type-badge.md) (L) · [LogStreamRow](domains/iot/iot-log-stream-row.md) (L) · [MetricSparklineCard](domains/iot/iot-metric-sparkline-card.md) (L) · [RulesetEditor](domains/iot/iot-ruleset-editor.md) (L) · [TelemetryTimeSeriesChart](domains/iot/iot-telemetry-time-series-chart.md) (L)

### Jobs

[ApplicationStatusBadge](domains/jobs/jobs-application-status-badge.md) (L) · [CompanyCard](domains/jobs/jobs-company-card.md) (L) · [JobCard](domains/jobs/jobs-job-card.md) (L) · [JobExperienceBadge](domains/jobs/jobs-experience-badge.md) (L) · [JobMeta](domains/jobs/jobs-job-meta.md) (L) · [JobStatusBadge](domains/jobs/jobs-status-badge.md) (L) · [JobTypeBadge](domains/jobs/jobs-type-badge.md) (L) · [JobWorkModeBadge](domains/jobs/jobs-work-mode-badge.md) (L)

### Landing

[AnnouncementBar](domains/landing/landing-announcement-bar.md) (L) · [FaqAccordion](domains/landing/landing-faq-accordion.md) (L) · [FeatureCard](domains/landing/landing-feature-card.md) (L) · [FeatureGrid](domains/landing/landing-feature-grid.md) (L) · [HeroSection](domains/landing/landing-hero-section.md) (L) · [HowItWorksSection](domains/landing/landing-how-it-works.md) (L) · [MegaMenu](domains/landing/landing-mega-menu.md) (L) · [PartnerLogosStrip](domains/landing/landing-partner-logos-strip.md) (L) · [PricingGrid](domains/landing/landing-pricing-grid.md) (L) · [PricingPlanCard](domains/landing/landing-pricing-plan-card.md) (L) · [StatsBar](domains/landing/landing-stats-bar.md) (L) · [TeamMemberCard](domains/landing/landing-team-member-card.md) (L) · [TestimonialCard](domains/landing/landing-testimonial-card.md) (L) · [TestimonialGrid](domains/landing/landing-testimonial-grid.md) (L)

### Media

[ChannelCard](domains/media/media-channel-card.md) (L) · [ChannelStatsCard](domains/media/media-channel-stats-card.md) (L) · [PlaylistHeaderCard](domains/media/media-playlist-header-card.md) (L) · [PlaylistVideoRow](domains/media/media-playlist-video-row.md) (L) · [VideoCard](domains/media/media-video-card.md) (L) · [VideoMeta](domains/media/media-video-meta.md) (L) · [VideoPerformanceRow](domains/media/media-video-performance-row.md) (L) · [VideoStatusBadge](domains/media/media-video-status-badge.md) (L) · [WatchTimeChart](domains/media/media-watch-time-chart.md) (L)

### NFT

[ActivityFeedRow](domains/nft/nft-activity-feed-row.md) (L) · [AuctionCountdown](domains/nft/nft-auction-countdown.md) (L) · [BidHistoryRow](domains/nft/nft-bid-history-row.md) (L) · [BlockchainBadge](domains/nft/nft-blockchain-badge.md) (L) · [CollectionCard](domains/nft/nft-collection-card.md) (L) · [CollectionStatsBar](domains/nft/nft-collection-stats-bar.md) (L) · [CreatorLeaderboardRow](domains/nft/nft-creator-leaderboard-row.md) (L) · [CreatorProfileCard](domains/nft/nft-creator-profile-card.md) (L) · [FloorPriceChart](domains/nft/nft-floor-price-chart.md) (L) · [MintProgressBar](domains/nft/nft-mint-progress-bar.md) (L) · [NftCard](domains/nft/nft-card.md) (L) · [NftDetailHeader](domains/nft/nft-detail-header.md) (L) · [PriceTag](domains/nft/nft-price-tag.md) (L) · [RarityBadge](domains/nft/nft-rarity-badge.md) (L) · [TraitTag](domains/nft/nft-trait-tag.md) (L) · [WalletConnectButton](domains/nft/nft-wallet-connect-button.md) (L)

### Real Estate

[AgentCard](domains/real-estate/real-estate-agent-card.md) (L) · [ListingTypeBadge](domains/real-estate/real-estate-listing-type-badge.md) (L) · [PropertyCard](domains/real-estate/real-estate-property-card.md) (L) · [PropertyStatusBadge](domains/real-estate/real-estate-property-status-badge.md) (L) · [PropertyTypeBadge](domains/real-estate/real-estate-property-type-badge.md) (L)

### Reviews

[RatingDistribution](domains/reviews/reviews-rating-distribution.md) (L) · [ReviewCard](domains/reviews/reviews-review-card.md) (L) · [ReviewSubmitForm](domains/reviews/reviews-review-submit-form.md) (L) · [ReviewSummaryCard](domains/reviews/reviews-review-summary-card.md) (L)

### Social

[MarketplaceListingCard](domains/social/social-marketplace-listing-card.md) (L) · [PostCard](domains/social/social-post-card.md) (L) · [PostPrivacyBadge](domains/social/social-post-privacy-badge.md) (L) · [PostStatusBadge](domains/social/social-post-status-badge.md) (L) · [SocialNotificationItem](domains/social/social-notification-item.md) (L) · [SocialProfileCard](domains/social/social-profile-card.md) (L)

### Travel

[BookingStatusBadge](domains/travel/travel-booking-status-badge.md) (L) · [FlightCabinBadge](domains/travel/travel-flight-cabin-badge.md) (L) · [FlightCard](domains/travel/travel-flight-card.md) (L) · [FlightSegmentStatusBadge](domains/travel/travel-flight-segment-status-badge.md) (L) · [HotelCard](domains/travel/travel-hotel-card.md) (L)
