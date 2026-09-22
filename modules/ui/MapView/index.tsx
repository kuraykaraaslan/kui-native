// MapView — provider-agnostic interactive map, ported from KuiReact's
// modules/ui/MapView (M1). KuiReact renders Leaflet with CartoDB tiles;
// on native this uses react-native-maps with the same CartoDB tiles
// (light / dark by colour scheme) over the platform map, the same pin,
// zone and route styling (VARIANT_HEX / VARIANT_FILL), fit-to-markers,
// tap-to-add markers (useAutoMarkers, KuiReact's) and marker callouts.
//
// RN notes: KuiReact's IntersectionObserver lazy mount isn't needed (the
// native map mounts cheaply); zone / route hover labels have no touch
// equivalent and are exposed as accessibility labels. On web, see
// index.web.tsx. Android release builds need a Google Maps API key
// (app.json `android.config.googleMaps.apiKey`).

import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Maps, { Callout, Marker, Polygon, Polyline, UrlTile, type MapPressEvent } from "react-native-maps";
import Svg, { Circle, Path } from "react-native-svg";

import { useResolvedScheme } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Card } from "../Card";
import { useAutoMarkers } from "./hooks/useAutoMarkers";
import { Popup } from "./parts/Popup";
import { Toolbar } from "./parts/Toolbar";
import { VARIANT_FILL, VARIANT_HEX, type MapViewProps } from "./types";

export type { MapVariant, MapTooltipField, MapTooltipData, MapMarker, MapZone, MapRoute, MapBounds, MapProviderId, MapViewProps } from "./types";
export { VARIANT_HEX, VARIANT_FILL } from "./types";

// KuiReact's CartoDB raster tiles (react-native-maps has no {s}/{r} tokens).
export const MAP_TILES = {
  light: "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
  dark: "https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png",
} as const;

/** Zoom level → latitude span (react-native-maps regions are span-based). */
export function zoomToDelta(zoom: number): number {
  return 360 / 2 ** zoom;
}

/** KuiReact passes a translucent fill plus fillOpacity; RN has one fill colour, so they're combined. */
export function combinedFill(hexWithAlpha: string, fillOpacity: number): string {
  const base = hexWithAlpha.slice(0, 7);
  const alpha = hexWithAlpha.length === 9 ? parseInt(hexWithAlpha.slice(7), 16) / 255 : 1;
  const a = Math.round(Math.min(1, alpha * fillOpacity) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${base}${a}`;
}

// KuiReact's markerSvg pin: a 24×36 drop pin with a white dot.
function Pin({ color }: { color: string }) {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36">
      <Path d="M12 0C5.373 0 0 5.373 0 12c0 3.143 1.204 5.997 3.17 8.126L12 36l8.83-15.874A11.945 11.945 0 0 0 24 12C24 5.373 18.627 0 12 0z" fill={color} />
      <Circle cx={12} cy={12} r={4.5} fill="white" opacity={0.9} />
    </Svg>
  );
}

export function MapView({
  center = [39.9334, 32.8597],
  zoom = 6,
  markers = [],
  zones = [],
  routes = [],
  fitBoundsPadding,
  onMarkerAdd,
  onMarkerClick,
  height = 480,
  className,
}: MapViewProps) {
  const scheme = useResolvedScheme();
  const mapRef = useRef<Maps>(null);
  const [addMode, setAddMode] = useState(false);
  const [showZones, setShowZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const { extras, handleMapClick } = useAutoMarkers(onMarkerAdd);
  const allMarkers = [...markers, ...extras];

  const onMapPress = useCallback(
    (e: MapPressEvent) => {
      if (!addMode) return;
      const { latitude, longitude } = e.nativeEvent.coordinate;
      handleMapClick(latitude, longitude);
      setAddMode(false);
    },
    [addMode, handleMapClick],
  );

  // KuiReact's useFitBounds: refit when the marker count changes (not on every re-render).
  const fit = useCallback(() => {
    if (fitBoundsPadding === undefined || !allMarkers.length) return;
    const p = fitBoundsPadding;
    mapRef.current?.fitToCoordinates(
      allMarkers.map((m) => ({ latitude: m.position[0], longitude: m.position[1] })),
      { edgePadding: { top: p, right: p, bottom: p, left: p }, animated: false },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitBoundsPadding, allMarkers.length]);
  useEffect(fit, [fit]);

  const numericHeight = typeof height === "number" ? height : parseInt(height, 10) || 480;
  const delta = zoomToDelta(zoom);

  return (
    <Card variant="raised" className={cn("overflow-hidden", className)}>
      {/* Card adds px-6 py-4; KuiReact cancels it so toolbar + map run edge to edge. */}
      <View className="-mx-6 -my-4 flex-col">
        <View className="border-b border-border bg-surface-raised px-4 py-2.5">
          <Toolbar
            addMode={addMode}
            onToggleAddMode={() => setAddMode((v) => !v)}
            hasZones={zones.length > 0}
            showZones={showZones}
            onToggleZones={() => setShowZones((v) => !v)}
            hasRoutes={routes.length > 0}
            showRoutes={showRoutes}
            onToggleRoutes={() => setShowRoutes((v) => !v)}
          />
        </View>
        <View style={{ height: numericHeight }}>
          <Maps
            ref={mapRef}
            testID="map-view"
            style={{ flex: 1 }}
            mapType="none"
            initialRegion={{ latitude: center[0], longitude: center[1], latitudeDelta: delta, longitudeDelta: delta }}
            onMapReady={fit}
            onPress={onMapPress}
          >
            <UrlTile key={scheme} urlTemplate={scheme === "dark" ? MAP_TILES.dark : MAP_TILES.light} maximumZ={19} shouldReplaceMapContent />
            {showZones
              ? zones.map((zone) => {
                  const variant = zone.variant ?? "primary";
                  return (
                    <Polygon
                      key={zone.id}
                      testID={`map-zone-${zone.id}`}
                      coordinates={zone.positions.map(([latitude, longitude]) => ({ latitude, longitude }))}
                      strokeColor={VARIANT_HEX[variant]}
                      fillColor={combinedFill(VARIANT_FILL[variant], zone.fillOpacity ?? 0.25)}
                      strokeWidth={2}
                      accessibilityLabel={zone.label}
                    />
                  );
                })
              : null}
            {showRoutes
              ? routes.map((route) => (
                  <Polyline
                    key={route.id}
                    testID={`map-route-${route.id}`}
                    coordinates={route.positions.map(([latitude, longitude]) => ({ latitude, longitude }))}
                    strokeColor={route.color ?? VARIANT_HEX.primary}
                    strokeWidth={route.weight ?? 3}
                    lineDashPattern={route.dashed ? [8, 6] : undefined}
                    accessibilityLabel={route.label}
                  />
                ))
              : null}
            {allMarkers.map((marker) => (
              <Marker
                key={marker.id}
                testID={`map-marker-${marker.id}`}
                coordinate={{ latitude: marker.position[0], longitude: marker.position[1] }}
                anchor={{ x: 0.5, y: 1 }}
                accessibilityLabel={marker.tooltip?.title ?? marker.label ?? "Map marker"}
                onPress={() => onMarkerClick?.(marker.id)}
              >
                <Pin color={VARIANT_HEX[marker.variant ?? "primary"]} />
                {marker.tooltip || marker.label ? (
                  <Callout tooltip={false}>
                    {marker.tooltip ? <Popup tooltip={marker.tooltip} /> : <Popup tooltip={{ title: marker.label ?? "" }} />}
                  </Callout>
                ) : null}
              </Marker>
            ))}
          </Maps>
        </View>
      </View>
    </Card>
  );
}
