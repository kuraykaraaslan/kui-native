# Design differences

## D1 — Colour tokens: full parity ✓
All 33 semantic colour tokens (`primary*`, `secondary*`, `surface-*`, `text-*`, `border*`, `success/warning/error/info` + `-subtle`/`-fg`) have identical names **and** identical light and dark values in `kui-react/app/globals.css` and `KUInative/libs/theme.ts` (verified programmatically, 0 mismatches). `global.css` in KuiNative duplicates the light values as fallbacks. This is the strongest parity area.

Risk: values are hand-copied in three places (KuiReact `globals.css`, KuiNative `libs/theme.ts`, KuiNative `global.css`). KuiReact's phase-4 plan (`@kuraykaraaslan/kui-tokens`) should become KuiNative's source too.

## D2 — Typography: diverges
| Aspect | KuiReact | KuiNative |
| --- | --- | --- |
| Family | Geist / Geist Mono | OS system font (README incorrectly says KuiReact uses Inter) |
| Heading weights | semibold/bold classes | none — headings render regular weight on iOS/web (bug) |
| Component titles | `text-sm font-semibold` (Card, EmptyState), `text-base font-semibold` (Modal) | `text-lg` (Card, EmptyState), `text-xl` (Modal) |
| Field text | `text-sm` | `text-base` (TextInput) |
| Button weight | `font-medium` | `font-semibold` |

## D3 — Radius
| Component | KuiReact | KuiNative |
| --- | --- | --- |
| Button | `rounded-md` | `rounded-lg` |
| Input | `rounded-md` | `rounded-lg` |
| Modal | `rounded-xl` | `rounded-2xl` |
| Card, Badge, Avatar | same | same |

KuiNative is systematically one step rounder on interactive controls.

## D4 — Spacing
| Component | KuiReact | KuiNative |
| --- | --- | --- |
| Button md / lg | `py-2` / `py-2.5` | `py-2.5` / `py-3` |
| Input | `py-2` | `py-2.5` |
| Card | sections `px-6 py-4`, footer `py-3` | `p-4`, footer inside padding |
| Modal | sections `px-6 py-4` | `p-5` |
| EmptyState | `py-16`, icon 48 px | `py-12`, icon 56 px |
| SkeletonCard | `p-6` | `p-4` |
| Checkbox gap | `gap-3` | `gap-2` |

## D5 — Shadows / elevation
KuiReact: Card raised `shadow-sm` (+ `hover:shadow-md`), Modal `shadow-xl`, Toggle thumb `shadow-sm`. KuiNative: **no shadow on any component**. NativeWind supports `shadow-*` on iOS; Android needs `elevation`. A shadow token strategy is required (R-shadow).

## D6 — Interaction colours
KuiReact uses `primary-hover`, `secondary-hover`, `surface-overlay` for hover and `ring-border-focus` for focus. KuiNative uses `active:opacity-80` uniformly and has no focus style; the `*-hover`/`*-active` tokens exist in the theme but no component consumes them.

## D7 — Motion
| Component | KuiReact | KuiNative |
| --- | --- | --- |
| Modal | fade + scale 95→100 %, 200 ms, animated exit (250 ms `usePresence`) | OS `fade` |
| Skeleton | `animate-pulse` 2 s, opacity 1→0.5 | 1.4 s, opacity 0.3↔1 |
| Toggle | 200 ms colour + translate | OS switch animation |
| Spinner | CSS rotate two-tone ring | OS ActivityIndicator |
No motion tokens exist in either repo; KuiNative installs Reanimated 4 but no component uses it.

## D8 — Component anatomy
Card and Modal in KuiReact are sectioned (header/body/footer with dividers); KuiNative renders one padded box. This is the most visible difference when the two libraries are side by side.

## D9 — Icons
Both use Font Awesome, but KuiReact requires **v7** (peer `>=7`) and KuiNative pins **6.7.2** (`@fortawesome/*` `^6.7.2`). ADR 0003 names icon-set version alignment as a parity requirement because glyphs change between majors.

## D10 — Native OS controls vs KuiReact custom rendering
`Switch` and `Spinner` delegate to OS controls, so they look different on iOS vs Android and from KuiReact. This is a legitimate product choice but must be explicit: either custom-render to KuiReact's look (recommended for Spinner, optional for Toggle) or record an exception.

Per-component tables: [feature-matrix/](../feature-matrix/README.md).
