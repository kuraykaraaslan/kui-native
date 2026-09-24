// Web-only (imported from index.web.tsx): KuiReact's MapView renderer —
// parts/LeafletCanvas.tsx, Marker.tsx, Shapes.tsx and Popup.tsx — as DOM
// markup, since react-native-web renders through React DOM. Dark mode follows
// the showcase theme instead of KuiReact's `<html class="dark">` observer.

import { useEffect, useState } from "react";
import type * as LeafletLib from "leaflet";
import type * as ReactLeaflet from "react-leaflet";

import { useResolvedScheme } from "../../../../libs/theme";

import { VARIANT_FILL, VARIANT_HEX, markerSvg, type MapMarker, type MapRoute, type MapTooltipData, type MapZone } from "../types";
import { LEAFLET_TILES, loadLeaflet, type LeafletBundle } from "./leaflet";

type LeafletCanvasProps = {
  center: [number, number];
  zoom: number;
  markers: MapMarker[];
  zones: MapZone[];
  routes: MapRoute[];
  showZones: boolean;
  showRoutes: boolean;
  addMode: boolean;
  fitBoundsPadding?: number;
  onMapClick: (lat: number, lng: number) => void;
  onMarkerClick?: (id: string) => void;
};

/** KuiReact's "loading" placeholder, shown until Leaflet resolves. */
export function MapLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface-raised">
      <span className="text-sm text-text-secondary">Harita yükleniyor…</span>
    </div>
  );
}

export function LeafletCanvas(props: LeafletCanvasProps) {
  const [bundle, setBundle] = useState<LeafletBundle | null>(null);

  useEffect(() => {
    let alive = true;
    loadLeaflet().then((b) => {
      if (alive) setBundle(b);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!bundle) return <MapLoading />;
  return <InnerMap {...props} bundle={bundle} />;
}

function InnerMap({
  center,
  zoom,
  markers,
  zones,
  routes,
  showZones,
  showRoutes,
  addMode,
  fitBoundsPadding,
  onMapClick,
  onMarkerClick,
  bundle,
}: LeafletCanvasProps & { bundle: LeafletBundle }) {
  const { MapContainer, TileLayer, Marker, Tooltip, Polygon, Polyline, useMap, useMapEvents, L } = bundle;
  const isDark = useResolvedScheme() === "dark";
  const tiles = isDark ? LEAFLET_TILES.dark : LEAFLET_TILES.light;

  return (
    <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%" }} className={addMode ? "cursor-crosshair" : ""}>
      <TileLayer key={isDark ? "dark" : "light"} attribution={tiles.attribution} url={tiles.url} />
      <ClickHandler useMapEvents={useMapEvents} addMode={addMode} onMapClick={onMapClick} />
      <FitBounds useMap={useMap} L={L} markers={markers} padding={fitBoundsPadding} />
      {showZones && zones.map((zone) => <ZoneShape key={zone.id} zone={zone} Polygon={Polygon} Tooltip={Tooltip} />)}
      {showRoutes && routes.map((route) => <RouteShape key={route.id} route={route} Polyline={Polyline} Tooltip={Tooltip} />)}
      {markers.map((marker) => (
        <MarkerPart key={marker.id} marker={marker} L={L} RLMarker={Marker} RLTooltip={Tooltip} onMarkerClick={onMarkerClick} />
      ))}
    </MapContainer>
  );
}

function ClickHandler({
  useMapEvents,
  addMode,
  onMapClick,
}: {
  useMapEvents: LeafletBundle["useMapEvents"];
  addMode: boolean;
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e: { latlng: { lat: number; lng: number } }) {
      if (addMode) onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/** KuiReact's useFitBounds: fit the markers once, and again when their count changes. */
function FitBounds({
  useMap,
  L,
  markers,
  padding,
}: {
  useMap: LeafletBundle["useMap"];
  L: typeof LeafletLib;
  markers: MapMarker[];
  padding?: number;
}) {
  const map = useMap() as LeafletLib.Map;
  useEffect(() => {
    if (padding === undefined || !markers.length) return;
    const bounds = L.latLngBounds(markers.map((m) => m.position));
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [padding, padding] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, markers.length]);
  return null;
}

function MarkerPart({
  marker,
  L,
  RLMarker,
  RLTooltip,
  onMarkerClick,
}: {
  marker: MapMarker;
  L: typeof LeafletLib;
  RLMarker: typeof ReactLeaflet.Marker;
  RLTooltip: typeof ReactLeaflet.Tooltip;
  onMarkerClick?: (id: string) => void;
}) {
  const color = VARIANT_HEX[marker.variant ?? "primary"];
  const icon = L.divIcon({ html: markerSvg(color), className: "", iconSize: [24, 36], iconAnchor: [12, 36], tooltipAnchor: [0, -38] });
  // Leaflet's marker div is a focusable role="button" with no name unless `alt` is set.
  const accessibleName = marker.tooltip?.title ?? marker.label ?? "Map marker";
  return (
    <RLMarker position={marker.position} icon={icon} alt={accessibleName} eventHandlers={{ click: () => onMarkerClick?.(marker.id) }}>
      {marker.tooltip ? (
        <RLTooltip>
          <Popup tooltip={marker.tooltip} />
        </RLTooltip>
      ) : marker.label ? (
        <RLTooltip>
          <span style={{ fontSize: 12, fontWeight: 600 }}>{marker.label}</span>
        </RLTooltip>
      ) : null}
    </RLMarker>
  );
}

function ZoneShape({ zone, Polygon, Tooltip }: { zone: MapZone; Polygon: typeof ReactLeaflet.Polygon; Tooltip: typeof ReactLeaflet.Tooltip }) {
  const variant = zone.variant ?? "primary";
  const strokeColor = VARIANT_HEX[variant];
  return (
    <Polygon
      positions={zone.positions}
      pathOptions={{ color: strokeColor, fillColor: VARIANT_FILL[variant], fillOpacity: zone.fillOpacity ?? 0.25, weight: 2 }}
    >
      {zone.label ? (
        <Tooltip sticky>
          <span style={{ fontWeight: 600, fontSize: 12, color: strokeColor }}>{zone.label}</span>
        </Tooltip>
      ) : null}
    </Polygon>
  );
}

function RouteShape({ route, Polyline, Tooltip }: { route: MapRoute; Polyline: typeof ReactLeaflet.Polyline; Tooltip: typeof ReactLeaflet.Tooltip }) {
  return (
    <Polyline
      positions={route.positions}
      pathOptions={{ color: route.color ?? VARIANT_HEX.primary, weight: route.weight ?? 3, dashArray: route.dashed ? "8 6" : undefined }}
    >
      {route.label ? (
        <Tooltip sticky>
          <span style={{ fontWeight: 600, fontSize: 12 }}>{route.label}</span>
        </Tooltip>
      ) : null}
    </Polyline>
  );
}

/** KuiReact's marker tooltip body (inline styles, as Leaflet hoists it out of the app tree). */
function Popup({ tooltip }: { tooltip: MapTooltipData }) {
  const hasMeta = Boolean(tooltip.description) || Boolean(tooltip.fields?.length);
  return (
    <div style={{ minWidth: 130, maxWidth: 220 }}>
      <p style={{ fontWeight: 600, fontSize: 13, color: "#111827", marginBottom: hasMeta ? 3 : 0 }}>{tooltip.title}</p>
      {tooltip.description ? (
        <p style={{ fontSize: 11, color: "#6b7280", marginBottom: tooltip.fields?.length ? 4 : 0, lineHeight: 1.4 }}>{tooltip.description}</p>
      ) : null}
      {tooltip.fields && tooltip.fields.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 2 }}>
          <tbody>
            {tooltip.fields.map((f, i) => (
              <tr key={i}>
                <td style={{ fontSize: 11, color: "#6b7280", paddingRight: 6, paddingTop: 1, whiteSpace: "nowrap" }}>{f.label}</td>
                <td style={{ fontSize: 11, color: "#111827", fontWeight: 500, paddingTop: 1 }}>{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
