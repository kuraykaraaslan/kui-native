# kui-native — Brand

The mark is generated, not drawn. [`libs/brand/geometry.ts`](../libs/brand/geometry.ts)
is the single source of truth; [`build.mjs`](build.mjs) writes every asset from it:

```
npm run brand
```

Never hand-edit a committed SVG or PNG — the next run overwrites it.
`libs/brand/geometry.test.ts` fails if the committed favicon drifts from the
geometry, or if the in-app mark picks up a hex literal.

## Construction

A "K" whose stem forks into two arms at **exactly 45 degrees**. The
construction is shared by every `@kuraykaraaslan/kui-*` package and is fixed by
`Brand_Positioning_Rules/logo-system.md`: 64-unit grid, stroke 7 (~10.9% of the
grid), round caps, rounded-square tile at radius 14 (~22%).

## Palette

| Role | Value | Why |
|---|---|---|
| first tone | `#3b82f6` | the family's `--primary` at blue-500 |
| second tone | `#f97316` | **the native kit** — the on-device runtime this kit targets, the React Native sibling of kui-react (violet) and kui-ejs (pink). Orange is the one hue no sibling already owns |
| tile | `#0f172a` | the family's dark ground |

In the app the mark colors from theme tokens (`primary`, `brand-native`,
`brand-tile` in `libs/theme.ts`); only the static assets use the hex above.

## Assets

| File | Purpose |
|---|---|
| [`mark.svg`](mark.svg) | app icon / avatar |
| [`wordmark.svg`](wordmark.svg) | lockup for light surfaces |
| [`wordmark-inverse.svg`](wordmark-inverse.svg) | lockup for dark surfaces |
| [`og-card.svg`](og-card.svg) | 1200×630 social card (source of `og-image.png`) |
| `../public/favicon.svg`, `favicon.png`, `apple-touch-icon.png` | web icons |
| `../public/og-image.png` | `og:image` / `twitter:image` |
| `../assets/icon.png` | native app icon (full-bleed; the OS rounds it) |
| `../assets/adaptive-icon.png` | Android adaptive foreground (tile = `backgroundColor`) |

Lockup rules: clear space on all sides equals half the mark's height; the mark
never appears under 16px with the wordmark attached — use the mark alone.
