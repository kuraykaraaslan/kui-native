// MapView (web) — react-native-maps has no web implementation, so the web
// build (Expo static export) renders the same card shell with a notice in
// place of the native map. Same public API and exports as index.tsx.

import { View } from "react-native";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Card } from "../Card";
import { Text } from "../Text";
import type { MapViewProps } from "./types";

export type { MapVariant, MapTooltipField, MapTooltipData, MapMarker, MapZone, MapRoute, MapBounds, MapProviderId, MapViewProps } from "./types";
export { VARIANT_HEX, VARIANT_FILL } from "./types";

export function MapView({ markers = [], zones = [], routes = [], height = 480, className }: MapViewProps) {
  const t = useThemeTokens();
  const numericHeight = typeof height === "number" ? height : parseInt(height, 10) || 480;
  return (
    <Card variant="raised" className={cn("overflow-hidden", className)}>
      <View testID="map-view-web" className="-mx-6 -my-4 items-center justify-center gap-2 bg-surface-raised px-6" style={{ height: numericHeight }}>
        <FontAwesomeIcon icon={faMapLocationDot} size={28} color={t["text-disabled"]} />
        <Text className="text-center text-sm text-text-secondary">The interactive map runs in the iOS and Android apps.</Text>
        <Text className="text-center text-xs text-text-disabled">
          {markers.length} markers · {zones.length} zones · {routes.length} routes
        </Text>
      </View>
    </Card>
  );
}
