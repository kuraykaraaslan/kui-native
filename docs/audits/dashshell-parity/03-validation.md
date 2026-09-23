# DashShell parity · 03 · Validation

> 2026-09-23. Both showcases run on the web at 1440×900 and 390×844 in Chromium (Playwright), KuiReact's Next dev server against KuiNative's `expo export` build, light and dark.

## Method

1. **Shell and page chrome:** full-viewport screenshots, plus element boxes read from the DOM of both apps. Covers the header, sidebar, collapsed rail, mobile drawer, Home, detail header, the Side / Stack / Grid layouts and the 404.
2. **Every variant card** on the 62 shared pages (222 cards): element screenshots via `data-variant-index`, with animations frozen. Each pair is scored on size delta and the share of pixels differing by more than 40/255. A card passes at ±2 px and < 2 % differing.

## Result

| Round | Cards passing |
| --- | --- |
| After the shell rebuild | 145 / 222 |
| After demo + component fixes | 217 / 222 |
| After Font Awesome 7, web Leaflet map, text wrapping | **220 / 222** |

Remaining: data-table · Server mode and alert-banner · With CTA action, at 2.1–2.2 % differing pixels with identical box sizes. The cause is text rasterisation: the same Geist face, size and weight lays out a few pixels wider in KuiReact's Next.js build (e.g. "Upgrade now" is 82 px there, 75 px here), not layout.

What closed the last gaps:

- **Font Awesome 7.** KuiReact is on v7, so KuiNative moved to v7 too (`@fortawesome/react-native-fontawesome` 1.0), which gives the same glyph shapes.
- **Icon boxes.** On the web FA draws a 1em glyph in a 1.25em-wide box. RN fits each glyph into a size × size square, so wide or square glyphs are sized up to match (AlertBanner, SearchBar).
- **Web text wrapping.** react-native-web's `overflow-wrap: break-word` is reset to the browser default (`global.css`), so words don't split mid-word ("128|4").
- **Web MapView.** It renders KuiReact's Leaflet map (react-leaflet, CartoDB tiles) instead of a notice; iOS and Android keep react-native-maps.

## Checklist (all 62 pages)

| Check | Status |
| --- | --- |
| Page exists in both | ✓ 62 / 63 — ImageGallery is a missing dependency ([02](02-missing-dependencies.md)) |
| Navigation, section, example order | ✓ generated from KuiReact; enforced by `showcase.generated.test.ts` |
| Component order and content | ✓ every demo re-read against KuiReact's `preview` JSX |
| Layout, spacing, borders, radius, shadows | ✓ within tolerance on 220 / 222 cards |
| Typography | ✓ Geist / Geist Mono on web, including text inputs and `font-mono` |
| Colours, states, dark mode | ✓ same tokens; header, rail and cards checked in dark |
| Responsive | ✓ `sm` / `md` / `lg` / `xl` breakpoints mirrored (drawer below 1024, stacked panes below 640, 2-col grid at 1280) |
| No extra demos | ✓ the native-only `Text` page is gone |
| Props Editor | ✗ missing dependency on 16 pages |

## Deliberate content differences

- **Home:** same structure and styles as KuiReact's HomePanel. The text states KuiNative's own stack, scripts and module layers; KuiReact's (Next.js, `modules/domain/`, …) would be false here. Live Themes is absent (missing dependency).
- **Code panes** show KuiReact's snippets verbatim; 28 of 226 contain web tags such as `<div>` and `<p>`.
- **Source block** shows the KuiNative component file for each page, kept current by `showcase.generated.test.ts`.
- **Native-only platforms** (iOS / Android) weren't screenshot-compared. The system font is used there (Geist isn't bundled).

## Re-running

```sh
KUI_REACT=/path/to/kui-react npm run showcase:sync   # nav, copy, code panes, frames, Source
npx jest modules/showcase                             # parity contract
```
