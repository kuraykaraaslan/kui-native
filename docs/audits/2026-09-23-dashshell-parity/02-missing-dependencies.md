# DashShell parity · 02 · Missing dependencies

> KuiReact showcase content that KuiNative cannot reproduce without building a component it doesn't have. Per the parity brief, none of these were built, substituted or stubbed; they're recorded here and left out of the native showcase.

| KuiReact item | Where | Needs | Effect in KuiNative |
| --- | --- | --- | --- |
| ImageGallery page | Organisms → `image-gallery` | `ImageGallery` (`modules/app/ImageGallery`) | Page and nav item absent |
| Props Editor playground | 16 pages: alert-banner, avatar, badge, button, card, checkbox, empty-state, input, page-header, search-bar, select, skeleton, spinner, textarea, toggle, tooltip | `PropsEditor` (showcase playground) | Detail pages start straight at the first variant |
| Live Themes card | Home | 18 `app/theme/*` demo apps + screenshots | Card absent from Home |
| Domain — Common … Domain — NFT | 17 nav groups, 227 pages | `modules/domains/*` | Groups absent |
| App Concepts | 1 nav group, 37 pages | `modules/app/*` | Group absent |
| Themes | 1 nav group, 22 pages | `app/theme/*` | Group absent |
| Libraries | 1 nav group, 1 page (`kui-viewer`) | `kui-viewer` package | Group absent |

`npm run showcase:sync` re-reports anything in KuiReact's Atoms / Molecules / Organisms groups that has no native demo, so this list stays checkable.
