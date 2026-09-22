// Marker tooltip body (KuiReact: MapView/parts/Popup.tsx), with KuiReact's
// inline sizes and colours: 13px semibold title, 11px description and a
// label / value field table.

import { View } from "react-native";

import { Text } from "../../Text";
import type { MapTooltipData } from "../types";

export function Popup({ tooltip }: { tooltip: MapTooltipData }) {
  const hasMeta = Boolean(tooltip.description) || Boolean(tooltip.fields?.length);
  return (
    <View style={{ minWidth: 130, maxWidth: 220 }}>
      <Text style={{ fontWeight: "600", fontSize: 13, color: "#111827", marginBottom: hasMeta ? 3 : 0 }}>{tooltip.title}</Text>
      {tooltip.description ? (
        <Text style={{ fontSize: 11, color: "#6b7280", marginBottom: tooltip.fields?.length ? 4 : 0, lineHeight: 15 }}>{tooltip.description}</Text>
      ) : null}
      {tooltip.fields?.map((f, i) => (
        <View key={i} className="flex-row" style={{ marginTop: i === 0 ? 2 : 1 }}>
          <Text style={{ fontSize: 11, color: "#6b7280", paddingRight: 6 }}>{f.label}</Text>
          <Text style={{ fontSize: 11, color: "#111827", fontWeight: "500" }}>{f.value}</Text>
        </View>
      ))}
    </View>
  );
}
