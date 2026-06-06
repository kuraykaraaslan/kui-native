import { View } from "react-native";

import { FONTS } from "@/libs/utils/typography";
import { Text } from "@/modules/ui";

export function CodeBlock({ code }: { code: string }) {
  return (
    <View className="rounded-lg bg-surface-sunken px-3 py-2.5">
      <Text
        selectable
        className="text-xs text-text-secondary"
        style={{ fontFamily: FONTS.mono }}
      >
        {code}
      </Text>
    </View>
  );
}
