// MapView (web) — react-native-maps has no web implementation, so the web
// build renders KuiReact's own Leaflet map (react-leaflet, CartoDB tiles)
// inside the same card shell and toolbar. Same public API and exports as
// index.tsx.

import "leaflet/dist/leaflet.css";

import { useCallback, useState } from "react";
import { View } from "react-native";

import { cn } from "../../../libs/utils/cn";

import { Card } from "../Card";
import { useAutoMarkers } from "./hooks/useAutoMarkers";
import { Toolbar } from "./parts/Toolbar";
import type { MapViewProps } from "./types";
import { LeafletCanvas } from "./web/LeafletCanvas";

export type { MapVariant, MapTooltipField, MapTooltipData, MapMarker, MapZone, MapRoute, MapBounds, MapProviderId, MapViewProps } from "./types";
export { VARIANT_HEX, VARIANT_FILL } from "./types";

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
  const [addMode, setAddMode] = useState(false);
  const [showZones, setShowZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const { extras, handleMapClick } = useAutoMarkers(onMarkerAdd);
  const onMapClick = useCallback(
    (lat: number, lng: number) => {
      handleMapClick(lat, lng);
      setAddMode(false);
    },
    [handleMapClick],
  );
  const cssHeight = typeof height === "number" ? `${height}px` : height;
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
        {/* `isolation: isolate` scopes Leaflet's z-indexes (up to 1000), as in KuiReact. */}
        <div data-testid="map-view-web" style={{ height: cssHeight, isolation: "isolate" }}>
          <LeafletCanvas
            center={center}
            zoom={zoom}
            markers={[...markers, ...extras]}
            zones={zones}
            routes={routes}
            showZones={showZones}
            showRoutes={showRoutes}
            addMode={addMode}
            fitBoundsPadding={fitBoundsPadding}
            onMapClick={onMapClick}
            onMarkerClick={onMarkerClick}
          />
        </div>
      </View>
    </Card>
  );
}
