# 02 · KuiNative inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Full table: [phase-1-inventory/kui-native-components.md](phase-1-inventory/kui-native-components.md)

## Shape of KuiNative

- **Stack:** Expo SDK 56 (`expo ^56.0.9`, README still says SDK 55) · React Native 0.85 · React 19.2 · NativeWind 4 + Tailwind 3.4 · Font Awesome **6.7.2** · zustand · expo-image · reanimated 4 (installed, unused by the library).
- **Layers:** `modules/ui` only. No app layer, no domains, no providers.
- **Catalog:** 35 exports (Avatar, AvatarGroup, Badge, Button, Card, Checkbox, EmptyState, Modal, SkeletonCard, Spinner, Switch, Text, TextInput) + theme utilities in `libs/theme.ts`.
- **Quality infrastructure:** a Jest (`jest-expo`) + `@testing-library/react-native` harness is configured and verified (`jest.config.js`, `npm test`), with one passing suite (Spinner, 8 cases) as of this audit; still no ESLint config, no CI, no registry, no ADRs. A showcase app (Expo Router) with 12 entries is the only documentation besides the README.
- **Packaging:** not publishable (`private: true`, `main: expo-router/entry`).

## Components

| Component | Category | LOC | KuiReact counterpart |
| --- | --- | --- | --- |
| AlertBanner | Feedback | 108 | AlertBanner |
| Avatar | Data Display | 165 | Avatar |
| AvatarGroup | Data Display | 165 | Avatar |
| Badge | Data Display | 119 | Badge |
| Button | Foundation | 145 | Button |
| Card | Layout | 125 | Card |
| Checkbox | Forms | 90 | Checkbox |
| Drawer | Overlay | 118 | Drawer |
| EmptyState | Feedback | 74 | EmptyState |
| Label | Typography | 47 | Label |
| Modal | Overlay | 146 | Modal |
| Progress | Feedback | 125 | Progress |
| RadioGroup | Forms | 126 | RadioGroup |
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
| Toast | Feedback | 238 | Toast |
| ToastProvider | Feedback | 238 | Toast |
| ToastRegion | Feedback | 238 | Toast |
| Toaster | Feedback | 238 | Toast |
| getEffectiveDuration |  | 238 | — (native-only) |
| toast |  | 238 | — (native-only) |
| useToast |  | 238 | — (native-only) |
| useToastStore |  | 238 | — (native-only) |
| Textarea | Forms | 87 | Textarea |
| Input | Forms | 208 | Input |
| TextInput | Forms | 8 | Input |

Total library source: 2658 lines across 12 files (KuiReact's equivalent 11 components: 2664 lines).
