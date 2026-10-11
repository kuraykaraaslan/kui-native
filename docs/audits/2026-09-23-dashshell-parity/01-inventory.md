# DashShell parity · 01 · Inventory and comparison

> 2026-09-23. Source of truth: `kui-react` (`modules/showcase/data/showcase.menu.ts`, `public/registry/components.json` generated 2026-09-18, no showcase-data commits since). "DashShell" is KuiReact's `ShowcaseShell`: `AppShell` + `AppSidebar` + `AppTopBar` around `HomePanel` (`/`) and `ShowcaseDetail` (`/<slug>`).

## KuiReact

**Shell.** Aside `lg:w-56` / rail `lg:w-14` with an `h-14` brand bar; drawer `w-72` below `lg`. Header `h-14 px-4 border-b bg-surface-raised/90`, burger `lg:hidden`, then `ml-auto` cluster: LayoutSwitcher (side / stack / grid), GithubButton, ThemeSwitcher (Light / Dark / System dropdown), UserMenu (avatar only). Main `p-4 sm:p-6`, scrolls.

**Navigation.** 23 groups, 331 items. The label-less Home item first, then:

| Group | Items | Backed by `modules/ui` |
| --- | --- | --- |
| Atoms | 14 | yes |
| Molecules | 21 | yes |
| Organisms | 28 | yes (ImageGallery lives in `modules/app`) |
| Domain — Common … Domain — NFT (17 groups) | 227 | no — `modules/domains/*` |
| App Concepts | 37 | no — `modules/app/*` |
| Themes | 22 | no — `app/theme/*` |
| Libraries | 1 | no — `kui-viewer` |

**Detail page (`ShowcaseDetail`).** Title `h2 text-2xl font-bold` + category pill, description `text-sm max-w-2xl` (`mb-2` block) → optional PropsEditor playground → variants `grid gap-4` (`xl:grid-cols-2` in grid mode) → Source block (`mt-6`, collapsed). Each variant is a `rounded-xl` card: Widget header (`⠿`, title, Copy, fullscreen) → PREVIEW strip + dot-grid canvas (`px-6 py-8`, `min-h-28` side / `min-h-40` stack) | resize handle | CODE pane (`bg-surface-sunken`, `text-sm font-mono leading-relaxed`). Side layout: preview 40 % / code 60 % at `sm+`, stacked below `sm`.

**Home (`HomePanel`).** `max-w-4xl mx-auto py-10 px-2`: hero (mark `w-10`, `text-2xl` name, tagline, blurb) → Quick Start | Scripts (`md:grid-cols-2`) → Tech Stack (`grid-cols-2 sm:grid-cols-4`) → Module Layers (+ footnote) → Live Themes (18 screenshot cards) → footer (author link · 0BSD, GithubButton).

## KuiNative (before this pass)

- **Shell.** Sidebar/drawer chrome already ported 1:1, but groups were `Atoms / Forms / Feedback / Overlays` in native order, each screen drew its own header with a page title and a round theme-cycle button, and routes were `/component/<id>`.
- **Navigation.** 63 items: the 62 in-scope KuiReact pages + native-only `Text`. Five abbreviations differed (`select`, `combo-box` and others).
- **Detail page.** Category `Badge`, description, one `usage` code block, then per variant a label + `rounded-2xl p-5` box. No Widget header, preview/code panes, layout switcher or Source block.
- **Home.** Stacked cards, a "Library" category grid (not in KuiReact), no Live Themes.

## Differences

| Area | Difference | Resolution |
| --- | --- | --- |
| Pages | `image-gallery` missing | Missing dependency (no ImageGallery component) |
| Pages | `text` extra | Removed from the showcase (the `Text` component stays) |
| Pages | 268 Domain / App / Themes / Libraries pages missing | Missing dependencies (no counterparts) |
| Grouping | Atoms/Forms/Feedback/Overlays vs Atoms/Molecules/Organisms | Take KuiReact's groups, order, titles and abbreviations |
| Examples | Skeleton lacks "Table rows", "Dashboard layout" | Added (SkeletonTableRow exists) |
| Examples | FileInput lacks "Paste from clipboard" | Added (`enablePaste` is accepted) |
| Examples | All other 59 pages | Same titles, same order |
| Content | Native descriptions paraphrased | Take KuiReact's descriptions and per-variant code |
| Composition | Detail page structure | Rebuilt to ShowcaseDetail |
| Composition | PropsEditor playground on 16 pages | Missing dependency (no PropsEditor in KuiNative) |
| Chrome | Top bar | Rebuilt to AppTopBar's cluster |
| Home | Library card extra, Live Themes missing | Library removed; Live Themes is a missing dependency |
