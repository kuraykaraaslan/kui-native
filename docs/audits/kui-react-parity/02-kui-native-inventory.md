# 02 · KuiNative inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Full table: [phase-1-inventory/kui-native-components.md](phase-1-inventory/kui-native-components.md)

## Shape of KuiNative

- **Stack:** Expo SDK 56 (`expo ^56.0.9`, README still says SDK 55) · React Native 0.85 · React 19.2 · NativeWind 4 + Tailwind 3.4 · Font Awesome **6.7.2** · zustand · expo-image · reanimated 4 (installed, unused by the library).
- **Layers:** `modules/ui` only. No app layer, no domains, no providers.
- **Catalog:** 68 exports from 53 component modules (Accordion, AlertBanner, Avatar, AvatarGroup, Badge, BrandLogo, Breadcrumb, Button, ButtonGroup, Card, Checkbox, CheckboxGroup, ComboBox, ContentScoreBar, DatePicker, DateRangePicker, DateTimePicker, Drawer, DropdownMenu, EmptyState, FileInput, Label, Modal, MultiSelect, PageHeader, Pagination, Popconfirm, Popover, Progress, RadioGroup, RangeSlider, ScrollArea, SearchBar, Select, Separator, SkeletonAvatar, SkeletonCard, SkeletonLine, SkeletonText, Slider, Spinner, Switch, Toggle, TabButton, Table, TagInput, TabGroup, Text, StarRating, StatCard, Statistic, Stepper, Tooltip, Timeline, ViewToggle, TimePicker, Toast, ToastProvider, ToastRegion, Toaster, Textarea, Input, TextInput, plus the `toast()` API and its hooks) + theme utilities in `libs/theme.ts`.
- **Quality infrastructure:** a Jest (`jest-expo`) + `@testing-library/react-native` harness (`jest.config.js`, `npm test`) with 52 test files (436 static `it` / `test` blocks) at commit `08c1c32`; still no ESLint config, no CI, no registry, no ADRs. A showcase app (Expo Router) with 52 entries, 1:1 with KuiReact showcase variants, is the only documentation besides the README.
- **Packaging:** not publishable (`private: true`, `main: expo-router/entry`).

## Components

| Component | Category | LOC | KuiReact counterpart |
| --- | --- | --- | --- |
| Accordion | Data Display | 139 | Accordion |
| AlertBanner | Feedback | 108 | AlertBanner |
| Avatar | Data Display | 165 | Avatar |
| AvatarGroup | Data Display | 165 | Avatar |
| Badge | Data Display | 119 | Badge |
| BrandLogo | Foundation | 46 | BrandLogo |
| Breadcrumb | Navigation | 86 | Breadcrumb |
| Button | Foundation | 145 | Button |
| ButtonGroup | Forms | 111 | ButtonGroup |
| Card | Layout | 125 | Card |
| Checkbox | Forms | 90 | Checkbox |
| CheckboxGroup | Forms | 76 | CheckboxGroup |
| ComboBox | Forms | 170 | ComboBox |
| ContentScoreBar | Data Display | 106 | ContentScoreBar |
| DatePicker | Forms | 307 | DatePicker |
| DateRangePicker | Forms | 307 | DateRangePicker |
| DateTimePicker | Forms | 307 | DatePicker |
| Drawer | Overlay | 118 | Drawer |
| DropdownMenu | Overlay | 120 | DropdownMenu |
| EmptyState | Feedback | 74 | EmptyState |
| FileInput | Forms | 270 | FileInput |
| Label | Typography | 47 | Label |
| Modal | Overlay | 146 | Modal |
| MultiSelect | Forms | 248 | MultiSelect |
| PageHeader | Layout | 85 | PageHeader |
| Pagination | Navigation | 150 | Pagination |
| Popconfirm | Overlay | 105 | Popconfirm |
| Popover | Overlay | 52 | Popover |
| Progress | Feedback | 125 | Progress |
| RadioGroup | Forms | 126 | RadioGroup |
| RangeSlider | Forms | 197 | RangeSlider |
| ScrollArea | Layout | 45 | ScrollArea |
| SearchBar | Forms | 85 | SearchBar |
| Select | Forms | 187 | Select |
| Separator | Layout | 47 | Separator |
| SkeletonAvatar | Feedback | 154 | Skeleton |
| SkeletonCard | Feedback | 154 | Skeleton |
| SkeletonLine | Feedback | 154 | Skeleton |
| SkeletonText | Feedback | 154 | Skeleton |
| Slider | Media | 234 | Slider |
| releaseStep | Media | 234 | Slider |
| Spinner | Feedback | 58 | Spinner |
| Switch | Forms | 110 | Toggle |
| Toggle | Forms | 110 | Toggle |
| TabButton | Navigation | 59 | TabButton |
| Table | Tables | 21 | Table |
| TagInput | Forms | 195 | TagInput |
| TabGroup | Navigation | 100 | TabGroup |
| Text | Typography | 73 | — (native-only) |
| StarRating | Forms | 110 | StarRating |
| StatCard | Data Display | 30 | StatCard |
| Statistic | Data Display | 71 | Statistic |
| Stepper | Navigation | 108 | Stepper |
| Tooltip | Overlay | 153 | Tooltip |
| Timeline | Data Display | 124 | Timeline |
| ViewToggle | Forms | 51 | ViewToggle |
| TimePicker | Forms | 143 | TimePicker |
| Toast | Feedback | 238 | Toast |
| ToastProvider | Feedback | 238 | Toast |
| ToastRegion | Feedback | 238 | Toast |
| Toaster | Feedback | 238 | Toast |
| getEffectiveDuration | Feedback | 238 | — (native-only) |
| toast | Feedback | 238 | — (native-only) |
| useToast | Hooks | 238 | — (native-only) |
| useToastStore | Hooks | 238 | — (native-only) |
| Textarea | Forms | 87 | Textarea |
| Input | Forms | 208 | Input |
| TextInput | Forms | 8 | Input |

Total library source: 6355 lines across 53 entry files (KuiReact's 52 shared components: 9881 lines in their entry files).
