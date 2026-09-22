# Feature matrix — MapView

> KuiReact `modules/ui/MapView/` (14 files, 796 LOC: `index.tsx`, `types.ts`, `hooks/` useAutoMarkers, useDarkMode, useFitBounds, useInViewport, `parts/` LeafletCanvas, Marker, Popup, Shapes, Toolbar, `providers/` leaflet + mapbox / google stubs; Leaflet + react-leaflet; 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/MapView/` (added 2026-09-22 in `8a03aa8`: `index.tsx` on `react-native-maps`, `index.web.tsx` fallback, `types.ts` and `hooks/useAutoMarkers` ported unchanged, `parts/` Popup + Toolbar; 7 tests, 3 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `center` (default Ankara), `zoom` (6), `markers`, `zones`, `routes`, `fitBoundsPadding`, `onMarkerAdd`, `onMarkerClick`, `height` (480), `className` | ✓ | ✓ | Match |
| `provider` (`leaflet` default; `mapbox` / `google` adapters throw "not yet implemented"), `apiKey` | ✓ | accepted in the type, unused (one native renderer) | Match (only Leaflet works in KuiReact) |
| Types (`MapMarker`, `MapZone`, `MapRoute`, `MapTooltipData`, `MapVariant`, `MapBounds`, …) and colour tables (`VARIANT_HEX`, `VARIANT_FILL`) | ✓ | same file; types exported from the barrel | Match |
| Renderer | Leaflet with CartoDB Voyager / Dark Matter raster tiles, switched by dark mode (`useDarkMode`) | `react-native-maps` with the same CartoDB tiles replacing the base map (`mapType="none"`), switched by the resolved colour scheme | Match (adapted) |
| Web | Leaflet in the browser | `index.web.tsx`: same card shell with "The interactive map runs in the iOS and Android apps." and marker / zone / route counts (`react-native-maps` has no web build) | Gap: no interactive map in KuiNative's web build |
| Shell and toolbar | `Card` raised, edge-to-edge map, toolbar with add-marker toggle and zone / route visibility toggles (Turkish copy) | same, copy verbatim | Match |
| Markers | SVG pin per variant colour, popup with title / description / fields on click, `onMarkerClick` | same pin (`react-native-svg`), popup body in a native callout on tap, `onMarkerClick` | Match (adapted) |
| Zones / routes | polygons (`VARIANT_HEX` stroke, `VARIANT_FILL` + `fillOpacity`), polylines (colour, weight, dashed), label tooltips on hover | same shapes (fill and opacity combined into one colour), labels exposed as accessibility labels | Adapted (no hover on touch) |
| Tap-to-add | add mode: map click drops a marker (`useAutoMarkers`) and calls `onMarkerAdd`; mode ends | same | Match |
| Fit to markers | `useFitBounds` when `fitBoundsPadding` is set, refit on marker-count change | `fitToCoordinates` with the same padding and trigger | Match (adapted) |
| Lazy mount | `IntersectionObserver` (`useInViewport`) delays Leaflet until visible | mounts directly | N/A (no lazy loading needed for the native map) |
| Accessibility | Leaflet defaults, `aria-label`s on toolbar buttons | labelled toolbar buttons, markers labelled by tooltip title / label, zones and routes by label | Match (adapted) |
| Setup | none (tiles over HTTP) | Android release builds need a Google Maps API key in `app.json` | Differs (platform requirement) |
| Tests | 0 | 7 | Native-ahead |
| Showcase | Tam özellik — işaretçi + zone + rota, Tıkla-ekle işaretçi modu, Yalnız zone ve rota | same titles and data | Match |
