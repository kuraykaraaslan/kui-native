// Single colour tile of the preset grid (KuiReact: ColorPicker/parts/Swatch.tsx).

import { Pressable } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

type SwatchProps = {
  color: string;
  selected?: boolean;
  onSelect: (color: string) => void;
};

export function Swatch({ color, selected, onSelect }: SwatchProps) {
  const t = useThemeTokens();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Color ${color}`}
      accessibilityState={{ selected: Boolean(selected) }}
      onPress={() => onSelect(color)}
      className={cn("h-6 w-6 rounded-sm border border-border")}
      // KuiReact: "ring-2 ring-border-focus" when selected.
      style={[{ backgroundColor: color }, selected ? { outlineWidth: 2, outlineColor: t["border-focus"], outlineStyle: "solid" } : null]}
    />
  );
}
