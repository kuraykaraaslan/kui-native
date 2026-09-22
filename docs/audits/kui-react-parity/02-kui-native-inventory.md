# 02 · KuiNative inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Full table: [phase-1-inventory/kui-native-components.md](phase-1-inventory/kui-native-components.md)

## Shape of KuiNative

- **Stack:** Expo SDK 56 (`expo ^56.0.9`, README still says SDK 55) · React Native 0.85 · React 19.2 · NativeWind 4 + Tailwind 3.4 · Font Awesome **6.7.2** · zustand · expo-image · reanimated 4 (installed, unused by the library).
- **Layers:** `modules/ui` only. No app layer, no domains, no providers.
- **Catalog:** 23 exports (Avatar, AvatarGroup, Badge, Button, Card, Checkbox, EmptyState, Modal, SkeletonCard, Spinner, Switch, Text, TextInput) + theme utilities in `libs/theme.ts`.
- **Quality infrastructure:** a Jest (`jest-expo`) + `@testing-library/react-native` harness is configured and verified (`jest.config.js`, `npm test`), with one passing suite (Spinner, 8 cases) as of this audit; still no ESLint config, no CI, no registry, no ADRs. A showcase app (Expo Router) with 12 entries is the only documentation besides the README.
- **Packaging:** not publishable (`private: true`, `main: expo-router/entry`).

## Components

| Component | Category | LOC | KuiReact counterpart |
| --- | --- | --- | --- |
| AlertBanner | Feedback | 108 | AlertBanner |
| Avatar | Data Display | 128 | Avatar |
| AvatarGroup | Data Display | 128 | Avatar |
| Badge | Data Display | 40 | Badge |
| Button | Foundation | 100 | Button |
| Card | Layout | 74 | Card |
| Checkbox | Forms | 60 | Checkbox |
| EmptyState | Feedback | 74 | EmptyState |
| Label | Typography | 48 | Label |
| Modal | Overlay | 199 | Modal |
| Progress | Feedback | 125 | Progress |
| RadioGroup | Forms | 126 | RadioGroup |
| Separator | Layout | 47 | Separator |
| SkeletonAvatar | Feedback | 154 | Skeleton |
| SkeletonCard | Feedback | 154 | Skeleton |
| SkeletonLine | Feedback | 154 | Skeleton |
| SkeletonText | Feedback | 154 | Skeleton |
| Spinner | Feedback | 58 | Spinner |
| Switch | Forms | 97 | Toggle |
| TabGroup | Navigation | 100 | TabGroup |
| Text | Typography | 63 | — (native-only) |
| Textarea | Forms | 87 | Textarea |
| TextInput | Forms | 72 | Input |

Total library source: 1760 lines across 12 files (KuiReact's equivalent 11 components: 1585 lines).
