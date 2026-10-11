# 02 · KuiNative inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Full table: [phase-1-inventory/kui-native-components.md](phase-1-inventory/kui-native-components.md)

## Shape of KuiNative

- **Stack:** Expo SDK 56 (`expo ^56.0.9`, README still says SDK 55) · React Native 0.85 · React 19.2 · NativeWind 4 + Tailwind 3.4 · Font Awesome **6.7.2** · zustand · expo-image · reanimated 4 (installed, unused by the library).
- **Layers:** `modules/ui` only. No app layer, no domains, no providers.
- **Catalog:** 86 exports from 60 component modules (Accordion, AlertBanner, Avatar, AvatarGroup, Badge, BrandLogo, Breadcrumb, BulkActionTable, Button, ButtonGroup, Card, AreaChart, BarChart, DonutChart, LineChart, PieChart, ScatterChart, SparkLine, Checkbox, CheckboxGroup, ColorPicker, DEFAULT_COLOR_SWATCHES, ComboBox, ContentScoreBar, DatePicker, DateRangePicker, DateTimePicker, DiffViewer, Drawer, DropdownMenu, EmptyState, FileInput, Label, MapView, Modal, MultiSelect, PageHeader, Pagination, Popconfirm, Popover, Progress, RadioGroup, RangeSlider, ScrollArea, SearchBar, Select, Separator, SkeletonAvatar, SkeletonCard, SkeletonLine, SkeletonText, Slider, Spinner, Switch, Toggle, TabButton, AdvancedDataTable, DataTable, Table, TagInput, TabGroup, Text, StarRating, StatCard, Statistic, Stepper, Tooltip, Timeline, TreeView, VideoPlayer, ViewToggle, TimePicker, Toast, ToastProvider, ToastRegion, Toaster, Textarea, Input, TextInput, plus the `toast()` API and its hooks) + theme utilities in `libs/theme.ts`.
- **Quality infrastructure:** a Jest (`jest-expo`) + `@testing-library/react-native` harness (`jest.config.js`, `npm test`) with 62 test files (517 static `it` / `test` blocks) at commit `3d2d0f9`; still no ESLint config, no CI, no registry, no ADRs. A showcase app (Expo Router) with 62 entries, 1:1 with KuiReact showcase variants, is the only documentation besides the README.
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
| BulkActionTable | Tables | 157 | BulkActionTable |
| Button | Foundation | 145 | Button |
| ButtonGroup | Forms | 111 | ButtonGroup |
| Card | Layout | 125 | Card |
| AreaChart | Charts | 20 | Chart |
| BarChart | Charts | 20 | Chart |
| DonutChart | Charts | 20 | Chart |
| LineChart | Charts | 20 | Chart |
| PieChart | Charts | 20 | Chart |
| ScatterChart | Charts | 20 | Chart |
| SparkLine | Charts | 20 | Chart |
| Checkbox | Forms | 90 | Checkbox |
| CheckboxGroup | Forms | 76 | CheckboxGroup |
| ColorPicker | Forms | 238 | ColorPicker |
| DEFAULT_COLOR_SWATCHES | Forms | 238 | ColorPicker |
| ComboBox | Forms | 170 | ComboBox |
| ContentScoreBar | Data Display | 106 | ContentScoreBar |
| DatePicker | Forms | 307 | DatePicker |
| DateRangePicker | Forms | 307 | DateRangePicker |
| DateTimePicker | Forms | 307 | DatePicker |
| DiffViewer | Advanced Components | 175 | DiffViewer |
| Drawer | Overlay | 118 | Drawer |
| DropdownMenu | Overlay | 120 | DropdownMenu |
| EmptyState | Feedback | 74 | EmptyState |
| FileInput | Forms | 270 | FileInput |
| Label | Typography | 47 | Label |
| MapView | Media | 186 | MapView |
| Modal | Overlay | 146 | Modal |
| MultiSelect | Forms | 248 | MultiSelect |
| PageHeader | Layout | 85 | PageHeader |
| Pagination | Navigation | 150 | Pagination |
| Popconfirm | Overlay | 111 | Popconfirm |
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
| AdvancedDataTable | Tables | 31 | AdvancedDataTable |
| DataTable | Tables | 31 | DataTable |
| Table | Tables | 31 | Table |
| useServerTable | Hooks | 31 | DataTable |
| useTable | Hooks | 31 | DataTable |
| TagInput | Forms | 202 | TagInput |
| TabGroup | Navigation | 100 | TabGroup |
| Text | Typography | 73 | — (native-only) |
| StarRating | Forms | 110 | StarRating |
| StatCard | Data Display | 30 | StatCard |
| Statistic | Data Display | 71 | Statistic |
| Stepper | Navigation | 108 | Stepper |
| Tooltip | Overlay | 153 | Tooltip |
| Timeline | Data Display | 124 | Timeline |
| TreeView | Data Display | 115 | TreeView |
| VideoPlayer | Media | 248 | VideoPlayer |
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

Total library source: 7517 lines across 60 entry files (KuiReact's 61 shared components: 19932 lines in their entry files).
