# 02 · KuiNative inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Full table: [phase-1-inventory/kui-native-components.md](phase-1-inventory/kui-native-components.md)

## Shape of KuiNative

- **Stack:** Expo SDK 56 (`expo ^56.0.9`, README still says SDK 55) · React Native 0.85 · React 19.2 · NativeWind 4 + Tailwind 3.4 · Font Awesome **6.7.2** · zustand · expo-image · reanimated 4 (installed, unused by the library).
- **Layers:** `modules/ui` only. No app layer, no domains, no providers.
- **Catalog:** 13 exports (Avatar, AvatarGroup, Badge, Button, Card, Checkbox, EmptyState, Modal, SkeletonCard, Spinner, Switch, Text, TextInput) + theme utilities in `libs/theme.ts`.
- **Quality infrastructure:** a Jest (`jest-expo`) + `@testing-library/react-native` harness is configured and verified (`jest.config.js`, `npm test`), with one passing suite (Spinner, 8 cases) as of this audit; still no ESLint config, no CI, no registry, no ADRs. A showcase app (Expo Router) with 12 entries is the only documentation besides the README.
- **Packaging:** not publishable (`private: true`, `main: expo-router/entry`).

## Components

| Component | Category | LOC | KuiReact counterpart |
| --- | --- | --- | --- |
| Avatar | Data Display | 84 | Avatar |
| AvatarGroup | Data Display | 84 | Avatar |
| Badge | Data Display | 40 | Badge |
| Button | Foundation | 90 | Button |
| Card | Layout | 47 | Card |
| Checkbox | Forms | 53 | Checkbox |
| EmptyState | Feedback | 50 | EmptyState |
| Modal | Overlay | 52 | Modal |
| SkeletonCard | Feedback | 39 | Skeleton |
| Spinner | Feedback | 58 | Spinner |
| Switch | Forms | 41 | Toggle |
| Text | Typography | 47 | — (native-only) |
| TextInput | Forms | 66 | Input |

Total library source: 667 lines across 12 files (KuiReact's equivalent 11 components: 1022 lines).
