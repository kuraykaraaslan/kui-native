// Web-only (imported from index.web.tsx). KuiReact's MapView/providers/leaflet.ts:
// leaflet + react-leaflet are imported lazily, so the static web export's
// Node pre-render never evaluates Leaflet (which touches `window`).

import type * as LeafletLib from "leaflet";
import type * as ReactLeaflet from "react-leaflet";

export type LeafletBundle = {
  MapContainer: typeof ReactLeaflet.MapContainer;
  TileLayer: typeof ReactLeaflet.TileLayer;
  Marker: typeof ReactLeaflet.Marker;
  Tooltip: typeof ReactLeaflet.Tooltip;
  Polygon: typeof ReactLeaflet.Polygon;
  Polyline: typeof ReactLeaflet.Polyline;
  useMap: typeof ReactLeaflet.useMap;
  useMapEvents: typeof ReactLeaflet.useMapEvents;
  L: typeof LeafletLib;
};

// CartoDB raster tiles — free, no API key; KuiReact's light / dark pair.
export const LEAFLET_TILES = {
  light: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
} as const;

let cached: Promise<LeafletBundle> | null = null;

export function loadLeaflet(): Promise<LeafletBundle> {
  if (cached) return cached;
  cached = (async () => {
    const [rl, leaflet] = await Promise.all([import("react-leaflet"), import("leaflet")]);
    return {
      MapContainer: rl.MapContainer,
      TileLayer: rl.TileLayer,
      Marker: rl.Marker,
      Tooltip: rl.Tooltip,
      Polygon: rl.Polygon,
      Polyline: rl.Polyline,
      useMap: rl.useMap,
      useMapEvents: rl.useMapEvents,
      L: ((leaflet as { default?: typeof LeafletLib }).default ?? leaflet) as typeof LeafletLib,
    };
  })();
  return cached;
}
