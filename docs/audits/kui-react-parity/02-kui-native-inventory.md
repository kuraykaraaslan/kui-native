# 02 · KuiNative inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Full table: [phase-1-inventory/kui-native-components.md](phase-1-inventory/kui-native-components.md)

## Shape of KuiNative

- **Stack:** Expo SDK 56 (`expo ^56.0.9`, README still says SDK 55) · React Native 0.85 · React 19.2 · NativeWind 4 + Tailwind 3.4 · Font Awesome **6.7.2** · zustand · expo-image · reanimated 4 (installed, unused by the library).
- **Layers:** `modules/ui` only. No app layer, no domains, no providers.
- **Catalog:** 48 exports from 36 component modules (Accordion, AlertBanner, Avatar, AvatarGroup, Badge, Breadcrumb, Button, ButtonGroup, Card, Checkbox, CheckboxGroup, Drawer, DropdownMenu, EmptyState, Label, Modal, MultiSelect, PageHeader, Pagination, Popover, Progress, RadioGroup, RangeSlider, SearchBar, Select, Separator, SkeletonAvatar, SkeletonCard, SkeletonLine, SkeletonText, Spinner, Switch, Toggle, TabGroup, Text, Stepper, Tooltip, Toast, ToastProvider, ToastRegion, Toaster, Textarea, Input, TextInput, plus the `toast()` API and its hooks) + theme utilities in `libs/theme.ts`.
- **Quality infrastructure:** a Jest (`jest-expo`) + `@testing-library/react-native` harness (`jest.config.js`, `npm test`) with 35 test files (330 static `it` / `test` blocks) at commit `0770214`; still no ESLint config, no CI, no registry, no ADRs. A showcase app (Expo Router) with 35 entries, 1:1 with KuiReact showcase variants, is the only documentation besides the README.
- **Packaging:** not publishable (`private: true`, `main: expo-router/entry`).

## Components

| Component | Category | LOC | KuiReact counterpart |
| --- | --- | --- | --- |
| Accordion | Data Display | 139 | Accordion |
| AlertBanner | Feedback | 108 | AlertBanner |
| Avatar | Data Display | 165 | Avatar |
| AvatarGroup | Data Display | 165 | Avatar |
| Badge | Data Display | 119 | Badge |
| Breadcrumb | Navigation | 86 | Breadcrumb |
| Button | Foundation | 145 | Button |
| ButtonGroup | Forms | 111 | ButtonGroup |
| Card | Layout | 125 | Card |
| Checkbox | Forms | 90 | Checkbox |
| CheckboxGroup | Forms | 76 | CheckboxGroup |
| Drawer | Overlay | 118 | Drawer |
| DropdownMenu | Overlay | 111 | DropdownMenu |
| EmptyState | Feedback | 74 | EmptyState |
| Label | Typography | 47 | Label |
| Modal | Overlay | 146 | Modal |
| MultiSelect | Forms | 246 | MultiSelect |
| PageHeader | Layout | 85 | PageHeader |
| Pagination | Navigation | 150 | Pagination |
| Popover | Overlay | 52 | Popover |
| Progress | Feedback | 125 | Progress |
| RadioGroup | Forms | 126 | RadioGroup |
| RangeSlider | Forms | 197 | RangeSlider |
| SearchBar | Forms | 85 | SearchBar |
| Select | Forms | 187 | Select |
| Separator | Layout | 47 | Separator |
| SkeletonAvatar | Feedback | 154 | Skeleton |
| SkeletonCard | Feedback | 154 | Skeleton |
| SkeletonLine | Feedback | 154 | Skeleton |
| SkeletonText | Feedback | 154 | Skeleton |
| Spinner | Feedback | 58 | Spinner |
| Switch | Forms | 110 | Toggle |
| Toggle | Forms | 110 | Toggle |
| TabGroup | Navigation | 100 | TabGroup |
| Text | Typography | 73 | — (native-only) |
| Stepper | Navigation | 108 | Stepper |
| Tooltip | Overlay | 153 | Tooltip |
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

Total library source: 4257 lines across 36 entry files (KuiReact's 34 shared components: 4130 lines in their entry files).
