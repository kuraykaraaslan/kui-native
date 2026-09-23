import { Linking, Pressable, View, useWindowDimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import Svg, { Path, Rect } from "react-native-svg";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";
import { FONTS } from "@/libs/utils/typography";
import { Text } from "@/modules/ui";

/**
 * The KUI family card on the home panel: the three UI kits (one design system
 * on three runtimes) and the standalone libraries. Pixel-identical in
 * kui-react (modules/showcase/ui/FamilyPanel.tsx) and kui-ejs
 * (views/showcase/partials/family-panel.ejs) — change all three together;
 * only `current` differs between them.
 *
 * Marks use the family's fixed brand hex (brand/geometry of each package),
 * like the static brand assets: they draw the siblings' marks, not this kit's
 * themed one.
 */

type FamilyKit = "react" | "ejs" | "native";
type Member = { id: string; name: string; meta: string; href: string; label: string; tone: string };

const KITS: (Member & { id: FamilyKit })[] = [
  { id: "react", name: "KUIreact", meta: "Next.js · React", href: "https://kui-react.kuray.dev", label: "kui-react.kuray.dev", tone: "#8b5cf6" },
  { id: "ejs", name: "KUIejs", meta: "Express · EJS", href: "https://kui-ejs.kuray.dev", label: "kui-ejs.kuray.dev", tone: "#ec4899" },
  { id: "native", name: "KUInative", meta: "Expo · React Native", href: "https://kui-native.kuray.dev", label: "kui-native.kuray.dev", tone: "#f97316" },
];

const LIBRARIES: Member[] = [
  { id: "player", name: "KUI Player", meta: "Video player", href: "https://kui-player.kuray.dev", label: "kui-player.kuray.dev", tone: "#22c55e" },
  { id: "gantt", name: "KUI Gantt", meta: "Gantt chart", href: "https://kui-gantt.kuray.dev", label: "kui-gantt.kuray.dev", tone: "#ef4444" },
  { id: "viewer", name: "KUI Viewer", meta: "IFC / BIM 3D viewer", href: "https://kui-viewer.kuray.dev", label: "kui-viewer.kuray.dev", tone: "#ffb020" },
];

/** Tailwind's `sm` breakpoint (640px): `grid-cols-1 sm:grid-cols-3`. */
const SM = 640;

/** The family mark (shared K construction), second arm in the member's tone. */
function MemberMark({ tone }: { tone: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 64 64" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Rect width={64} height={64} rx={14} fill="#0f172a" />
      <Rect x={16} y={16} width={7} height={32} rx={1.5} fill="#3b82f6" />
      <Path d="M25 32 L41 16" stroke="#3b82f6" strokeWidth={7} strokeLinecap="round" fill="none" />
      <Path d="M25 32 L41 48" stroke={tone} strokeWidth={7} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

function MemberCard({ member, current = false, cell }: { member: Member; current?: boolean; cell: boolean }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(member.href)}
      accessibilityRole="link"
      accessibilityLabel={member.name}
      accessibilityState={{ selected: current }}
      className={cn(
        "flex-col gap-3 rounded-lg border bg-surface-base p-4",
        current ? "border-primary" : "border-border active:border-primary",
        cell && "min-w-0 flex-1",
      )}
    >
      <View className="flex-row items-center gap-2.5">
        <MemberMark tone={member.tone} />
        <View className="min-w-0 shrink">
          <Text numberOfLines={1} className="text-sm font-semibold text-text-primary">
            {member.name}
          </Text>
          <Text numberOfLines={1} className="text-[10px] leading-[15px] text-text-secondary">
            {member.meta}
          </Text>
        </View>
        {current ? (
          <View className="ml-auto shrink-0 rounded-full bg-primary-subtle px-2 py-0.5">
            <Text className="text-[10px] font-medium leading-[15px] text-primary">You are here</Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={1} className="text-[10px] leading-[15px] text-text-disabled" style={{ fontFamily: FONTS.mono }}>
        {member.label}
      </Text>
    </Pressable>
  );
}

export function FamilyPanel({ current }: { current: FamilyKit }) {
  const t = useThemeTokens();
  const cols = useWindowDimensions().width >= SM;
  const row = cn("gap-3", cols && "flex-row");

  return (
    <View className="mb-8 rounded-xl border border-border bg-surface-raised p-5">
      <View className="mb-2 flex-row items-center gap-2">
        <View className="w-4 items-center">
          <FontAwesomeIcon icon={faCubes} size={14} color={t.primary} />
        </View>
        <Text className="text-sm font-semibold text-text-primary">The KUI Family</Text>
      </View>
      <Text className="mb-4 max-w-2xl text-xs leading-[19.5px] text-text-secondary">
        KUIreact, KUIejs and KUInative are one design system: the same tokens, the same components and the same
        showcase, pixel for pixel — on Next.js, Express + EJS and React Native.
      </Text>
      <View className={row}>
        {KITS.map((kit) => (
          <MemberCard key={kit.id} member={kit} current={kit.id === current} cell={cols} />
        ))}
      </View>
      <Text className="mb-2 mt-5 text-[10px] font-semibold uppercase leading-[15px] tracking-widest text-text-disabled">
        Standalone libraries
      </Text>
      <View className={row}>
        {LIBRARIES.map((lib) => (
          <MemberCard key={lib.id} member={lib} cell={cols} />
        ))}
      </View>
    </View>
  );
}
