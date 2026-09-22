// Add-marker + zone / route visibility toggles (KuiReact:
// MapView/parts/Toolbar.tsx), with KuiReact's Turkish copy verbatim.

import { View } from "react-native";
import { faEye, faEyeSlash, faLayerGroup, faLocationDot, faPlus, faRoute, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";

import { Button } from "../../Button";
import { Text } from "../../Text";

type ToolbarProps = {
  addMode: boolean;
  onToggleAddMode: () => void;
  hasZones: boolean;
  showZones: boolean;
  onToggleZones: () => void;
  hasRoutes: boolean;
  showRoutes: boolean;
  onToggleRoutes: () => void;
};

export function Toolbar({ addMode, onToggleAddMode, hasZones, showZones, onToggleZones, hasRoutes, showRoutes, onToggleRoutes }: ToolbarProps) {
  const t = useThemeTokens();
  const icon = (i: typeof faPlus, active: boolean) => <FontAwesomeIcon icon={i} size={12} color={active ? t["primary-fg"] : t["text-primary"]} />;
  return (
    <View className="flex-row flex-wrap items-center gap-2">
      <Button
        size="xs"
        variant={addMode ? "primary" : "outline"}
        accessibilityHint={addMode ? "İşaretçi eklemeyi iptal et" : "Haritaya işaretçi ekle"}
        onPress={onToggleAddMode}
        iconLeft={icon(addMode ? faXmark : faPlus, addMode)}
        iconRight={icon(faLocationDot, addMode)}
      >
        {addMode ? "İptal" : "İşaretçi Ekle"}
      </Button>
      {hasZones ? (
        <Button
          size="xs"
          variant={showZones ? "primary" : "outline"}
          accessibilityHint={showZones ? "Bölgeleri gizle" : "Bölgeleri göster"}
          onPress={onToggleZones}
          iconLeft={icon(showZones ? faEye : faEyeSlash, showZones)}
          iconRight={icon(faLayerGroup, showZones)}
        >
          Bölgeler
        </Button>
      ) : null}
      {hasRoutes ? (
        <Button
          size="xs"
          variant={showRoutes ? "primary" : "outline"}
          accessibilityHint={showRoutes ? "Rotaları gizle" : "Rotaları göster"}
          onPress={onToggleRoutes}
          iconLeft={icon(showRoutes ? faEye : faEyeSlash, showRoutes)}
          iconRight={icon(faRoute, showRoutes)}
        >
          Rotalar
        </Button>
      ) : null}
      {addMode ? <Text className="text-xs font-medium text-primary">Haritaya dokunarak işaretçi ekleyin</Text> : null}
    </View>
  );
}
