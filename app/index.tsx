import { useState } from "react";
import type * as React from "react";
import { Linking, ScrollView, View, useWindowDimensions } from "react-native";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCss3Alt, faJs, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import { faDiagramProject, faLayerGroup, faRocket, faTerminal } from "@fortawesome/free-solid-svg-icons";

import { SITE } from "@/libs/config/site";
import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";
import { FONTS } from "@/libs/utils/typography";
import { BrandMark } from "@/modules/showcase/ui/BrandMark";
import { FamilyPanel } from "@/modules/showcase/ui/FamilyPanel";
import { GithubButton } from "@/modules/showcase/ui/Header";
import { SiteHead } from "@/modules/showcase/ui/SiteHead";
import { Text } from "@/modules/ui";

/** Tailwind's `sm` (640px) and `md` (768px) breakpoints. */
const SM = 640;
const MD = 768;

const MONO = { fontFamily: FONTS.mono };

// KuiReact HomePanel's data, with KuiNative's own stack, commands and layers.
const STACK: { icon: IconDefinition; label: string; value: string }[] = [
  { icon: faNodeJs, label: "Expo", value: "SDK 57" },
  { icon: faJs, label: "React Native", value: "0.86" },
  { icon: faJs, label: "TypeScript", value: "6" },
  { icon: faCss3Alt, label: "NativeWind", value: "4" },
];

const SCRIPTS = [
  { cmd: "npm run dev", desc: "development server" },
  { cmd: "npm run build:web", desc: "production web build" },
  { cmd: "npm test", desc: "unit tests" },
  { cmd: "npm run lint", desc: "lint checks" },
];

const LAYERS = [
  { num: "1", path: "modules/ui/", desc: "Primitive components — atoms, molecules & organisms", bg: "bg-info-subtle", text: "text-info-fg" },
  { num: "2", path: "modules/showcase/", desc: "Documentation & live preview system", bg: "bg-primary-subtle", text: "text-primary" },
  { num: "3", path: "libs/", desc: "Design tokens, theme & utilities", bg: "bg-success-subtle", text: "text-success-fg" },
  { num: "4", path: "app/", desc: "Expo Router screens", bg: "bg-warning-subtle", text: "text-warning-fg" },
];

/** KuiReact's `rounded-xl border bg-surface-raised p-5` card with its `text-sm font-semibold` icon heading. */
function Panel({
  icon,
  title,
  headingGap = "mb-3",
  className,
  children,
}: {
  icon: IconDefinition;
  title: string;
  headingGap?: "mb-3" | "mb-4";
  className?: string;
  children: React.ReactNode;
}) {
  const t = useThemeTokens();
  return (
    <View className={cn("rounded-xl border border-border bg-surface-raised p-5", className)}>
      <View className={cn("flex-row items-center gap-2", headingGap)}>
        <View className="w-4 items-center">
          <FontAwesomeIcon icon={icon} size={14} color={t.primary} />
        </View>
        <Text className="text-sm font-semibold text-text-primary">{title}</Text>
      </View>
      {children}
    </View>
  );
}

/** KuiReact's HomePanel. */
export default function Home() {
  const t = useThemeTokens();
  const width = useWindowDimensions().width;
  const sm = width >= SM;
  const md = width >= MD;
  // `grid-cols-2 sm:grid-cols-4 gap-3` cell width, from the measured row.
  const [stackRow, setStackRow] = useState(0);
  const cols = sm ? 4 : 2;
  const cell = stackRow ? (stackRow - 12 * (cols - 1)) / cols : undefined;

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 sm:p-6">
      <SiteHead />
      <View className="mx-auto w-full max-w-4xl px-2 py-10">
        {/* Hero */}
        <View className="mb-10">
          <View className="mb-3 flex-row items-center gap-3">
            <BrandMark size={40} />
            <View>
              <Text className="text-2xl font-bold leading-[30px] text-text-primary">{SITE.name}</Text>
              <Text className="text-sm text-text-secondary">{SITE.tagline}</Text>
            </View>
          </View>
          <Text className="max-w-2xl text-sm leading-[22.75px] text-text-secondary">
            A production-ready component library built with Expo and React Native. A layered design system and
            component architecture on KUIreact&apos;s semantic tokens, for real mobile apps.
          </Text>
        </View>

        {/* Quick start + scripts */}
        <View className={cn("mb-8 gap-4", md && "flex-row")}>
          <Panel icon={faRocket} title="Quick Start" className={md ? "flex-1" : undefined}>
            <View className="gap-2">
              {["npm install", "npm run dev"].map((cmd) => (
                <View key={cmd} className="flex-row items-center gap-2 rounded-lg bg-surface-sunken px-3 py-2">
                  <Text className="text-xs text-text-disabled" style={MONO}>
                    $
                  </Text>
                  <Text className="text-xs text-text-primary" style={MONO}>
                    {cmd}
                  </Text>
                </View>
              ))}
            </View>
            <Text className="mt-3 text-xs text-text-secondary">
              Server starts at{" "}
              <Text className="text-xs text-primary" style={MONO}>
                http://localhost:8081
              </Text>
            </Text>
          </Panel>

          <Panel icon={faTerminal} title="Scripts" className={md ? "flex-1" : undefined}>
            <View className="gap-1.5">
              {SCRIPTS.map(({ cmd, desc }) => (
                <View key={cmd} className="flex-row items-start gap-2">
                  <View className="shrink-0 rounded bg-surface-sunken px-1.5 py-0.5">
                    <Text className="text-xs text-text-primary" style={MONO}>
                      {cmd}
                    </Text>
                  </View>
                  <Text className="pt-0.5 text-xs text-text-secondary">{desc}</Text>
                </View>
              ))}
            </View>
          </Panel>
        </View>

        {/* Tech stack */}
        <Panel icon={faLayerGroup} title="Tech Stack" headingGap="mb-4" className="mb-8">
          <View onLayout={(e) => setStackRow(e.nativeEvent.layout.width)} className="flex-row flex-wrap gap-3">
            {STACK.map((s) => (
              <View
                key={s.label}
                className="flex-row items-center gap-2.5 rounded-lg bg-surface-overlay px-3 py-2.5"
                style={{ width: cell }}
              >
                <View className="w-4 shrink-0 items-center">
                  <FontAwesomeIcon icon={s.icon} size={16} color={t.primary} />
                </View>
                <View className="min-w-0 flex-1">
                  <Text numberOfLines={1} className="text-xs font-medium text-text-primary">
                    {s.label}
                  </Text>
                  <Text className="text-[10px] leading-[15px] text-text-secondary">{s.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </Panel>

        {/* Layer architecture */}
        <Panel icon={faDiagramProject} title="Module Layers" headingGap="mb-4" className="mb-8">
          <View className="gap-2">
            {LAYERS.map((l) => (
              <View key={l.num} className="flex-row items-center gap-3 rounded-lg bg-surface-overlay px-3 py-2.5">
                <View className={cn("h-5 w-5 shrink-0 items-center justify-center rounded-full", l.bg)}>
                  <Text className={cn("text-[10px] font-bold leading-[15px]", l.text)}>{l.num}</Text>
                </View>
                <Text className="shrink-0 text-xs text-text-primary" style={MONO}>
                  {l.path}
                </Text>
                <Text numberOfLines={1} className="flex-1 text-xs text-text-secondary">
                  {l.desc}
                </Text>
              </View>
            ))}
          </View>
          <Text className="mt-3 text-xs text-text-secondary">
            Each layer builds on the one above it. Keep app logic in screens; ui components stay generic.
          </Text>
        </Panel>

        {/* KUI family */}
        <FamilyPanel current="native" />

        {/* Footer */}
        <View className={cn("gap-3 border-t border-border pt-4", sm ? "flex-row items-center justify-between" : "items-start")}>
          <Text className="text-xs text-text-secondary">
            Built by{" "}
            <Text
              accessibilityRole="link"
              onPress={() => Linking.openURL(SITE.author.url)}
              className="text-xs text-primary"
            >
              {SITE.author.name}
            </Text>{" "}
            · Licensed under 0BSD
          </Text>
          <GithubButton />
        </View>
      </View>
    </ScrollView>
  );
}
